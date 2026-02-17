/**
 * Utility to check if required CSS variables are available
 * This helps developers debug missing CSS imports
 */

const REQUIRED_CSS_VARS = [
  "--color-primary-orange",
  "--color-paper-main",
  "--color-surface-ink",
  "--color-system-red",
  "--color-system-green",
  "--color-orange-1",
  "--color-paper-2",
];

let hasWarned = false;

export function validateCSSVariables(): void {
  if (hasWarned || typeof window === "undefined") return;

  const missingVars: string[] = [];

  REQUIRED_CSS_VARS.forEach((varName) => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(
      varName
    );
    if (!value || value.trim() === "") {
      missingVars.push(varName);
    }
  });

  if (missingVars.length > 0 && !hasWarned) {
    hasWarned = true;
    console.warn(
      `🚨 @breadcoop/ui: Missing CSS variables detected!\n\n` +
        `Missing variables: ${missingVars.join(", ")}\n\n` +
        `To fix this, import the theme CSS in your main CSS file:\n\n` +
        `@import '@breadcoop/ui/theme';\n\n` +
        `Or use the Tailwind preset:\n` +
        `module.exports = { presets: [require('@breadcoop/ui/tailwind-preset')] }`
    );
  }
}

// Auto-validate on import in development
if (process.env.NODE_ENV === "development") {
  // Delay validation to ensure DOM is ready
  setTimeout(validateCSSVariables, 100);
}
