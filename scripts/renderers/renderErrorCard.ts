import satori from 'satori';
import React from 'react';
import { ErrorCard } from './ErrorCard';
import { CARD_WIDTH, CARD_HEIGHT } from '../utils/constants';
import { satoriFont } from './fonts';

const renderErrorCard = async (message: string): Promise<string> => {
	return satori(React.createElement(ErrorCard, { message }), {
		width: CARD_WIDTH,
		height: CARD_HEIGHT,
		fonts: satoriFont,
	});
};

export { renderErrorCard };
