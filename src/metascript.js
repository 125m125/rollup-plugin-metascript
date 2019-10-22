import {
    createFilter
} from "rollup-pluginutils";
import MetaScript from "metascript";

export default function metascript(options = {}) {
    var filter = createFilter(options.include, options.exclude);
    var scope = options.scope || {};
    var logger = options.logger;

    return {
        name: "metascript",
        transform(code, id) {
            if (filter(id)) {
                var partiallyAppliedTransform = transform.bind(this, logger, code, id);
                if (scope && typeof scope.then === "function") {
                    return scope.then(partiallyAppliedTransform);
                } else {
                    return partiallyAppliedTransform(scope);
                }
            }
        },
    };
}

function transform(logger, code, id, scope) {
    scope = typeof scope === "function" ? scope() : scope;
    log(logger, "input: ", code.replace(/\r?\n|\r/g, "\u23CE"));
    log(logger, "scope: ", JSON.stringify(scope));
    var result = MetaScript.transform(code, id, scope);
    log(logger, "outpt:", result.replace(/\r?\n|\r/g, "\u23CE"));
    return result;
}

function log(logger, ...message) {
    if (typeof logger == "undefined" || !logger) return;
    var call = (typeof logger === "function") ? logger : logger.debug || logger.log;
    if (call) call(...message);
}