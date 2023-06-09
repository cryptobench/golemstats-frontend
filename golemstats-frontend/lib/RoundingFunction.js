export const RoundingFunction = (figure, decimals) => {
    if (!decimals) decimals = 2
    const d = Math.pow(10, decimals)
    return (parseInt(figure * d) / d).toFixed(decimals)
}
