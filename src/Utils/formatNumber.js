export const formatNumdigits = (num, numDigits) => {
    return num.toLocaleString('en-US', {minimumIntegerDigits: numDigits, useGrouping:false})
}