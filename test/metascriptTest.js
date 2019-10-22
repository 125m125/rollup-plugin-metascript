import test from "ava";
import metascript from "../src/metascript";
var rollup = require("rollup").rollup;

var code_noRemove = 'console.log("a");\nconsole.log("remove me");\nconsole.log("b");\n';
var code_remove = 'console.log("a");\nconsole.log("b");\n';

function run(uut, file) {
    return rollup({
        input: file,
        plugins: [uut,],
    });
}

function FakeLog(realName, fakeName) {
    this.realLogs = [];
    this.fakeLogs = [];

    this[realName] = data => this.realLogs.push(data);
    if (fakeName)
        this[fakeName] = data => this.fakeLogs.push(data);
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
        logger: t.log,
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
        logger: t.log,
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
        logger: t.log,
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
        logger: t.log,
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

test("logs to debug", t => {
    var fakeLog = new FakeLog("debug");
    var uut = metascript({
        logger: fakeLog,
    });

    return run(uut, "test/resources/simpleCode.js").then(result => {
        return result.generate({
            format: "es",
        });
    }).then(() => {
        t.truthy(fakeLog.realLogs.length);
        t.falsy(fakeLog.fakeLogs.length);
    });
});

test("logs to log", t => {
    var fakeLog = new FakeLog("log");
    var uut = metascript({
        logger: fakeLog,
    });

    return run(uut, "test/resources/simpleCode.js").then(result => {
        return result.generate({
            format: "es",
        });
    }).then(() => {
        t.truthy(fakeLog.realLogs.length);
        t.falsy(fakeLog.fakeLogs.length);
    });
});

test("prefers debug log", t => {
    var fakeLog = new FakeLog("debug", "log");
    var uut = metascript({
        logger: fakeLog,
    });

    return run(uut, "test/resources/simpleCode.js").then(result => {
        return result.generate({
            format: "es",
        });
    }).then(() => {
        t.truthy(fakeLog.realLogs.length);
        t.falsy(fakeLog.fakeLogs.length);
    });
});

test("logs to function", t => {
    var visitedLog = 0;
    var uut = metascript({
        logger: () => visitedLog++,
    });
    return run(uut, "test/resources/simpleCode.js").then(result => {
        return result.generate({
            format: "es",
        });
    }).then(() => {
        t.truthy(visitedLog);
    });
});


test("does not log if no logging function exists", t => {
    var fakeLog = new FakeLog("notDebug", "notLog");
    var uut = metascript({
        logger: fakeLog,
    });

    return run(uut, "test/resources/simpleCode.js").then(result => {
        return result.generate({
            format: "es",
        });
    }).then(() => {
        t.falsy(fakeLog.realLogs.length);
        t.falsy(fakeLog.fakeLogs.length);
    });
});