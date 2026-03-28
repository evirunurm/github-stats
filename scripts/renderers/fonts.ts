import { readFileSync } from 'fs';
import { join } from 'path';
import { typography } from '../tokens/thockitty';

const fontsDir = join(__dirname, '../assets/fonts');

const geistRegular = readFileSync(join(fontsDir, 'geist-400.ttf'));
const geistBold = readFileSync(join(fontsDir, 'geist-700.ttf'));
const geistMonoRegular = readFileSync(join(fontsDir, 'geist-mono-400.ttf'));
const geistMonoBold = readFileSync(join(fontsDir, 'geist-mono-700.ttf'));

export const satoriFont = [
  {
    name: typography.fontFamily.sans,
    data: geistRegular,
    weight: typography.fontWeight.regular as 400,
    style: 'normal' as const,
  },
  {
    name: typography.fontFamily.sans,
    data: geistBold,
    weight: typography.fontWeight.bold as 700,
    style: 'normal' as const,
  },
  {
    name: typography.fontFamily.mono,
    data: geistMonoRegular,
    weight: typography.fontWeight.regular as 400,
    style: 'normal' as const,
  },
  {
    name: typography.fontFamily.mono,
    data: geistMonoBold,
    weight: typography.fontWeight.bold as 700,
    style: 'normal' as const,
  },
];
