const svgs = require("../utils/svgs");

const renderLanguageCard = (userData, color) => {
	let lightFontColor = "#A4A5A6";
	let normalFontColor = "#FFFFFF";
	if (color === "white") {
		lightFontColor = "#161B22";
		normalFontColor = "#161B22";
	}

	const createText = (text, textAttr) => {
		const element = `
		<text
		viewBox="0 0 16 16"
		x="${ (textAttr.dir == "right") ? ((cardAttr.width / 2) - (text.length / 2 * ((textAttr.fontSize + 2) / 2))) - 10 : 1.8 * (cardAttr.height / 6)}"
		y="${ (textAttr.title) ? textAttr.index * (cardAttr.height / (6 + 2)) + (cardAttr.height / (6 + 6)) : textAttr.index * (cardAttr.height / (6 + 2)) + (cardAttr.height / (cardAttr.children.length) - 3) }"
		width="16"
		height="16"
		style=" font: ${ textAttr.weight } ${ (textAttr.title) ? (textAttr.fontSize + 2) : textAttr.fontSize }px 'Segoe UI', Ubuntu, Sans-Serif; fill:${ textAttr.color }; ">
		${ text }
		</text>
		${ (textAttr.title) ? `<line x1="${ cardAttr.width / 10 }" x2="${ cardAttr.width - (cardAttr.width / 10) }" y1="44" y2="44" stroke="${ normalFontColor }" />` : "" }
		`
		return element;
	}

	const createIcon = (language, line) => {
		const icon = `<rect x="${ (cardAttr.height / 6) + 2 }" y="${ line * (cardAttr.height / (6 + 2)) + (cardAttr.height / (cardAttr.children.length) + 6) }" width="12" height="12" viewBox="0 0 8 8" fill="${ language.color }"  />
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

	const calcPercentages = (languages) => {
		// Deep copy of an array of objects
		let langStats = JSON.parse(JSON.stringify(languages))
			.slice(0, 5);

		const totalCount = langStats
			// Gets langauge count
			.reduce((accumulator, language) => {
				return accumulator + language.count;
			}, 0);

		for (let i = 0; i < langStats.length; i++) {
			langStats[i].count = Math.round((100 * langStats[i].count) / totalCount);
		}


		langStats
			.sort((a, b) => {
				return a.count - b.count;
			})
			.reduce((accumulator, language) => {
				language.accum = accumulator;
				return accumulator + language.count
			}, 0);

		// In case there's 1% error while rounding.
		if (langStats[langStats.length - 1].accum + langStats[langStats.length - 1].count !== 100) {
			langStats[langStats.length - 1].count++;
		}

		return langStats;
	}

	const createCircles = () => {
		const languagePercentages = calcPercentages(userData.languages);

		let circles = [];

		for (var i = 0; i < languagePercentages.length; i++) {
			circles.push(
				`<circle r="5" cx="10" cy="10" fill="transparent"
                    stroke="${ languagePercentages[i].color }"
                    stroke-width="10"
                    stroke-dasharray="calc(${ languagePercentages[i].count + languagePercentages[i].accum } * 31.4 / 100) 31.4"
                    transform="rotate(-90) translate(-20)"
                />`
			);
		}

		circles = circles.reverse();
		return circles;
	}

	const cardAttr = {
		width: 290,
		height: 160,
		background: `${ (color === "white") ? "white" : "#161B22"}`,
		style: "border-radius: 10px;",
		children: calcPercentages(userData.languages)
			.sort((a, b) => {
				return b.count - a.count;
			})
			.reduce((acc, item) => [...acc, item.name], ["Most used languages"])
	}

	const mountText = () => {
		for (let i = 0; i < cardAttr.children.length; i++) {
			if (i === 0) {
				cardAttr.children[i] = createText(cardAttr.children[i], { ...textAttr, index: ++textAttr.index, dir: "right", title: true, color: normalFontColor });
				continue;
			}
			cardAttr.children[i] = createText(cardAttr.children[i], { ...textAttr, index: ++textAttr.index });
		}
	}

	mountText();
	console.log(color)
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
			rx="10"
			ry="10"
			height="100%"
			width="100%"
			fill="${ cardAttr.background }"
			stroke-opacity="1"
			style="
				stroke:${ lightFontColor };
				stroke-width:1;
			"
		/> 
		${ cardAttr.children.map(child => child).join('') }
		${ calcPercentages(userData.languages)
			.sort((a, b) => {
				return b.count - a.count;
			})
			.reduce((acc, item) => [...acc, {name: item.name, color:  item.color}], [])
			.map( (child, index) => createIcon(child, index + 1)) }
		<svg x="${ ((cardAttr.width / 2) + ((userData.user + "@'s GitHub").length / 2 * ((textAttr.fontSize + 2) / 2))) }" y="${ (cardAttr.height / (cardAttr.children.length) - 6) }" width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
			${ color === "white" ? svgs.githubCat : svgs.githubCatW }
		</svg>
		<svg viewBox="-60 -15 ${ cardAttr.width - 200 } ${ cardAttr.height - 120 }" >
            <circle r="10" cx="10" cy="10" fill="white" stroke="white" stroke-width="2.6" />
            ${ createCircles() }
      	</svg>
	</svg>`;

}

exports.renderLanguageCard = renderLanguageCard;