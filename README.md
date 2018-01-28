# rollup-plugin-metascript
A [Rollup](http://rollupjs.org/) plugin to transform code with [MetaScript](https://github.com/dcodeIO/MetaScript).

## Installation
```
npm install --save-dev rollup-plugin-metascript
```

```javascript
import rollupPluginSpl from "rollup-plugin-spl";

export default {
    ...
    plugins: [
        rollupPluginSpl({
            scope: {
                // define your scope here
            }
        }),
        ...
    ],
}
```