import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ResponseFormatInterface } from "../interface/response-format.interface";

export function formatResponse<T>(
    success: boolean,
    status: number,
    message: string,
    data: T
): ResponseFormatInterface<T> {
    return { success, status, message, data };
}

@Injectable()
export class ResponseFormatInterceptor<T> implements NestInterceptor<T, ResponseFormatInterface<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseFormatInterface<T>> {
        return next.handle().pipe(
            map((response: ResponseFormatInterface<T>): ResponseFormatInterface<T> => {
                context.switchToHttp().getResponse().status(response.status);
                return {
                    success: response.success,
                    status: response.status,
                    message: response.message,
                    data: response.data,
                };
            })
        );
    }
}
