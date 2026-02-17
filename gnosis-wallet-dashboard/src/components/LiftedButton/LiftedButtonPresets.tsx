/* Structured colours our button uses */
export type LiftedButtonColors = {
  bg: string;
  text: string;
  hoverBg: string;
  hoverText: string;
  shadowBg: string;
};

/* Exposes our predefined styles as an enum like object */
export type LiftedButtonPreset = keyof typeof LIFTED_BUTTON_PRESETS;

/* Library of pre-defined styles */
export const LIFTED_BUTTON_PRESETS = {
  primary: {
    bg: "--color-primary-orange",
    text: "--color-paper-main",
    hoverBg: "--color-orange-1",
    hoverText: "#ffffff",
    shadowBg: "#595959",
  },
  secondary: {
    bg: "#FBDED1",
    text: "--color-primary-orange",
    hoverBg: "#FFF1EA",
    hoverText: "--color-primary-orange",
    shadowBg: "#595959",
  },
  destructive: {
    bg: "--color-system-red",
    text: "--color-paper-main",
    hoverBg: "#BF0A00",
    hoverText: "#ffffff",
    shadowBg: "#595959",
  },
  positive: {
    bg: "--color-system-green",
    text: "--color-paper-main",
    hoverBg: "#2B8F00",
    hoverText: "#ffffff",
    shadowBg: "#595959",
  },
  stroke: {
    bg: "--color-paper-main",
    text: "--color-surface-ink",
    hoverBg: "--color-paper-2",
    hoverText: "--color-surface-ink",
    shadowBg: "#595959",
  },
  burn: {
    bg: "--color-red-0",
    text: "--color-red-main",
    hoverBg: "--color-red-1",
    hoverText: "--color-red-main",
    shadowBg: "#595959",
  },
};

/* Converts the LiftedButtonColors object into CSS properties that tailwind can work with */
export function colorsToStyleVars(c: LiftedButtonColors): React.CSSProperties {
  return {
    ["--btn-bg" as string]: asCssValueWithFallback(c.bg),
    ["--btn-text" as string]: asCssValueWithFallback(c.text),
    ["--btn-hover-bg" as string]: asCssValueWithFallback(c.hoverBg),
    ["--btn-hover-text" as string]: asCssValueWithFallback(c.hoverText),
    ["--btn-shadow" as string]: asCssValueWithFallback(c.shadowBg),
  };
}

/* Looks for CSS variables and wraps them with var() if found */
function asCssValue(v: string): string {
  if (!v) return "";
  // If it already contains var() with fallback, return as-is
  if (v.includes("var(")) return v;
  // If it starts with --, wrap with var()
  if (v.startsWith("--")) return `var(${v})`;
  // Otherwise return the value directly
  return v;
}

/* Maps CSS variables to their fallback values */
const CSS_VAR_FALLBACKS: Record<string, string> = {
  "--color-primary-orange": "#ea6023",
  "--color-paper-main": "#f6f3eb",
  "--color-surface-ink": "#1b201a",
  "--color-system-red": "#df0b00",
  "--color-system-green": "#32a800",
  "--color-orange-1": "#d14a0f",
  "--color-paper-2": "#eae2d6",
  "--color-red-0": "#f7cac2",
  "--color-red-1": "#f4b8ad",
  "--color-red-main": "#df0b00",
};

/* Looks for CSS variables and wraps them with var() and fallback if found */
function asCssValueWithFallback(v: string): string {
  if (!v) return "";
  // If it already contains var() with fallback, return as-is
  if (v.includes("var(")) return v;
  // If it starts with --, wrap with var() and add fallback
  if (v.startsWith("--")) {
    const fallback = CSS_VAR_FALLBACKS[v] || "#000000";
    return `var(${v}, ${fallback})`;
  }
  // Otherwise return the value directly
  return v;
}
