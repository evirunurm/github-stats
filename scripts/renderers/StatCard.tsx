import { readFileSync } from 'fs';
import { join } from 'path';
import { UserStats } from '../../types';
import { CARD_WIDTH, CARD_HEIGHT, DIVIDER_Y, COLOR_SUBTLE, COLOR_LIGHT, COLOR_DARK } from '../utils/constants';

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

const GITHUB_CAT = toDataUri(join(standaloneDir, 'github_cat.svg'));
const GITHUB_CAT_WHITE = toDataUri(join(standaloneDir, 'github_cat_white.svg'));
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

const StatCard = ({ userData, color, peng }: StatCardProps) => {
	const isWhite = color === 'white';
	const background = isWhite ? COLOR_LIGHT : COLOR_DARK;
	const labelColor = COLOR_SUBTLE;
	const valueColor = isWhite ? COLOR_DARK : COLOR_LIGHT;
	const githubCatSrc = isWhite ? GITHUB_CAT : GITHUB_CAT_WHITE;
	const decorSrc = !peng || isWhite ? (isWhite ? NO_PENGUIN : NO_PENGUIN_WHITE) : PENGUIN;

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
				borderRadius: 10,
				border: `1px solid ${COLOR_SUBTLE}`,
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
					paddingBottom: 10,
				}}
			>
				<span
					style={{
						fontFamily: 'Inter',
						fontWeight: 600,
						fontSize: 16,
						color: valueColor,
					}}
				>
					@{userData.user}'s GitHub
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

			{/* Stats */}
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					flex: 1,
					justifyContent: 'space-around',
					paddingTop: 4,
					paddingBottom: 4,
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
								fontFamily: 'Inter',
								fontWeight: 400,
								fontSize: 14,
								color: labelColor,
							}}
						>
							{row.label}
						</span>
						<span
							style={{
								fontFamily: 'Inter',
								fontWeight: 600,
								fontSize: 14,
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
					bottom: 10,
					right: 5,
				}}
			>
				<img src={decorSrc} width={60} height={85} />
			</div>
		</div>
	);
};

export { StatCard };
