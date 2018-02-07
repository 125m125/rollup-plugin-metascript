# rollup-plugin-metascript

[![Greenkeeper badge](https://badges.greenkeeper.io/125m125/rollup-plugin-metascript.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/125m125/rollup-plugin-metascript.svg?branch=master)](https://travis-ci.org/125m125/rollup-plugin-metascript)

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
