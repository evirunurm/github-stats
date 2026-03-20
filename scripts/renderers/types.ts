import { LanguageData } from "../../types";

/** Extended LanguageData with an accumulated percentage offset used for pie chart arc drawing. */
export interface LanguageDataWithAccum extends LanguageData {
	accum: number;
}
