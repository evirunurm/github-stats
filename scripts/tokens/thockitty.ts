/**
 * Design tokens sourced from @evirunurm/thockitty-ds CSS custom properties.
 */
import { readFileSync } from 'fs';
import { join } from 'path';

const css = readFileSync(
  join(__dirname, '../../node_modules/@evirunurm/thockitty-ds/dist/index.css'),
  'utf-8'
);

function cssVar(name: string): string {
  const match = new RegExp(`${name}:\\s*([^;\\n]+)`).exec(css);
  if (!match) throw new Error(`CSS variable ${name} not found in thockitty-ds`);
  return match[1].trim();
}

export const colors = {
  black: cssVar('--foundation-color-base-black'),
  white: cssVar('--foundation-color-base-white'),
  gray100: cssVar('--foundation-color-gray-100'),
  gray200: cssVar('--foundation-color-gray-200'),
  gray300: cssVar('--foundation-color-gray-300'),
  gray400: cssVar('--foundation-color-gray-400'),
  gray500: cssVar('--foundation-color-gray-500'),
  gray600: cssVar('--foundation-color-gray-600'),
  gray700: cssVar('--foundation-color-gray-700'),
  gray800: cssVar('--foundation-color-gray-800'),
  gray900: cssVar('--foundation-color-gray-900'),
  red500: cssVar('--foundation-color-red-500'),
};

export const spacing = {
  '001': parseInt(cssVar('--foundation-space-001'), 10),
  '002': parseInt(cssVar('--foundation-space-002'), 10),
  '003': parseInt(cssVar('--foundation-space-003'), 10),
  '004': parseInt(cssVar('--foundation-space-004'), 10),
  '005': parseInt(cssVar('--foundation-space-005'), 10),
  '006': parseInt(cssVar('--foundation-space-006'), 10),
  '007': parseInt(cssVar('--foundation-space-007'), 10),
  '008': parseInt(cssVar('--foundation-space-008'), 10),
  '009': parseInt(cssVar('--foundation-space-009'), 10),
  '010': parseInt(cssVar('--foundation-space-010'), 10),
  '011': parseInt(cssVar('--foundation-space-011'), 10),
  '012': parseInt(cssVar('--foundation-space-012'), 10),
  '013': parseInt(cssVar('--foundation-space-013'), 10),
  '014': parseInt(cssVar('--foundation-space-014'), 10),
  '015': parseInt(cssVar('--foundation-space-015'), 10),
};

// The CSS package exposes font shorthands (e.g. "normal 400 14px/normal Geist"),
// not individual properties. Typography values are kept as discrete constants
// because Satori requires them split into fontFamily/fontSize/fontWeight.
export const typography = {
  fontFamily: {
    sans: 'Geist',
    mono: 'Geist Mono',
  },
  fontSize: {
    hero: 96,
    heading01: 40,
    heading02: 32,
    heading03: 24,
    heading04: 20,
    bodyLarge: 18,
    body: 16,
    bodySmall: 14,
    caption: 12,
  },
  fontWeight: {
    regular: 400,
    bold: 700,
  },
};
