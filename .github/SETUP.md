# Setup

## GitHub Package Registry (private packages)

`@evirunurm/thockitty-ds` is hosted on GitHub Package Registry and requires authentication to install.

### Steps

1. Go to `github.com/settings/tokens` and create a PAT with the `read:packages` scope
2. Go to `evirunurm/github-stats` → Settings → Secrets and variables → Actions → New repository secret
3. Name it `NPM_TOKEN` and paste the PAT as the value
4. The CI workflow (`test.yml`) will use it automatically via `NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}`

> Without this secret, `npm ci` will fail with a 401 Unauthorized error from `npm.pkg.github.com`.
