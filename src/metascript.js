import {
    createFilter
} from 'rollup-pluginutils';
import MetaScript from 'metascript';

export default function metascript(options) {
    var filter = createFilter(options.include, options.exclude);
    var settings = options.settings;


    return {
        name: 'metascript',
        transform(code, id) {
            if (filter(id)) {
                return MetaScript.transform(code, id, settings);
            }
        }
    }
}