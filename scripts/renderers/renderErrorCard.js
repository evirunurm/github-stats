const renderErrorCard = (message) => {
	return `<svg
		width="290"
		height="160"
		viewBox="0 0 290 160"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		style="border-radius: 10px;"
	>
		<rect rx="10" ry="10" height="100%" width="100%" fill="#161B22" stroke-opacity="1" style="stroke:#A4A5A6;stroke-width:1;" />
		<text x="145" y="70" text-anchor="middle" style="font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill:#FF6B6B;">Error</text>
		<line x1="29" x2="261" y1="84" y2="84" stroke="#A4A5A6" />
		<text x="145" y="108" text-anchor="middle" style="font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill:#A4A5A6;">${message}</text>
	</svg>`;
};

exports.renderErrorCard = renderErrorCard;
