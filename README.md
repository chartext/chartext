# chartext

React Skia Chart

- [Project](https://github.com/orgs/chartext/projects/1)
- [MIT License](./LICENSE)

## Table of Contents

- [Installation](#installation)
- [Examples](#examples)
- [Contributing](#contributing)
- [Plugins](#plugins)

## Installation (WIP)

| Package | Dependencies | NPM |
| - | - | - |
| @chartext/canvaskit | <ul><li>[canvaskit-wasm](https://github.com/google/skia/tree/main/modules/canvaskit)</li><li>[react](https://github.com/facebook/react)</li><li>[tinycolor2](https://github.com/bgrins/TinyColor)</li></ul> | `npm install @chartext/canvaskit` |
| @chartext/chart | <ul><li>[@chartext/canvaskit](./packages/canvaskit/)</li><li>[canvaskit-wasm](https://github.com/google/skia/tree/main/modules/canvaskit)</li><li>[date-fns](https://github.com/date-fns/date-fns)</li><li>[react](https://github.com/facebook/react)</li><li>[tinycolor2](https://github.com/bgrins/TinyColor)</li></ul> | `npm install @chartext/chart` |

## Examples

| Example | Command | Description |
| - | - | - |
| [examples/chart](./examples/chart/) | `npm run examples-chart:dev` | Basic example |

## Contributing

### Setup

#### Visual Studio Code Extensions

##### Recommended
See [.vscode/extensions.json](.vscode/extensions.json)

- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)
- [Markdown Preview Github Styling](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-preview-github-styles)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Vite](https://marketplace.visualstudio.com/items?itemName=antfu.vite)
- [Vitest](https://marketplace.visualstudio.com/items?itemName=ZixuanChen.vitest-explorer)
- [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)

##### Optional
- [Auto Import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport)
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)
- [Debugger for Firefox](https://marketplace.visualstudio.com/items?itemName=firefox-devtools.vscode-firefox-debug)
- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [Template String Converter](https://marketplace.visualstudio.com/items?itemName=meganrogge.template-string-converter)

### Steps

1. Download the repository i.e. `git clone https://github.com/chartext/chartext.git`
2. Change into the created directory `cd chartext`
3. Run `pnpm i`
4. Open vscode's command palette <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> and execute `>Reload Window`

### Running locally

1. Run `pnpm examples:chart`
2. Open up a browser and go to [http://localhost:5173/](http://localhost:5173/)

### Scripts

| Command | Description |
| - | - |
| pnpm canvaskit:dist |  |
| pnpm canvaskit:test | |
| pnpm chart:dist | |
| pnpm examples:chart | |

## Plugins

WIP
