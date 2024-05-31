import colors from "tailwindcss/colors";

const color = 'slate';
const secondary = color;
const primary = color;

export const themeColors = {
    primary: colors[primary][950],
    secondary: colors[secondary][800],
    basePage: colors[secondary][800],
    color: colors[secondary][200],
    error: colors.orange[600],
    success: colors.green[400]
}