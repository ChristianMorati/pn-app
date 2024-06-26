import colors from "tailwindcss/colors";

const color = 'slate';
const secondary = color;
const primary = color;

export const themeColors = {
    primary: colors[secondary][950],
    secondary: colors[secondary][700],
    basePage: colors[secondary][700],
    color: colors[secondary][50],
    error: colors.orange[400],
    success: colors.green[400],
    borderColor: colors[primary][700]
}