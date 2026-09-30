# Deploy the registry

[Português](../../pt-BR/how-to/deploy-the-registry.md)

Use this guide to publish the registry and the showcase on Vercel, so projects stop depending on a local server.

## What gets deployed

`pnpm build` runs `shadcn build` first (the `prebuild` script), which writes every item to `public/r/<name>.json`, then builds the Next app. Vercel serves both: the showcase at `/` and the registry at `/r/{name}.json`. No extra configuration is needed.

## Current setup

The registry is live at `https://base-design-seven.vercel.app` (project `base-design` on Vercel). The GitHub repository is private and owned by the `Kaiser-Inc` organization, and Vercel's Hobby plan cannot connect private organization repositories, so pushes do not deploy by themselves. Until the repository is public or the plan is Pro, deploy from `main` with the CLI:

```bash
git switch main && git pull
npx vercel@latest deploy --prod
```

`.vercelignore` keeps local files (`.dev-flow/`, `.env*`) out of the upload.

## 1. Import the repository

1. On Vercel, choose **Add New → Project** and import `Kaiser-Inc/base-design`.
2. Keep the detected framework (Next.js) and the default build command. Vercel detects pnpm from `pnpm-lock.yaml`.
3. The production branch is `main`. Make sure the registry work is merged there first.
4. Deploy.

With the Vercel CLI, the same result from the repository root:

```bash
npm install -g vercel
vercel login
vercel link --repo
git push
```

After `vercel link --repo`, every push deploys: branches get preview deployments, `main` gets production.

## 2. Check the deployment

Open `https://<your-domain>/r/registry.json`. It lists every item. Open `https://<your-domain>/r/base.json`; it must contain `"type": "registry:theme"` and the `cssVars` block.

## 3. Point projects at it

In each project's `components.json`:

```json
{
  "registries": {
    "@kaiserinc": "https://<your-domain>/r/{name}.json"
  }
}
```

Projects that were using `http://localhost:3100` only need this line changed.

## 4. Keep it indexed only where it should be

The showcase sets `robots: noindex` in `app/layout.tsx`: it is documentation for developers, not a public page. The registry JSON files are public by design, like shadcn's own registry. To make the registry private, protect the deployment and send a token through the `headers` option of `components.json`; every project and machine then needs that token.
