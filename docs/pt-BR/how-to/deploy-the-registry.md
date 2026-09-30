# Publicar a registry

[English](../../en/how-to/deploy-the-registry.md)

Use este guia para publicar a registry e a vitrine na Vercel, para os projetos deixarem de depender de um servidor local.

## O que vai para o ar

O `pnpm build` roda antes o `shadcn build` (o script `prebuild`), que grava cada item em `public/r/<nome>.json`, e depois faz o build do app Next. A Vercel serve os dois: a vitrine em `/` e a registry em `/r/{name}.json`. Não precisa de configuração extra.

## Situação atual

A registry está no ar em `https://base-design-seven.vercel.app` (projeto `base-design` na Vercel). O repositório no GitHub é privado e pertence à organização `Kaiser-Inc`, e o plano Hobby da Vercel não conecta repositório privado de organização; por isso o push não gera deploy sozinho. Enquanto o repositório não for público ou o plano não for Pro, faça o deploy a partir da `main` pela CLI:

```bash
git switch main && git pull
npx vercel@latest deploy --prod
```

O `.vercelignore` mantém os arquivos locais (`.dev-flow/`, `.env*`) fora do envio.

## 1. Importe o repositório

1. Na Vercel, escolha **Add New → Project** e importe o `Kaiser-Inc/base-design`.
2. Mantenha o framework detectado (Next.js) e o comando de build padrão. A Vercel detecta o pnpm pelo `pnpm-lock.yaml`.
3. A branch de produção é a `main`. Confira se o trabalho da registry já está mergeado nela.
4. Faça o deploy.

Com a Vercel CLI, o mesmo resultado a partir da raiz do repositório:

```bash
npm install -g vercel
vercel login
vercel link --repo
git push
```

Depois do `vercel link --repo`, todo push gera um deploy: branches ganham deploy de preview, e a `main` vai para produção.

## 2. Confira o deploy

Abra `https://<seu-dominio>/r/registry.json`. Ele lista todos os itens. Abra `https://<seu-dominio>/r/base.json`: ele precisa ter `"type": "registry:theme"` e o bloco `cssVars`.

## 3. Aponte os projetos para ela

No `components.json` de cada projeto:

```json
{
  "registries": {
    "@kaiserinc": "https://<seu-dominio>/r/{name}.json"
  }
}
```

Projetos que usavam `http://localhost:3100` só precisam trocar essa linha.

## 4. Indexação só onde faz sentido

A vitrine define `robots: noindex` no `app/layout.tsx`: ela é documentação para quem desenvolve, e não página pública. Os JSON da registry são públicos por design, como a registry do próprio shadcn. Para deixar a registry privada, proteja o deploy e mande um token pela opção `headers` do `components.json`; aí todo projeto e toda máquina precisam desse token.
