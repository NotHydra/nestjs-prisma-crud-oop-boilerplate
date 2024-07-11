export const capitalize = (text: string): string => {
    return text.replace(/\b\w/g, (character) => character.toUpperCase());
};
