# exscientia-fe (front-end)

This is the front-end for the Exscientia take-home code challenge.

Note, I have used comments rather liberally to explain decisions or elaborate on how I would go about improving a section.

## Usage

- Start React development server with `npm start` (will bring up the application on `localhost:3000` by default).
- Use instructions found in the back-end directory to bring up the API server.
- **Note** - If changing the back-end server host/port from their default `localhost:8080`, change the `REACT_APP_PI_URL` environment variable found in `.env` accordingly.

## App Structure

React applications do not have any enforced standard as to how they should be structured/organised. As such, teams are often free to decide what works best for them. I tend to like to split my UI into display and logic; a pattern used to achieve this in previous React iterations was the _"Smart component, Dumb component"_ pattern, in which logic (e.g. data fetching) would be abstracted into a _"smart"_ component, and pass the necessary bits of state down into the _"dumb"_ component, which would be responsible purely for displaying the UI using state from props.

Nowadays, common practice is to use the custom hook pattern instead, whereby logic is extracted into custom hooks. Hooks are then used to build complex logic. To quote Tanner Lindsley from whom I first learned this pattern:

> "Hooks are to logic as components are to UI"

### Components

The structure of this app is one I've played around with a little personally/in work projects which seems to work well. It is based on the principles of [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) which seeks to organise components (`component` folders have a tendency to get messy otherwise... not that I know from personal experience...).

The general idea is to split components up into a few categories: through personal experience I've found the following splits and general rules-of-thumb work nicely:

- **Atoms**: Effectively wrappers around basic HTML tags, very small, don't depend on anything other than raw HTML/cannot be decomposed further (e.g. a `Button`).
- **Molecules**: Made up of Atoms; often times common website features (e.g. `Header` and `Footer`).
- **Organisms**: Made up of molecules; often times encompassing lots of moving parts (e.g. `Form`, `SidePanel`, etc).
- **Pages**: Make up the basic skeleton of a single "page" in a SPA; often one page per route (e.g. in a standard CRUD app, there would probably be a `HomePage.tsx`, `DashboardPage.tsx`, `AdminPage.tsx` etc corresponding to `/home`, `/dashboard`, and `/admin` respectively.).

Of course things are never normally this simple, and questions like _"what is a molecule vs organism?"_ are expected. The idea is to organise components in _relation to each other_. What was a molecule in one project may be an organism in another and vice-versa - it's mainly a way to manage dependencies between components. Have a component which depends on 3 other kind-of-large components? It's probably an organism. Have a component which can't really be reduced beyond a few HTML tags? It's probably an atom.

**NB: This covers the separation of components based on their dependency on each other; atoms can contain large amounts of functionality as functionality should be abstracted away in custom hooks.**

### Logic

As stated above, much of the logic for this application resides in the `hooks/` directory, in which there is one hook per file and there is an `index.ts` file responsible for exporting all of the hooks (NB this is a pattern used elsewhere too). This is to keep imports somewhat tidy when importing multiple hooks.

## Technologies Used/Rationale

### TypeScript

The choice of TypeScript-flavoured React mimics the pros that static typing brings to most projects (e.g. easier scaling for multiple devs, clearer intent, automated compile-time checking, etc), therefore I won't elaborate much more on this. It also brings the associated costs of slower build times and added overhead.

### ESLint

Defacto standard linter used in JavaScript/TypeScript applications; pre-loaded with TypeScript compatibility. I also added the `jsx-a11y` plugin to ensure basic accessibility standards were being met.

### Prettier

Defacto standard formatter used in JavaScript/TypeScript applications, also auto-installed with create-react-app.

### CSS-in-JS Styling

A styled-components approach has been taken to style this project (using _Emotion_). This decision was largely due to the readability increase in being able to name more components: there is a semantic benefit to referring to a `SectionTitle` component rather than a `h2` with some styling on it. The ability to pass `props` to these components to change them dynamically was also useful, as was the ability to constrain CSS to certain components to avoid strange styling issues. However, these are largely personal preferences, the same benefits can be realised with other methods of styling too (e.g. with CSS Modules, Sass, etc).

## Scripts

There are a couple custom npm scripts to help automate some things:

- `npm run lint`: Runs eslint against all ts/tsx files in src/ ; allows for automated lint-checking in CI pipeline.
- `npm run format`: Formats code with Prettier config; again can be done automatically as part of CI (run with --check to test this and fail CI pipeline if not formatted correctly).
- `npm run format:check`: The same command as above, however will not execute any code. Instead, it will error if changes _would_ have been made as a result of running the command. This is useful for adding to CI stages to check formatting guidelines are being followed to ensure consistency in the codebase.

## Improvements

Mainly due to time constraints, there are many areas of this application which could be improved upon - especially if this was to be maintained for a long period of time.

- **Testing**: Appropriate testing has largely been ignored for this challenge due to time constraints. Given more time, I would like to create behaviour-driven tests using an automated tool like Cypress to simulate user behaviour on the site against various usage criteria. I have also left many comments on functions/components detailing how I would go about testing them in a "real" application.
- **Responsiveness**: A baseline-level of responsiveness has been achieved, however more time would be needed to get this solution working correctly on mobile screens. This is largely because of the constraints of the Smiles Drawer tool used, which relies strictly on the HTML `canvas` element and specific `px` counts.
- **useDrawCanvas**: This hook nicely extracts logic from the components, however it strongly couples two different bits of functionality: the _effect_ of drawing onto the canvas from a ref, and the calculation of the chemical formula for the drawn compound. In part this is due to the chemical formula being tightly tied to the drawing functions/smiles-drawer itself, however with more work the two could be separated into two separate hooks (e.g. `useDrawCanvas` would only be an effect, returning nothing, and `useGetFormula` would return the chemical formula for the currently drawn compound). I decided against trying to do this, however, as it would require components knowing about the `SmilesDrawer` object, and create a further dependency/inter-mixing of display and logic.
- **Styling**: My design skills aren't the greatest, and so there is much-to-be-desired in the styling department for this front-end. I have, however, tried to use semantic HTML elements where possible
- **smiles-drawer.d.ts**: When a JS package is found with no `d.ts` declaration file, the appropriate thing to do is to create one which correctly types the majority of the project, and perhaps make a PR for the original package creator. Due to time constraints, I instead chose to create a barebones `d.ts` file to keep the compiler happy. However, this leads to untyped values wherever `smiles-drawer` is used. As this package makes up the bulk of the business logic for the front-end, creating a `d.ts` file for this project would be very important if this was going to be maintained for a long period of time.
- **SmilesCard.tsx**: This component could be split into two; one for the _cards_ used in the server molecules, and one for the larger canvas used when users define their own molecules; especially as these two things are likely to become separate entities the more the application grows. This would require duplicating logic around `smiles-drawer`, however this logic has largely been localised to the `useDrawCanvas` hook and so the trade-off would probably be worth it.
- **Deployment**: There are a number of ways this could be deployed, the simplest of which being a static-hosting service like Netlify, or via something like AWS S3. For this project specifically, a nice way the front-end and back-end could have been orchestrated is to dockerize this React app, create a `docker-compose`, and serve the react app via an `nginx` container. This would mean the full stack application could be brought up with a single `docker-compose`, which would aid development.
- **Unable to save molecules**: It would be nice if this application allowed you to save molecules to the database (would require more CRUD functionality on back-end).
- **Automatically calculate molar mass of custom molecule**: Given `smiles-drawer` can calculate the chemical formula for a given SMILES string, a look-up table containing chemical elements and their molar masses could be used to calculate the molar mass of the formula (this would have to include functionality for dealing with 2-letter symbols like `Os` and `Fe`, numbers like `H2O`, and brackets like `Mg(OH)2`).
- **CSS organisation**: The CSS for the application needs some more tidying up; proper use of `rem` and `em` would be needed, appropriate variables for padding size, etc. It is organised in a basic manner (e.g. properties like basic color schemes have variables, relative units have been used where possible, etc), however would be difficult to scale this and adapt to different screen sizes.
- **Proper error handling**: Error handling, both in the case of a failed network request or an incorrect SMILES string, could be improved from a UX perspective. For the former issue, an error image of some sort would be more user-friendly, and for the latter issue, perhaps highlighting the invalid SMILES character input would be a good addition.

## Further notes

The SMILES drawing tool used for this site, `smiles-drawer` is detailed in this paper https://pubs.acs.org/doi/10.1021/acs.jcim.7b00425.
