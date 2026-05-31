
  # 情緒碎紙機 APP UI

  This is a code bundle for 情緒碎紙機 APP UI. The original project is available at https://www.figma.com/design/L2M9J6nruI2YdhAXW5tLN6/%E6%83%85%E7%B7%92%E7%A2%8E%E7%B4%99%E6%A9%9F-APP-UI.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## QR code web demo

  This project is set up as a browser-based demo: visitors open one public URL, and the app appears inside a phone-style preview on desktop/laptop screens. On small phone screens, the same app scales to fit the browser viewport.

  Build the static site:

  ```bash
  npm run build
  ```

  Deploy the generated `dist/` folder to Vercel, Netlify, GitHub Pages, Cloudflare Pages, or any static hosting service.

  After you have the public demo URL, generate a QR code:

  ```bash
  npm run qr -- https://your-demo-url.example
  ```

  The QR code SVG will be written to `dist/demo-qr.svg`. You can pass a custom output file as the second argument:

  ```bash
  npm run qr -- https://your-demo-url.example demo-qr.svg
  ```

  ## Deploying to GitHub Pages

  This repo includes `.github/workflows/deploy-pages.yml`. After the project is pushed to GitHub, enable Pages with GitHub Actions:

  1. Open the repository on GitHub.
  2. Go to `Settings` -> `Pages`.
  3. Set `Build and deployment` -> `Source` to `GitHub Actions`.
  4. Push to the `main` branch, or run the `Deploy GitHub Pages` workflow manually.

  The workflow builds with the correct Vite base path automatically. Normal project pages use `/<repo-name>/`; `username.github.io` repositories use `/`.

  ## Add to Home Screen

  This demo includes a PWA manifest, app icons, iOS home-screen metadata, and a service worker. After deployment, visitors can open the GitHub Pages URL and add it to their phone's home screen.

  iPhone:

  1. Open the demo URL in Safari.
  2. Tap Share.
  3. Tap Add to Home Screen.
  4. Open the app from the new home-screen icon.

  Android Chrome:

  1. Open the demo URL in Chrome.
  2. Tap the menu.
  3. Tap Add to Home screen or Install app.
  4. Open the app from the new home-screen icon.

  ## Backend setup

  Use `.env.example` as the template for `.env.local`, then replace `VITE_SUPABASE_PUBLISHABLE_KEY` with the current Supabase publishable or anon key.

  The app calls:

  - `POST /analyze` for emotion analysis.
  - `POST /kv/set` to save records.
  - `GET /kv/getByPrefix` to load calendar records.
  
