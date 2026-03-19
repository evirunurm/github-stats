import { VALID_USERNAME } from "../scripts/utils/validators";
import { CACHE_DURATION_SECONDS } from "../scripts/utils/constants";
import type { VercelRequest, VercelResponse } from "../types/vercel";
import type { UserLanguageStats } from "../types";

/* eslint-disable @typescript-eslint/no-require-imports */
const fetcherModule = require("../scripts/fetchers/fetchLanguages") as {
    fetchUserData: (user: string) => Promise<UserLanguageStats>;
};
const pieChartModule = require("../scripts/renderers/renderLangPie") as {
    renderLanguageCard: (userData: UserLanguageStats, color: string) => string;
};
const barChartModule = require("../scripts/renderers/renderLangPercent") as {
    renderLanguageCard: (userData: UserLanguageStats, color: string) => string;
};
const errorModule = require("../scripts/renderers/renderErrorCard") as {
    renderErrorCard: (message: string) => string;
};
/* eslint-enable @typescript-eslint/no-require-imports */

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
        const data = await fetcherModule.fetchUserData(username);
        res.setHeader("Content-Type", "image/svg+xml");
        res.setHeader("Cache-Control", `public, max-age=${CACHE_DURATION_SECONDS}`);
        if (pie) {
            res.send(pieChartModule.renderLanguageCard(data, color ?? ""));
            return;
        }
        res.send(barChartModule.renderLanguageCard(data, color ?? ""));
    } catch {
        res.setHeader("Content-Type", "image/svg+xml");
        res.status(500).send(errorModule.renderErrorCard("Could not fetch data"));
    }
};
