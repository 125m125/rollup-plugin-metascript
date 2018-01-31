import ava from "ava";
import metascript from "../src/metascript";
var rollup = require("rollup").rollup;

var code_noRemove = 'console.log("a");\nconsole.log("remove me");\nconsole.log("b");\n';
var code_remove = 'console.log("a");\nconsole.log("b");\n';

function run(uut, file) {
    return rollup({
        input: file,
        plugins: [uut, ],
    });
}

ava("transforms code without options", test => {
    var uut = metascript();

    return run(uut, "test/resources/simpleCode.js").then(result => {
        return result.generate({
            format: "es",
        });
    }).then(generated => {
        var result = generated.code;
        test.is(result, code_remove);
    });
});

ava("transforms code with options", test => {
    var uut = metascript({
        scope: {
            KEEP: true,
        },
    });

    return run(uut, "test/resources/simpleCode.js").then(result => {
        return result.generate({
            format: "es",
        });
    }).then(generated => {
        var result = generated.code;
        test.is(result, code_noRemove);
    });
});

ava("transforms code with promised options", test => {
    var uut = metascript({
        scope: () => {
            return {
                KEEP: true,
            };
        },
    });

    return run(uut, "test/resources/simpleCode.js").then(result => {
        return result.generate({
            format: "es",
        });
    }).then(generated => {
        var result = generated.code;
        test.is(result, code_noRemove);
    });
});

ava("transforms multiple codes with promised options", test => {
    var uut = metascript({
        scope: () => {
            return {
                KEEP: true,
            };
        },
    });

    return run(uut, "test/resources/simpleCode.js").then(result => {
        return result.generate({
            format: "es",
        });
    }).then(generated => {
        var result = generated.code;
        test.is(result, code_noRemove);
    }).then(() => run(uut, "test/resources/simpleCode.js").then(result => {
        return result.generate({
            format: "es",
        });
    })).then(generated => {
        var result = generated.code;
        test.is(result, code_noRemove);
    });
});