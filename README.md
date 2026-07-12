## Easter Eggs

En el TP se adicionaron unos Easter Eggs en referencia a los videojuegos Undertale y Deltarune (la página está basada más que nada en este último).
A continuación, dejo fuentes para evidenciarlos:
#### Si se escribe "GASTER" se recarga la página (en los juegos mencionados, se reinician): 
  - https://www.youtube.com/watch?v=p5U7ooB90TY (Undertale)
  - https://www.youtube.com/watch?v=jkeqVsuD1uQ (Deltarune)
#### Si se escribe "EGG" y se le da al botón, suena un sonido (en Deltarune, el sonido suena al ser usado el objeto):
  - https://youtu.be/pdggCw3kP9c?si=FwxF3JajhvzFKBS-&t=64

Como detalle adicional, esto no afecta al juego, puesto que ninguna de las palabras existen en la API, ni son comunes en el castellano.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
