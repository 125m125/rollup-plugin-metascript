import test from "ava";
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

test("transforms code without options", t => {
    var uut = metascript();

    return run(uut, "test/resources/simpleCode.js").then(result => {
        return result.generate({
            format: "es",
        });
    }).then(generated => {
        var result = generated.output[0].code;
        t.is(result, code_remove);
    });
});

test("transforms code with options", t => {
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
        var result = generated.output[0].code;
        t.is(result, code_noRemove);
    });
});

test("transforms code with function options", t => {
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
        var result = generated.output[0].code;
        t.is(result, code_noRemove);
    });
});

test("transforms multiple codes with function options", t => {
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
        var result = generated.output[0].code;
        t.is(result, code_noRemove);
    }).then(() => run(uut, "test/resources/simpleCode.js").then(result => {
        return result.generate({
            format: "es",
        });
    })).then(generated => {
        var result = generated.output[0].code;
        t.is(result, code_noRemove);
    });
});

test("transforms code with promised options", t => {
    var uut = metascript({
        scope: new Promise(res => {
            res({
                KEEP: true,
            });
        }),
    });

    return run(uut, "test/resources/simpleCode.js").then(result => {
        return result.generate({
            format: "es",
        });
    }).then(generated => {
        var result = generated.output[0].code;
        t.is(result, code_noRemove);
    });
});
