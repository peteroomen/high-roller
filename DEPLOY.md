# Deploy High Roller on Vercel

Import the `high-roller` GitHub repository into your Vercel project.

| Setting               | Value                  |
| --------------------- | ---------------------- |
| Framework preset      | Vite                   |
| Root directory        | `./` (repository root) |
| Install command       | `npm ci`               |
| Build command         | `npm run build`        |
| Output directory      | `dist`                 |
| Node.js version       | 22.x                   |
| Environment variables | None                   |

`vercel.json` includes the build, install, framework and output settings. The project requires no database, paid API, authentication setup or backend. Vercel installs Three.js and bundled fonts from the lockfile during the build.

After deploying, open the production URL on Android in portrait mode. Swipe or tap adjacent dice; the `?` button has rules. Progress is stored in that browser on that device. Importing the repository at its root is important: if using the source ZIP, the outer folder is named `high-roller`, and the files inside it are the repository root.

The source includes GitHub Actions validation for rules, whole-game modelling and the production build. Those checks do not deploy the app.
