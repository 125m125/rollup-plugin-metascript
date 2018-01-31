# rollup-plugin-metascript
A [Rollup](http://rollupjs.org/) plugin to transform code with [MetaScript](https://github.com/dcodeIO/MetaScript).

## Installation
```
npm install --save-dev rollup-plugin-metascript
```

```javascript
import rollupPluginMetascript from "rollup-plugin-metascript";

export default {
    ...
    plugins: [
        rollupPluginMetascript({
            scope: {
                // define your scope here
            }
        }),
        ...
    ],
}
```