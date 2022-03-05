const renderCard = (userData) => {
	const fontColor = "white";
	const secondaryColor = "pink";

	const createText = (text, textAttr) => {
		const element = `
<text
viewBox="0 0 16 16"
x="${ (textAttr.dir == "right") ? ((cardAttr.width / 2) - (text.length / 2 * ((textAttr.fontSize + 2) / 2))) : (cardAttr.height / (cardAttr.children.length + 2))}"
y="${ textAttr.index * (cardAttr.height / (cardAttr.children.length + 2)) + (cardAttr.height / (cardAttr.children.length + 6)) }"
width="16"
height="16"
style="
font: ${ (textAttr.title) ? (textAttr.weight + 200) : textAttr.weight } ${ (textAttr.title) ? (textAttr.fontSize + 2) : textAttr.fontSize }px 
'Segoe UI', Ubuntu,
Sans-Serif;
fill:${ textAttr.color };
">
${ text }
</text>`
		return element;
	}

	const textAttr = {
		weight: 400,
		index: 0,
		color: fontColor,
		fontSize: 14,
		dir: "left",
		title: false
	}
  
	const cardAttr = {
		width: 300,
		height: 150,
		background: "#30363D",
		style: `border-radius: 5px;`,
		children: [
			`@${ userData.user }'s GitHub`, 
			`Followers : `,
			"Total repositories : ", 
			"Total stars : ",
			"Total forks : ",
			"Total contributions : ",
		]
	}

	const mountText = () => {
		for (let i = 0; i < cardAttr.children.length; i++) {
			if (i === 0) {
				cardAttr.children[i] = createText(cardAttr.children[i], {...textAttr, index: ++textAttr.index, dir: "right", title: true});
				continue;
			}
			cardAttr.children[i] += `<tspan style="font=${ textAttr.font }; fill: ${ secondaryColor };font-weight: ${ textAttr.weight };">${ Object.values(userData)[i] }</tspan>`;
			cardAttr.children[i] = createText(cardAttr.children[i], {...textAttr, index: ++textAttr.index});
		}
	}

	mountText();

	const calcPercentages = (languages) => {
		let langStats = [];

		const totalUses = Object.keys(languages)
		.sort((a, b) => {
			return a.uses-b.uses;
		})
		.slice(0, 4)
		.reduce((accumulator, language) => {
			langStats.push({
				language: language,
				uses: languages[language],
			});
			return accumulator + languages[language];
		}, 0);

		for (let i = 0; i < langStats.length; i++) {
			langStats[i].uses = Math.round((100 * langStats[i].uses) / totalUses);
		}

		langStats = Object.values(langStats).sort((a, b) => {
			return a.uses-b.uses;
		});

		Object.values(langStats).reduce((accumulator, language) => {
			language.accum = accumulator;
			return accumulator + language.uses
		}, 0);

		return langStats;
	}

	const createCircles = () => {
		const languagePercentages = calcPercentages(userData.languages);

		let circles = [];

		for (var i = 0; i < languagePercentages.length; i++) {
			circles.push(
				`<circle r="5" cx="10" cy="10" fill="transparent"
					stroke="${ languagePercentages[i].language }"
					stroke-width="10"
					stroke-dasharray="calc(${ languagePercentages[i].uses + languagePercentages[i].accum } * 31.4 / 100) 31.4"
					transform="rotate(-90) translate(-20)"
				/>`
			);
	}

	circles = circles.reverse();
		return circles;
	}

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
			stroke-opacity=1
		/> 
		${ cardAttr.children.map(child => child).join('') }
		<svg viewBox="-70 -18 ${ cardAttr.width - 200 } ${ cardAttr.height - 100 }" >

			<circle r="10" cx="10" cy="10" fill="white" />
			${ createCircles() }

	  </svg>
	</svg>`;

} 


exports.renderCard = renderCard;


