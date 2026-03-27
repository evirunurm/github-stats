import satori from 'satori';
import React from 'react';
import { LanguageCard } from './LanguageCard';
import { UserLanguageStats } from '../../types';
import { CARD_WIDTH, CARD_HEIGHT } from '../utils/constants';
import { satoriFont } from './fonts';

const renderLanguageCard = async (userData: UserLanguageStats, color: string): Promise<string> => {
	return satori(React.createElement(LanguageCard, { userData, color, chartType: 'pie' }), {
		width: CARD_WIDTH,
		height: CARD_HEIGHT,
		fonts: satoriFont,
	});
};

export { renderLanguageCard };
export { calcPercentagesPie as calcPercentages } from './calcPercentages';
