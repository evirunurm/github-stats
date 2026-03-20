import { readFileSync } from 'fs';
import { join } from 'path';
import { UserLanguageStats } from '../../types';
import { LanguageDataWithAccum } from './types';
import {
  CARD_WIDTH,
  CARD_HEIGHT,
  DIVIDER_Y,
  COLOR_SUBTLE,
  COLOR_LIGHT,
  COLOR_DARK,
} from '../utils/constants';
import { calcPercentagesPie, calcPercentagesBar } from './calcPercentages';

const standaloneDir = join(__dirname, '../assets/svgs/standalone');
const DIVIDER_WIDTH = CARD_WIDTH - 2 * Math.round(CARD_WIDTH / 10);

function toDataUri(filePath: string): string {
  return `data:image/svg+xml;base64,${readFileSync(filePath).toString('base64')}`;
}

const GITHUB_CAT = toDataUri(join(standaloneDir, 'github_cat.svg'));
const GITHUB_CAT_WHITE = toDataUri(join(standaloneDir, 'github_cat_white.svg'));

// Satori 0.25 does not support conic-gradient. The pie chart is pre-rendered as an
// SVG string (using the stroke-dasharray layer technique) and embedded as a data URI
// in an <img> tag, which satori handles via its image renderer.
const CIRCUMFERENCE = 31.42; // 2π × r=5

function buildPieSvgUri(languageStats: LanguageDataWithAccum[], bgColor: string): string {
  // Render largest slice first (background), smallest last (foreground).
  const circles = [...languageStats]
    .reverse()
    .map((lang) => {
      const dash = ((lang.count + lang.accum) / 100) * CIRCUMFERENCE;
      return (
        `<circle r="5" cx="10" cy="10" fill="transparent"` +
        ` stroke="${lang.color}" stroke-width="10"` +
        ` stroke-dasharray="${dash.toFixed(4)} ${CIRCUMFERENCE}"` +
        ` transform="rotate(-90, 10, 10)"/>`
      );
    })
    .join('');

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 24 24">` +
    `<circle r="10" cx="10" cy="10" fill="${bgColor}"/>` +
    circles +
    `<circle r="10" cx="10" cy="10" fill="none" stroke="white" stroke-width="1"/>` +
    `</svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

interface LanguageCardProps {
  userData: UserLanguageStats;
  color: string;
  chartType: 'pie' | 'bar';
}

const LanguageCard = ({ userData, color, chartType }: LanguageCardProps) => {
  const isWhite = color === 'white';
  const cardBackground = isWhite ? COLOR_LIGHT : COLOR_DARK;
  const labelColor = isWhite ? COLOR_DARK : COLOR_SUBTLE;
  const titleColor = isWhite ? COLOR_DARK : COLOR_LIGHT;
  const githubCatSrc = isWhite ? GITHUB_CAT : GITHUB_CAT_WHITE;

  const renderPieContent = () => {
    const languageStats = calcPercentagesPie(userData.languages);
    const languageStatsDesc = [...languageStats].sort((a, b) => b.count - a.count);
    const pieSrc = buildPieSvgUri(languageStats, cardBackground);

    return (
      <div
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          paddingLeft: 27,
          paddingRight: 27,
        }}
      >
        {/* Language list */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'space-around',
            height: '100%',
            paddingTop: 8,
            paddingBottom: 8,
          }}
        >
          {languageStatsDesc.map((lang, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: lang.color,
                  borderRadius: 2,
                  marginRight: 6,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 400,
                  fontSize: 14,
                  color: labelColor,
                }}
              >
                {lang.name}
              </span>
            </div>
          ))}
        </div>

        {/* Pie chart rendered as a pre-built SVG data URI */}
        <img src={pieSrc} width={70} height={70} style={{ flexShrink: 0 }} />
      </div>
    );
  };

  const renderBarContent = () => {
    const languageStats = calcPercentagesBar(userData.languages).sort((a, b) => b.count - a.count);
    const trackColor = isWhite ? '#E0E0E0' : '#2A3A4A';

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-around',
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 14,
          paddingRight: 14,
        }}
      >
        {languageStats.map((lang, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: lang.color,
                borderRadius: 2,
                marginRight: 6,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: 11,
                color: labelColor,
                width: 80,
                flexShrink: 0,
              }}
            >
              {lang.name}
            </span>
            {/* Track */}
            <div
              style={{
                display: 'flex',
                flex: 1,
                height: 8,
                backgroundColor: trackColor,
                borderRadius: 4,
              }}
            >
              {/* Fill */}
              <div
                style={{
                  width: `${lang.count}%`,
                  height: 8,
                  backgroundColor: lang.color,
                  borderRadius: 4,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: cardBackground,
        borderRadius: 10,
        border: `1px solid ${COLOR_SUBTLE}`,
        overflow: 'hidden',
      }}
    >
      {/* Title */}
      <div
        style={{
          display: 'flex',
          height: DIVIDER_Y,
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: 10,
        }}
      >
        <span
          style={{
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: 14,
            color: titleColor,
          }}
        >
          Most used languages
        </span>
        <img src={githubCatSrc} width={19} height={15} style={{ marginLeft: 6 }} />
      </div>

      {/* Divider */}
      <div
        style={{
          display: 'flex',
          height: 1,
          width: DIVIDER_WIDTH,
          backgroundColor: COLOR_SUBTLE,
          alignSelf: 'center',
        }}
      />

      {/* Content */}
      {chartType === 'pie' ? renderPieContent() : renderBarContent()}
    </div>
  );
};

export { LanguageCard };
