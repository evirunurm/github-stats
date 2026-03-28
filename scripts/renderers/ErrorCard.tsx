import { CARD_WIDTH, CARD_HEIGHT, ERROR_DIVIDER_Y, COLOR_DARK, COLOR_SUBTLE, COLOR_ERROR } from '../utils/constants';
import { typography } from '../tokens/thockitty';

const DIVIDER_WIDTH = CARD_WIDTH - 2 * Math.round(CARD_WIDTH / 10);

interface ErrorCardProps {
	message: string;
}

const ErrorCard = ({ message }: ErrorCardProps) => (
	<div
		style={{
			display: 'flex',
			flexDirection: 'column',
			width: CARD_WIDTH,
			height: CARD_HEIGHT,
			backgroundColor: COLOR_DARK,
			borderRadius: 10,
			border: `1px solid ${COLOR_SUBTLE}`,
		}}
	>
		<div
			style={{
				display: 'flex',
				height: ERROR_DIVIDER_Y,
				alignItems: 'flex-end',
				justifyContent: 'center',
				paddingBottom: 14,
			}}
		>
			<span
				style={{
					fontFamily: typography.fontFamily.sans,
					fontWeight: typography.fontWeight.bold,
					fontSize: typography.fontSize.bodySmall,
					color: COLOR_ERROR,
				}}
			>
				Error
			</span>
		</div>
		<div
			style={{
				height: 1,
				width: DIVIDER_WIDTH,
				backgroundColor: COLOR_SUBTLE,
				alignSelf: 'center',
			}}
		/>
		<div
			style={{
				display: 'flex',
				flex: 1,
				alignItems: 'flex-start',
				justifyContent: 'center',
				paddingTop: 12,
			}}
		>
			<span
				style={{
					fontFamily: typography.fontFamily.sans,
					fontWeight: typography.fontWeight.regular,
					fontSize: typography.fontSize.caption,
					color: COLOR_SUBTLE,
				}}
			>
				{message}
			</span>
		</div>
	</div>
);

export { ErrorCard };
