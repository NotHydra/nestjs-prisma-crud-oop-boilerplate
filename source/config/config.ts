import { LogLevel } from "@nestjs/common";

export default (): {
    logLevel: LogLevel[];
    port: number;
    databaseURL: string;
} => {
    const logLevel: string[] = process.env.LOG_LEVEL.split(", ").filter((level: string) => {
        return ["all", "log", "warn", "error", "debug"].includes(level);
    });

    return {
        logLevel: (logLevel && logLevel.length > 0 && logLevel[0] !== "all"
            ? logLevel
            : ["log", "warn", "error", "debug"]) as LogLevel[],
        port: parseInt(process.env.PORT) || 3001,
        databaseURL: process.env.DATABASE_URL,
    };
};
