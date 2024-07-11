export const capitalize = (text: string): string => {
    return text.replace(/\b\w/g, (character: string) => character.toUpperCase());
};
