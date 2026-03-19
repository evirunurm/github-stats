import * as fs from "fs";
import * as path from "path";

const svgsDir = path.join(__dirname, "../assets/svgs");

const peng: string = fs.readFileSync(path.join(svgsDir, "penguin.svg"), "utf-8");
const nopeng: string = fs.readFileSync(path.join(svgsDir, "no_penguin.svg"), "utf-8");
const nopengW: string = fs.readFileSync(path.join(svgsDir, "no_penguin_white.svg"), "utf-8");
const githubCat: string = fs.readFileSync(path.join(svgsDir, "github_cat.svg"), "utf-8");
const githubCatW: string = fs.readFileSync(path.join(svgsDir, "github_cat_white.svg"), "utf-8");

const icons: string[] = [
	fs.readFileSync(path.join(svgsDir, "icon_followers.svg"), "utf-8"),
	fs.readFileSync(path.join(svgsDir, "icon_repositories.svg"), "utf-8"),
	fs.readFileSync(path.join(svgsDir, "icon_stars.svg"), "utf-8"),
	fs.readFileSync(path.join(svgsDir, "icon_forks.svg"), "utf-8"),
];

export { icons, githubCat, githubCatW, peng, nopeng, nopengW };
