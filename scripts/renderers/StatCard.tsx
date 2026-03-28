import { readFileSync } from 'fs';
import { join } from 'path';
import { UserStats } from '../../types';
import { CARD_WIDTH, CARD_HEIGHT, DIVIDER_Y, COLOR_SUBTLE } from '../utils/constants';
import { typography, colors, spacing } from '../tokens/thockitty';

const standaloneDir = join(__dirname, '../assets/svgs/standalone');
const DIVIDER_WIDTH = CARD_WIDTH - 2 * Math.round(CARD_WIDTH / 10);

function toDataUri(filePath: string): string {
  return `data:image/svg+xml;base64,${readFileSync(filePath).toString('base64')}`;
}

const ICONS = [
  toDataUri(join(standaloneDir, 'icon_followers.svg')),
  toDataUri(join(standaloneDir, 'icon_repositories.svg')),
  toDataUri(join(standaloneDir, 'icon_stars.svg')),
  toDataUri(join(standaloneDir, 'icon_forks.svg')),
];

const PENGUIN = toDataUri(join(standaloneDir, 'penguin.svg'));
const NO_PENGUIN = toDataUri(join(standaloneDir, 'no_penguin.svg'));
const NO_PENGUIN_WHITE = toDataUri(join(standaloneDir, 'no_penguin_white.svg'));

const STAT_ROWS: { label: string }[] = [
  { label: 'Followers: ' },
  { label: 'Repositories: ' },
  { label: 'Stars: ' },
  { label: 'Forks: ' },
  { label: 'Total Contributions: ' },
];

interface StatCardProps {
  userData: UserStats;
  color: string;
  peng: boolean;
}

type DecorImage = 'penguin' | 'no_penguin' | 'no_penguin_white';

const getDecordImage = (image: DecorImage) => {
  switch (image) {
    case 'penguin':
      return <img src={PENGUIN} width={66} height={70} />;
    case 'no_penguin':
      return <img src={NO_PENGUIN} width={60} height={60} />;
    case 'no_penguin_white':
      return <img src={NO_PENGUIN_WHITE} width={60} height={60} />;
  }
};

const StatCard = ({ userData, color, peng }: StatCardProps) => {
  const isWhite = color === 'white';
  const background = isWhite ? colors.white : colors.gray900;
  const labelColor = isWhite ? colors.gray600 : colors.gray400;
  const valueColor = isWhite ? colors.gray700 : colors.white;
  const decor: DecorImage =
    !peng || isWhite ? (isWhite ? 'no_penguin' : 'no_penguin_white') : 'penguin';

  const values = [
    userData.amountFollowers,
    userData.amountRepos,
    userData.amountStars,
    userData.amountForks,
    userData.totalContributions,
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: background,
        border: `1px solid ${colors.gray200}`,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Title */}
      <div
        style={{
          display: 'flex',
          height: DIVIDER_Y,
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: spacing['001'],
        }}
      >
        <span
          style={{
            fontFamily: typography.fontFamily.mono,
            fontWeight: typography.fontWeight.bold,
            fontSize: typography.fontSize.body,
            color: valueColor,
          }}
        >
          @{userData.user}'s GitHub
        </span>
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

      {/* Stats */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-around',
          paddingTop: 4,
          paddingBottom: 10,
        }}
      >
        {STAT_ROWS.map((row, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}
          >
            {i < ICONS.length ? (
              <img src={ICONS[i]} width={12} height={12} style={{ marginRight: 8 }} />
            ) : (
              <div style={{ display: 'flex', width: 20 }} />
            )}
            <span
              style={{
                fontFamily: typography.fontFamily.mono,
                fontWeight: typography.fontWeight.regular,
                fontSize: typography.fontSize.bodySmall,
                color: labelColor,
              }}
            >
              {row.label}
            </span>
            <span
              style={{
                fontFamily: typography.fontFamily.mono,
                fontWeight: typography.fontWeight.bold,
                fontSize: typography.fontSize.bodySmall,
                color: valueColor,
              }}
            >
              {values[i]}
            </span>
          </div>
        ))}
      </div>

      {/* Decorative corner image */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          bottom: '40%',
          right: '17%',
          transform: 'translate(50%, 50%)',
        }}
      >
        {getDecordImage(decor)}
      </div>
    </div>
  );
};

export { StatCard };
