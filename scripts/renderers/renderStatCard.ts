import satori from 'satori';
import React from 'react';
import { StatCard } from './StatCard';
import { UserStats } from '../../types';
import { CARD_WIDTH, CARD_HEIGHT } from '../utils/constants';
import { satoriFont } from './fonts';

const renderStatCard = async (userData: UserStats, color: string, peng: boolean): Promise<string> => {
	return satori(React.createElement(StatCard, { userData, color, peng }), {
		width: CARD_WIDTH,
		height: CARD_HEIGHT,
		fonts: satoriFont,
	});
};

export { renderStatCard };
