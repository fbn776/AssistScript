# File Structuring

```text
AssistScript/
├── demos/
│   └── basic
├── dev-tools/
│   ├── docs-gen
│   └── gen-file-tree
├── dist
├── docs/
│   ├── additionals
│   ├── assets
│   ├── implementations
│   └── references
├── sandbox
└── src/
    ├── lang-core/
    │   ├── errors
    │   ├── interpreter/
    │   │   ├── parser
    │   │   └── runner
    │   ├── services
    │   ├── specs/
    │   │   ├── lang-units
    │   │   └── tokens/
    │   │       └── lexmes
    │   ├── stdlib/
    │   │   ├── basic
    │   │   ├── ctrl
    │   │   ├── math
    │   │   └── operators
    │   └── utils
    └── utils
```

## Description
- `demos` - Contains demo AssistScripts.
  - `basic` - Contains basic AssistScript demos.
- `dev-tools` - Contains tools for development.
    - `docs-gen` - Contains scripts for generating documentation.
    - `gen-file-tree` - Contains scripts for generating file trees.
- `dist` - Contains the distribution files.
- `docs` - Contains the documentation.
    - `additionals` - Contains additional documentation.
    - `assets` - Contains assets for documentation.
    - `implementations` - Contains implementation documentation.
    - `references` - Contains reference documentation.
- `sandbox` - Contains the sandbox for testing.
- `src` - Contains the source code.
    - `lang-core` - Contains the core language code.
        - `errors` - Contains error handling code.
        - `interpreter` - Contains the interpreter code.
            - `parser` - Contains the parser code.
            - `runner` - Contains the runner code.
        - `services` - Contains services code.
        - `specs` - Contains the language specifications.
            - `lang-units` - Contains the language units.
            - `tokens` - Contains the tokens.
                - `lexmes` - Contains the lexemes for the language.
        - `stdlib` - Contains the standard library code.
            - `basic` - Contains the basic standard library code.
            - `ctrl` - Contains the control standard library code.
            - `math` - Contains the math standard library code.
            - `operators` - Contains the operators standard library code.
        - `utils` - Contains utility code for the language.
    - `utils` - Contains general utility code.


## Read more
- [README](README.md)
