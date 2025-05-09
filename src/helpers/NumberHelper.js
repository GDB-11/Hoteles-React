export const formatToTwoDecimals = (num) => {
    return num.toFixed(2);
};

export const firstCharToNumber = (str) => {
    if (str.length === 0) {
        return NaN;
    }

    const firstChar = str.charAt(0);
    const number = Number(firstChar);
    return number;
};