import satori from 'satori';
import { readFileSync } from 'fs';
import { join } from 'path';
import React from 'react';
import { LanguageCard } from './LanguageCard';
import { UserLanguageStats } from '../../types';
import { CARD_WIDTH, CARD_HEIGHT } from '../utils/constants';

const fontRegular = readFileSync(join(__dirname, '../assets/fonts/inter-400.woff'));
const fontBold = readFileSync(join(__dirname, '../assets/fonts/inter-600.woff'));

const renderLanguageCard = async (userData: UserLanguageStats, color: string): Promise<string> => {
	return satori(React.createElement(LanguageCard, { userData, color, chartType: 'bar' }), {
		width: CARD_WIDTH,
		height: CARD_HEIGHT,
		fonts: [
			{
				name: 'Inter',
				data: fontRegular,
				weight: 400,
				style: 'normal',
			},
			{
				name: 'Inter',
				data: fontBold,
				weight: 600,
				style: 'normal',
			},
		],
	});
};

export { renderLanguageCard };
export { calcPercentagesBar as calcPercentages } from './calcPercentages';
