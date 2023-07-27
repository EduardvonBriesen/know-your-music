# know your music

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Contributions

### Eduard
- User Management
- Items (Popularity, Discography, Biography, Lyrics, Song)
- Dashboard Layouting

### Nick 

### Lou

### Yousri
- Front-end design: item types, home page, about page, navigation, and onboarding.
- Data visualization prototyping
- Logo design

## Developing

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

### Environment

You will need to create a `.env` file in the root of the project with the following variables:

```bash
# Firebase
VITE_API_KEY=""
VITE_AUTH_DOMAIN=""
VITE_PROJECT_ID=""
VITE_STORAGE_BUCKET=""
VITE_MESSAGING_SENDER_ID=""
VITE_APP_ID=""

# Spotify
SPOTIFY_CLIENT_ID=""
SPOTIFY_CLIENT_SECRET=""
```

You can get the Firebase variables from the [Firebase dashboard](https://console.firebase.google.com/project/know-your-music-7ea79/settings/general/). The Spotify variables can be obtained by creating a Spotify app in the [Spotify developer dashboard](https://developer.spotify.com/documentation/web-api/tutorials/getting-started).

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `pnpm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
