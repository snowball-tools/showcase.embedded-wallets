# Example: Snowball In-App Wallets

This example shows how to easily create in-app wallets using Snowball.

## Getting started

Make sure you have `node` installed locally; we recommend using Node v18+.

```bash
git clone https://github.com/snowball-tools/js-sdk
cd js-sdk
git submodule update --init
npm install
npm run build

cd app-showcase/showcase.in-app-wallets
cp .env.local.example .env.local
# Fill out the values in .env.local
# Then start your app with:
npm run dev
```

To obtain an API key:

- Sign up for an account at [snowball.build](https://snowball.build)
- Create a new project
- Open your new project and copy its API key
