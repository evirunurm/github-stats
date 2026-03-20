import { LanguageData } from "../../types";

/** Extended LanguageData with an accumulated percentage offset used for pie chart arc drawing. */
export interface LanguageDataWithAccum extends LanguageData {
	accum: number;
}

export interface TextAttr {
	weight: number;
	index: number;
	color: string;
	fontSize: number;
	dir: string;
	title: boolean;
}

export interface CardAttr {
	width: number;
	height: number;
	background: string;
	style: string;
	children: string[];
}
