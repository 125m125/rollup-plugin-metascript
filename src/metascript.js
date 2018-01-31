import {
    createFilter
} from 'rollup-pluginutils';
import MetaScript from 'metascript';

export default function metascript(options = {}) {
    var filter = createFilter(options.include, options.exclude);
    var scope = options.scope || {};


    return {
        name: 'metascript',
        transform(code, id) {
            if (filter(id)) {
                if (scope && typeof scope.then === "function") {
                    return scope.then(realScope => MetaScript.transform(code, id, realScope));
                } else {
                    return MetaScript.transform(code, id, scope);
                }
            }
        }
    }
}