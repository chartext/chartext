# chartext

[![Prettier](https://github.com/chartext/chartext/actions/workflows/check-formatting.yml/badge.svg?label=Linting&logo=github)](https://github.com/chartext/chartext/actions/workflows/check-formatting.yml) [![Linter](https://github.com/chartext/chartext/actions/workflows/check-linting.yml/badge.svg)](https://github.com/chartext/chartext/actions/workflows/check-linting.yml) [![Deploy Pages](https://github.com/chartext/chartext/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/chartext/chartext/actions/workflows/deploy-pages.yml)

React Skia Chart

🚧 Currently under development 🚧

## Demo

[Chart Demo](https://chartext.github.io/chartext/)

## Packages

| Package                                      | Description             | Defaults                                             |
| -------------------------------------------- | ----------------------- | ---------------------------------------------------- |
| [@chartext/canvaskit](./packages/canvaskit/) | React canvaskit library |                                                      |
| [@chartext/chart](./packages/chart/)         | React canvaskit chart   | [ChartDefaults](packages/chart/src/ChartDefaults.ts) |

## Examples

| Example                             | Command                   |
| ----------------------------------- | ------------------------- |
| [examples/chart](./examples/chart/) | `pnpm examples:chart dev` |

### Chart Snippet

See [ExampleChart.tsx](examples/chart/src/ExampleChart.tsx)

```tsx
const series: Series[] = generateSeriesArr([
  {
    xRange: { min: -100, max: 100 },
    yRange: { min: -100, max: 100 },
    type: 'line',
    count: 5,
    dataCount: 100,
  },
]);

return (
  <Chart
    height={480}
    width={640}
    series={series}
    xAxis={{
      label: 'X Axis',
    }}
    yAxis={{
      label: 'Y Axis',
    }}
  />
);
```

## Configs (All properties are optional)

[ChartDefaults](packages/chart/src/ChartDefaults.ts)

### [ChartConfig](./packages/chart/src/Chart.types.ts)

```ts
height: number;
width: number;
xAxis: {
  position: 'top' | 'bottom';
  label: string;
  size: number;
  showZero: boolean;
}
yAxis: {
  position: 'left' | 'right';
  label: string;
  size: number;
  showZero: boolean;
}
x: {
  formatter: CoordFormatter;
  parser: CoordParser<CoordType>;
  key: string;
}
y: {
  formatter: CoordFormatter;
  parser: CoordParser<CoordType>;
  key: string;
}
theme: ChartThemeConfig;
```

### [ChartThemeConfig](./packages/chart/src/Chart.types.ts)

```ts
backgroundColor: string;
margin: {
  left: number;
  top: number;
  right: number;
  bottom: number;
};
seriesColors: string[];
xAxis: {
  labelStyle: {
    fontSize: number;
    fontColor: string;
  };
  tickStyle: {
    color: string;
    zeroColor: string;
    labelStyle: {
      fontSize: number;
      fontColor: string;
    };
  };
};
yAxis: {
  labelStyle: {
    fontSize: number;
    fontColor: string;
  };
  tickStyle: {
    color: string;
    zeroColor: string;
    labelStyle: {
      fontSize: number;
      fontColor: string;
    };
  };
};
```

## Contributing

### Prerequisites

- [git](https://git-scm.com/downloads)
- [node](https://nodejs.org/)
- [pnpm](https://pnpm.io/installation)
- [typescript](https://www.typescriptlang.org/download)

### Steps

1. Clone the repository `git clone https://github.com/chartext/chartext.git`
2. Change into the created directory `cd chartext`
3. Run `pnpm i`

### Running locally

1. Run `pnpm examples:chart dev`
2. Open up a browser and go to [http://127.0.0.1:5173/chartext](http://127.0.0.1:5173/chartext)

### Scripts

| Command             | Description                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------- |
| pnpm canvaskit      | Alias to run scripts from [packages/canvaskit/package.json](packages/canvaskit/package.json) |
| pnpm chart          | Alias to run scripts from [packages/chart/package.json](packages/chart/package.json)         |
| pnpm examples:chart | Alias to run scripts from [examples/chart/package.json](examples/chart/package.json)         |
| lint:check          | Runs ESLint to check for issues                                                              |
| lint:fix            | Runs ESLint to fix as many issues as possible                                                |
| prettier:check      | Runs Prettier to check formatting                                                            |
| prettier:fix        | Runs Prettier to fix formatting                                                              |

## [vscode](https://code.visualstudio.com/)

Use (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>) to open vscode's command palette and then execute `>Reload Window`

### Extensions

See [.vscode/extensions.json](.vscode/extensions.json)

- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [GitHub Actions](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-github-actions)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)

#### Optional

- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)
- [Debugger for Firefox](https://marketplace.visualstudio.com/items?itemName=firefox-devtools.vscode-firefox-debug)
- [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)
- [Markdown Preview Github Styling](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-preview-github-styles)
- [Template String Converter](https://marketplace.visualstudio.com/items?itemName=meganrogge.template-string-converter)

## References

- [canvaskit-wasm](https://github.com/google/skia/tree/main/modules/canvaskit)
- [date-fns](https://github.com/date-fns/date-fns)
- [eslint](https://github.com/eslint/eslint)
- [husky](https://github.com/typicode/husky)
- [node](https://github.com/nodejs/node)
- [pnpm](https://github.com/pnpm/pnpm)
- [prettier](https://github.com/prettier/prettier)
- [mantine](https://github.com/mantinedev/mantine)
- [react](https://github.com/facebook/react)
- [syncpack](https://github.com/JamieMason/syncpack)
- [tinycolor2](https://github.com/bgrins/TinyColor)
- [typescript](https://github.com/microsoft/TypeScript)
- [vite-tsconfig-paths](https://github.com/aleclarson/vite-tsconfig-paths)
- [vite](https://github.com/vitejs/vite)
- [vitest](https://github.com/vitest-dev/vitest)
