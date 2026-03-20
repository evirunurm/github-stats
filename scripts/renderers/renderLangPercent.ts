import * as svgs from "../utils/svgs";
import { CARD_WIDTH, CARD_HEIGHT, LANG_ITEM_COUNT, DIVIDER_Y, COLOR_SUBTLE, COLOR_LIGHT, COLOR_DARK } from "../utils/constants";
import { LanguageData, UserLanguageStats } from "../../types";
import { TextAttr, CardAttr } from "./types";
import { calcPercentagesBar as calcPercentages } from "./calcPercentages";

const renderLanguageCard = (userData: UserLanguageStats, color: string): string => {
	let lightFontColor = COLOR_SUBTLE;
	let normalFontColor = COLOR_LIGHT;
	if (color === "white") {
		lightFontColor = COLOR_DARK;
		normalFontColor = COLOR_DARK;
	}

	const createText = (text: string, textAttr: TextAttr): string => {
		const element = `
		<text
		viewBox="0 0 16 16"
		x="${ (textAttr.dir == "right") ? ((cardAttr.width / 2) - (text.length / 2 * ((textAttr.fontSize + 2) / 2))) - 10 : (cardAttr.height / LANG_ITEM_COUNT) + 2}"
		y="${ (textAttr.title) ? textAttr.index * (cardAttr.height / (LANG_ITEM_COUNT + 2)) + (cardAttr.height / (LANG_ITEM_COUNT + LANG_ITEM_COUNT)) : textAttr.index * (cardAttr.height / (LANG_ITEM_COUNT + 2)) + (cardAttr.height / LANG_ITEM_COUNT - 3) }"
		width="16"
		height="16"
		style=" font: ${ textAttr.weight } ${ (textAttr.title) ? (textAttr.fontSize + 2) : textAttr.fontSize }px 'Segoe UI', Ubuntu, Sans-Serif; fill:${ textAttr.color }; ">
		${ text }
		</text>
		${ (textAttr.title) ? `<line x1="${ cardAttr.width / 10 }" x2="${ cardAttr.width - (cardAttr.width / 10) }" y1="${ DIVIDER_Y }" y2="${ DIVIDER_Y }" stroke="${ normalFontColor }" />` : "" }
		`
		return element;
	}

	const createBar = (language: LanguageData, line: number): string => {
		const icon = `<rect rx="5" ry="5" x="${ CARD_WIDTH / 2 }" y="${ line * (cardAttr.height / (LANG_ITEM_COUNT + 2)) + (cardAttr.height / LANG_ITEM_COUNT + 6) }" width="40%" height="12" viewBox="0 0 8 8" opacity='0.5' fill="${ lightFontColor }"  />
		<rect rx="5" ry="5" x="${ CARD_WIDTH / 2 }" y="${ line * (cardAttr.height / (LANG_ITEM_COUNT + 2)) + (cardAttr.height / LANG_ITEM_COUNT + 6) }" width="${ 40 / 100 * language.count }%" height="12" viewBox="0 0 8 8" fill="${ language.color }"  />
		`
		return icon;
	}

	const textAttr: TextAttr = {
		weight: 400,
		index: 0,
		color: lightFontColor,
		fontSize: 14,
		dir: "left",
		title: false
	}

	const languageStats = calcPercentages(userData.languages).sort((a, b) => b.count - a.count);

	const cardAttr: CardAttr = {
		width: CARD_WIDTH,
		height: CARD_HEIGHT,
		background: `${ (color === "white") ? "white" : COLOR_DARK}`,
		style: "border-radius: 10px;",
		children: languageStats.reduce((acc: string[], item) => [...acc, item.name], ["Most used languages"])
	}

	const mountText = (): void => {
		for (let i = 0; i < cardAttr.children.length; i++) {
			if (i === 0) {
				cardAttr.children[i] = createText(cardAttr.children[i], { ...textAttr, index: ++textAttr.index, dir: "right", title: true, color: normalFontColor });
				continue;
			}
			cardAttr.children[i] = createText(cardAttr.children[i], { ...textAttr, index: ++textAttr.index });
		}
	}

	mountText();

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
		${ languageStats.map((child, index) => createBar(child, index + 1)) }
		<svg x="${ ((cardAttr.width / 2) + ((userData.user + "@'s GitHub").length / 2 * ((textAttr.fontSize + 2) / 2))) }" y="${ (cardAttr.height / LANG_ITEM_COUNT - 6) }" width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
			${ color === "white" ? svgs.githubCat : svgs.githubCatW }
		</svg>
	</svg>`;
}

export { renderLanguageCard };
export { calcPercentagesBar as calcPercentages } from "./calcPercentages";
