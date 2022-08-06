# Formation.tools App

## Development

1. Run `npm ci` to install dependencies.
2. Run `npm run dev` for UI development (and find the port to which to navigate your browser in the console output)
3. Run `npm run fmt:fix` before committing to ensure that your changes are are compatible with the styleguide.

### Install dependencies

> 💡 We only want to use `npm install` when we are installing new packages and have the express intention of making changes to the package-lock.json file.

Using `npm ci` as opposed to `npm install` will ensure that we do not casually update the package-lock.json file. Casual changes to the package-lock.json file can complicate merging since the package-lock.json file can have quite a large amount of rigorous changes that one needs to painstakingly isolate in a merge conflict.

### Start development session

When working on the UI, running `npm run dev` is helpful. When working on logic it may actually be more helpful to watch core logic source files and run `npm run build` as this recompiles the code on every change and communicates compiler errors more clearly.

```bash
ls core/**/*.ts core/**/*.tsx pages/**/*.tsx components/**/*.tsx  | entr  npm run build
```

> 💡 While working on the parsing or rendering logic, the `npm run build` tool may be the tool to use.

### Format code (according to project styleguide)

This is important because some editors fudge the source files a bit which produces a lot of changes that don't really affect the UI or the logic at all and are therefore just noise. Running everything through the same formatter will ensure that the only thing ending up in the commit are changes to UI or logic and not just editor opinions. 😅

> 💡 Run `npm run fmt:fix:watch` in a separate terminal to not have to think about this. It will watch relevant source files and rerun the formatter whenever they change and offering us less thing to think about while developing.

### Test code

Run `npm run test` in order to run the tests. The test runner is pretty convenient and will provide facilities to do the following from within the test running TUI:

- narrow down tests based on patterns
- generate or update snapshots when changes are detected
- retrigger complete test re-runs

## Resources

[Product respository](https://gitlab.com/formation.tools/intel/product-vision): it contains all relevant information and the [ROADMAP.org](https://gitlab.com/formation.tools/intel/product-vision/-/blob/main/Roadmap.org) file.

[App respository GitLab](https://gitlab.com/formation.tools/app/formation.tools-app)

[Figma file](<https://www.figma.com/file/DenroEWfValwUxKZJdtLW7/formation.tools-(Copy)>)

[Issues Board](https://gitlab.com/formation.tools/app/formation.tools-app/-/boards/4514126)

[Vercel app](https://app-formation-tools-app-three.vercel.app/)
[Vercel dashboard](https://vercel.com/formation-tools/app-formation-tools-app)

## Technologies

- Next.js
- Typescript
- [Grommet](https://v2.grommet.io/)
- [SWR](https://swr.vercel.app/)
- [react-syntax-highlighter](https://react-syntax-highlighter.github.io/react-syntax-highlighter/), used for the Code component

## Questions

- How to add new fonts in a Next.js project. Stefano spent 5 minutes on it and didn't manage. Check maybe:
  - https://nextjs.org/docs/messages/google-font-display
  - https://medium.com/nextjs/how-to-add-font-in-next-js-7a7fba80d528
