# Example: Snowball In-App Wallets

This example shows how to easily create [in-app wallets](https://docs.snowball.build/docs/in-app-wallets/introduction) using Snowball SDK.

See [How it Works](#how-it-works) for a full explanation of the code.

In short, it allows you to create and manage your own in-app wallets

![In-App Wallets vs 3rd Party Wallets](https://docs.snowballtools.com/img/diagrams/wallet-types.png)

## Getting started

Make sure you have `node` installed locally; we recommend using Node v18+.

```zsh
npm install
cp .env.local.example .env.local
# Then fill out the values in .env.local
```

To obtain an API key:

- Sign up for an account at [snowball.build](https://snowball.build)
- Create a new project
- Open your new project and copy its API key

## How it Works

1. The app starts off by [initializing a Snowball instance](https://github.com/snowball-tools/showcase.in-app-wallets/blob/e1faaf2df779d5ef811f9d9b31190a46fe40187d/src/app/use-snowball.ts#L6-L12).
   - This is the primary handle you will use to manage in-app wallets throughout your app's auth process.
2. [React-specific] A [useSnowball hook is defined](https://github.com/snowball-tools/showcase.in-app-wallets/blob/e1faaf2df779d5ef811f9d9b31190a46fe40187d/src/app/use-snowball.ts#L14-L24) for React components to import.
   - This is a generic snippet you can copy/paste into your own projects.
3. The page component imports and calls `useSnowball()`, [grabbing a reference to passkey auth](https://github.com/snowball-tools/showcase.in-app-wallets/blob/e1faaf2df779d5ef811f9d9b31190a46fe40187d/src/pages/index.tsx#L22-L23).

Once you have a Snowball instance, you can start managing user accounts / wallets:

1. If a user already has an account, just call [login()](https://github.com/snowball-tools/showcase.in-app-wallets/blob/e1faaf2df779d5ef811f9d9b31190a46fe40187d/src/pages/index.tsx#L81) and you're done!
2. If not, accounts are created via calling [sendOtp()](https://github.com/snowball-tools/showcase.in-app-wallets/blob/e1faaf2df779d5ef811f9d9b31190a46fe40187d/src/pages/index.tsx#L34) on a user's email address, and [verifyOtp()](https://github.com/snowball-tools/showcase.in-app-wallets/blob/e1faaf2df779d5ef811f9d9b31190a46fe40187d/src/pages/index.tsx#L40) on the code they enter.
3. After a user verifies their OTP, just call [createPasskey()](https://github.com/snowball-tools/showcase.in-app-wallets/blob/e1faaf2df779d5ef811f9d9b31190a46fe40187d/src/pages/index.tsx#L45) to prompt the user to create a new passkey for your app.

Creating a passkey not only secures your user's account, it also creates a new non-custodial wallet you can start using!

Specifically:

- It's easy to show different screens for different states, e.g. [initializing](https://github.com/snowball-tools/showcase.in-app-wallets/blob/e1faaf2df779d5ef811f9d9b31190a46fe40187d/src/pages/index.tsx#L102), [logged out](https://github.com/snowball-tools/showcase.in-app-wallets/blob/e1faaf2df779d5ef811f9d9b31190a46fe40187d/src/pages/index.tsx#L108), [needs passkey](https://github.com/snowball-tools/showcase.in-app-wallets/blob/e1faaf2df779d5ef811f9d9b31190a46fe40187d/src/pages/index.tsx#L108), and so on.
- You can also just [grab .wallet](https://github.com/snowball-tools/showcase.in-app-wallets/blob/e1faaf2df779d5ef811f9d9b31190a46fe40187d/src/pages/index.tsx#L24) and [check](https://github.com/snowball-tools/showcase.in-app-wallets/blob/e1faaf2df779d5ef811f9d9b31190a46fe40187d/src/pages/index.tsx#L184) if it's available. If so, your wallet is [ready to use](https://github.com/snowball-tools/showcase.in-app-wallets/blob/e1faaf2df779d5ef811f9d9b31190a46fe40187d/src/pages/index.tsx#L57-L60)!

## Development

```zsh
npm run dev
```
