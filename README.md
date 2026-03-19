# Stats for your README.md

## Setup

### 1. Get a GitHub Personal Access Token

1. Go to **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. Click **Generate new token (classic)**
3. Give it a descriptive name (e.g. `github-stats`)
4. Select the following scope:
   - `read:user` — read access to your public profile data
5. Click **Generate token** and copy the value immediately (it won't be shown again)

### 2. Set the `GITHUB_TOKEN` environment variable

**Locally:** create a `.env` file at the project root:

```
GITHUB_TOKEN=your_token_here
```

**On Vercel:** add it as an environment variable in your project's dashboard (see [Deploy to Vercel](#deploy-to-vercel) below).

---

## Running locally

**Prerequisites:** Node.js 18+, [Vercel CLI](https://vercel.com/docs/cli) (`npm i -g vercel`)

```bash
# Install dependencies
npm install

# Start the local development server (serves /api routes via Vercel CLI)
vercel dev
```

The API will be available at `http://localhost:3000`.

---

## Deploy to Vercel

1. Fork or clone this repository
2. Import the project in the [Vercel dashboard](https://vercel.com/new)
3. In **Project Settings → Environment Variables**, add:
   - `GITHUB_TOKEN` = your personal access token from the step above
4. Click **Deploy**

That's it — Vercel will detect the `/api` directory and deploy each file as a serverless function automatically.

---

## Known limits

| Limit | Value | Reason |
|:------|:------|:-------|
| Repositories scanned | 100 | GitHub GraphQL API maximum per request |
| Languages fetched per repository | 10 | GraphQL query limit |
| Languages displayed in charts | 5 | Top 5 by byte count |

If you have more than 100 public repositories, only the most recent 100 will be used when computing statistics.

---

## Reference

### GitHub profile statistics

Copy the piece of code from below and paste it into your markdown.<br/>
**Change** the value of `username=` to your GitHub's username.
<br>
<br>

```md
  [![My Stats](https://github-stats-evirunurm.vercel.app/api/stats.js?username=evirunurm)](https://github.com/evirunurm/github-stats)
```
<br>
`/api/stats.js` endpoint accepts the following parameters.<br>
A query parameter must follow the `parameter=value` structure.<br>
Several parameters must go separated by `&`

| Parameter | Type     | Description                                                                                 |
| :-------- | :------- |:--------------------------------------------------------------------------------------------|
| `username` | `string` | **Required**. Your GitHub username                                                          |
| `color` | `"white"` | Set to "white" if you want the background to be white                                       |
| `peng` | `boolean` | If you want the GitHub icon<br/>instead of the cute little <br/>penguin, set this to false. |
<br>

### Most used languages

Copy the piece of code from below and paste it into your markdown.<br/>
**Change** the value of `username=` to your GitHub's username.
<br>
<br>

```md
  [![My languages](https://github-stats-evirunurm.vercel.app/api/languages.js?username=evirunurm)](https://github.com/evirunurm/github-stats)
```
<br>
`/api/languages.js` endpoint accepts the following parameters.<br>
A query parameter must follow the `parameter=value` structure.<br>
Several parameters must go separated by `&`

| Parameter  | Type     | Description                                                                            |
|:-----------| :------- |:---------------------------------------------------------------------------------------|
| `username` | `string` | **Required**. Your GitHub username                                                     |
| `color`    | `"white"` | Set to "white" if you want the background to be white                                  |
| `pie`      | `boolean` | If you don't want the pie chart but want percentage bars instead, set this to "false". |
<br>

## Examples
### GitHub profile statistics

| Parameter &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Output                                                                                                                           |
| :-------- |:---------------------------------------------------------------------------------------------------------------------------------|
|  &nbsp;default&nbsp;  | <br>&nbsp;&nbsp;&nbsp;&nbsp;<img width="260" src="https://i.imgur.com/4FkYASY.png">&nbsp;&nbsp;&nbsp;&nbsp;<br><br> |
|  &nbsp;`peng=false`&nbsp;  | <br>&nbsp;&nbsp;&nbsp;&nbsp;<img width="260" src="https://i.imgur.com/1GbRlFE.png">&nbsp;&nbsp;&nbsp;&nbsp;<br><br>            |
|  &nbsp;`color=white`&nbsp;  | <br>&nbsp;&nbsp;&nbsp;&nbsp;<img width="260"  src="https://i.imgur.com/pqulod5.png">&nbsp;&nbsp;&nbsp;&nbsp;<br><br>             |
<br>

### Most used languages

| Parameter &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Output |
|:-----------------------------------------------------------------------------------------------------------------| :------- |
| &nbsp;default&nbsp; |<br>&nbsp;&nbsp;&nbsp;&nbsp;<img width="260" src="https://i.imgur.com/hQBPCiO.png">&nbsp;&nbsp;&nbsp;&nbsp;<br><br>|
| &nbsp;`pie=false`&nbsp; |<br>&nbsp;&nbsp;&nbsp;&nbsp;<img width="260"  src="https://i.imgur.com/pgQWL8G.png">&nbsp;&nbsp;&nbsp;&nbsp;<br><br>|
| &nbsp;`color=white`&nbsp;   |<br>&nbsp;&nbsp;&nbsp;&nbsp;<img width="260"  src="https://i.imgur.com/xJgjdxN.png">&nbsp;&nbsp;&nbsp;&nbsp;<br><br>|
| &nbsp;`color=white&pie=false`&nbsp;  |<br>&nbsp;&nbsp;&nbsp;&nbsp;<img width="260"  src="https://i.imgur.com/AxROUMS.png">&nbsp;&nbsp;&nbsp;&nbsp;<br><br>|
<br>
