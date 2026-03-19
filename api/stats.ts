import { VALID_USERNAME } from "../scripts/utils/validators";
import { CACHE_DURATION_SECONDS } from "../scripts/utils/constants";
import type { VercelRequest, VercelResponse } from "../types/vercel";
import { fetchUserData } from "../scripts/fetchers/fetchUserData";
import { renderStatCard } from "../scripts/renderers/renderStatCard";
import { renderErrorCard } from "../scripts/renderers/renderErrorCard";

export default async (req: VercelRequest, res: VercelResponse): Promise<void> => {
    const username = req.query.username as string;
    const color = req.query.color as string | undefined;
    const rawPeng = req.query.peng as string | undefined;
    const peng = (rawPeng !== "false");

    if (!VALID_USERNAME.test(username)) {
        res.status(400).send('Invalid username');
        return;
    }
    if (color !== undefined && color !== "white") {
        res.status(400).send('Invalid color');
        return;
    }
    if (rawPeng !== undefined && rawPeng !== "true" && rawPeng !== "false") {
        res.status(400).send('Invalid peng');
        return;
    }

    try {
        const data = await fetchUserData(username);
        res.setHeader("Content-Type", "image/svg+xml");
        res.setHeader("Cache-Control", `public, max-age=${CACHE_DURATION_SECONDS}`);
        res.send(renderStatCard(data, color ?? "", peng));
    } catch {
        res.setHeader("Content-Type", "image/svg+xml");
        res.status(500).send(renderErrorCard("Could not fetch data"));
    }
};
