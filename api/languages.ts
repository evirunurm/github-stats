import { VALID_USERNAME } from "../scripts/utils/validators";
import { CACHE_DURATION_SECONDS } from "../scripts/utils/constants";
import type { VercelRequest, VercelResponse } from "../types/vercel";
import { fetchUserData } from "../scripts/fetchers/fetchLanguages";
import { renderLanguageCard as renderLangPie } from "../scripts/renderers/renderLangPie";
import { renderLanguageCard as renderLangPercent } from "../scripts/renderers/renderLangPercent";
import { renderErrorCard } from "../scripts/renderers/renderErrorCard";

export default async (req: VercelRequest, res: VercelResponse): Promise<void> => {
    const username = req.query.username as string;
    const color = req.query.color as string | undefined;
    const rawPie = req.query.pie as string | undefined;
    const pie = (rawPie !== "false");

    if (!VALID_USERNAME.test(username)) {
        res.status(400).send('Invalid username');
        return;
    }
    if (color !== undefined && color !== "white") {
        res.status(400).send('Invalid color');
        return;
    }
    if (rawPie !== undefined && rawPie !== "true" && rawPie !== "false") {
        res.status(400).send('Invalid pie');
        return;
    }

    try {
        const data = await fetchUserData(username);
        res.setHeader("Content-Type", "image/svg+xml");
        res.setHeader("Cache-Control", `public, max-age=${CACHE_DURATION_SECONDS}`);
        if (pie) {
            res.send(renderLangPie(data, color ?? ""));
            return;
        }
        res.send(renderLangPercent(data, color ?? ""));
    } catch {
        res.setHeader("Content-Type", "image/svg+xml");
        res.status(500).send(renderErrorCard("Could not fetch data"));
    }
};
