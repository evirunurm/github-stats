const svgs = require("./svgs");

const renderStatCard = (userData) => {
	const lightFontColor = "#A4A5A6";
	const normalFontColor = "#FFFFFF";
	const icons = [...svgs.icons];

	const createText = (text, textAttr) => {

		const element = `
		<text
		viewBox="0 0 16 16"
		x="${ (textAttr.dir == "right") ? ((cardAttr.width / 2) - (text.length / 2 * ((textAttr.fontSize + 2) / 2))) - 10 : 1.8 * (cardAttr.height / cardAttr.children.length)}"
		y="${ (textAttr.title) ? textAttr.index * (cardAttr.height / (cardAttr.children.length + 2)) + (cardAttr.height / (cardAttr.children.length + 6)) : textAttr.index * (cardAttr.height / (cardAttr.children.length + 2)) + (cardAttr.height / (cardAttr.children.length) - 3) }"
		width="16"
		height="16"
		style=" font: ${ textAttr.weight } ${ (textAttr.title) ? (textAttr.fontSize + 2) : textAttr.fontSize }px 'Segoe UI', Ubuntu, Sans-Serif; fill:${ textAttr.color }; ">
		${ text }
		</text>
		${ (textAttr.title) ? `<line x1="${ cardAttr.width / 10 }" x2="${ cardAttr.width - (cardAttr.width / 10) }" y1="44" y2="44" stroke="${ normalFontColor }" />` : "" }
		`
		return element;
	}

	const createIcon = (svg, line) => {
		const icon = `<svg x="${ (cardAttr.height / cardAttr.children.length) }" y="${ line * (cardAttr.height / (cardAttr.children.length + 2)) + (cardAttr.height / (cardAttr.children.length) + 8) }" width="12" height="12" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
		${ svg }
		</svg>
		`
		return icon;
	}

	const textAttr = {
		weight: 400,
		index: 0,
		color: lightFontColor,
		fontSize: 14,
		dir: "left",
		title: false
	}

	const cardAttr = {
		width: 290,
		height: 160,
		background: "#1C1E20",
		style: "border-radius: 5px;",
		children: [
			`@${ userData.user }'s GitHub`,
			"Followers: ",
			"Repositories: ",
			"Stars: ",
			"Forks: ",
			"Total Contributions: ",
		]
	}

	const mountText = () => {
		for (let i = 0; i < cardAttr.children.length; i++) {
			if (i === 0) {
				cardAttr.children[i] = createText(cardAttr.children[i], { ...textAttr, index: ++textAttr.index, dir: "right", title: true, color: normalFontColor });
				continue;
			}
			cardAttr.children[i] += `<tspan style="font=${ textAttr.font }; fill: ${ normalFontColor };font-weight: ${ textAttr.weight };">${ Object.values(userData)[i] }</tspan>`;
			cardAttr.children[i] = createText(cardAttr.children[i], { ...textAttr, index: ++textAttr.index });

		}
	}

	const mountIcons = () => {
		for (let i = 0; i < icons.length; i++) {
			icons[i] = createIcon(icons[i], i + 1);
		}
	}


	mountText();
	mountIcons();

	console.log(cardAttr.children[0].textContent)
	return `
	<svg 
		id="userCard"
		width="${ cardAttr.width }"
		height="${ cardAttr.height }"
		viewBox="0 0 ${ cardAttr.width } ${ cardAttr.height }"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		style="${ cardAttr.style }"
	>
		<rect
		height="100%"
		width="100%"
		fill="${ cardAttr.background }"
		stroke-opacity="1"
		/> 
		${ cardAttr.children.map(child => child).join('') }
		${ icons.map(icon => icon).join('') }
		<svg x="${ ((cardAttr.width / 2) + ((userData.user + "@'s GitHub").length / 2 * ((textAttr.fontSize + 2) / 2))) }" y="${ (cardAttr.height / (cardAttr.children.length) - 6) }" width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
			${ svgs.githubCat }
		</svg>
		<svg viewBox="-${ cardAttr.width - (cardAttr.width / 4) } -${ cardAttr.height - (cardAttr.height / 2.2)} 250 250" >
			${ svgs.peng }
		</svg>
	</svg>`;

}

exports.renderStatCard = renderStatCard;