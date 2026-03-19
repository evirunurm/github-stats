const { CARD_WIDTH, CARD_HEIGHT, ERROR_DIVIDER_Y } = require("../utils/constants");

const renderErrorCard = (message) => {
	return `<svg
		width="${ CARD_WIDTH }"
		height="${ CARD_HEIGHT }"
		viewBox="0 0 ${ CARD_WIDTH } ${ CARD_HEIGHT }"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		style="border-radius: 10px;"
	>
		<rect rx="10" ry="10" height="100%" width="100%" fill="#161B22" stroke-opacity="1" style="stroke:#A4A5A6;stroke-width:1;" />
		<text x="${ CARD_WIDTH / 2 }" y="70" text-anchor="middle" style="font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill:#FF6B6B;">Error</text>
		<line x1="${ CARD_WIDTH / 10 }" x2="${ CARD_WIDTH - (CARD_WIDTH / 10) }" y1="${ ERROR_DIVIDER_Y }" y2="${ ERROR_DIVIDER_Y }" stroke="#A4A5A6" />
		<text x="${ CARD_WIDTH / 2 }" y="108" text-anchor="middle" style="font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill:#A4A5A6;">${message}</text>
	</svg>`;
};

exports.renderErrorCard = renderErrorCard;
