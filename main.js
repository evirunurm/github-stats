const userData = {
  user: 'evirunurm',
  amountFollowers: 7,
  amountRepos: 17,
  amountStars: 4,
  amountForks: 2,
  totalContributions: 441,
  languages: {
    JavaScript: 11,
    CSS: 4,
    HTML: 13,
    SCSS: 2,
    Java: 2,
    Vue: 4,
    TypeScript: 1
  }
}

const fontColor = "white";
const secondaryColor = "red";

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
				fill:${ textAttr.color }
			"
		>
			${ text }
		</text>
	`
	return element;
}


const createTspan = () => {

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
	style: `
	border-radius: 5px;
	`,
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


const svgElement = `
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
</svg>`;

document.body.innerHTML = svgElement