"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var _ = __importStar(require("lodash"));
var permutator = function (ar1, ar2, ar3) {
    if (ar3 === void 0) { ar3 = ['']; }
    var out = [];
    for (var i = 0; i < ar1.length; i++) {
        for (var j = 0; j < ar2.length; j++) {
            for (var k = 0; k < ar3.length; k++) {
                var str = "" + ar1[i] + ar2[j] + ar3[k];
                out.push(str);
            }
        }
    }
    return out;
};
var rawData = fs.readFileSync('input.txt', 'utf8');
var _a = rawData.split('\n\n'), rawRules = _a[0], rawMessages = _a[1];
var rules = {};
rawRules.split('\n').forEach(function (rawRule) {
    var _a = rawRule.split(': '), id = _a[0], format = _a[1];
    var subRules = format.replace(/"/g, '').split(' | ');
    rules[id] = subRules;
});
var messages = rawMessages.split('\n');
var seenParentCount = 0;
var curParent = null;
var knownCombos = new Map();
var findAllCombos = function (ruleId, parent) {
    if (parent === curParent) {
        if (seenParentCount > 5) {
            console.log('reached the depth');
            return [''];
        }
        else {
            seenParentCount++;
        }
    }
    else {
        seenParentCount = 1;
    }
    curParent = parent;
    if (knownCombos.has(ruleId)) {
        return knownCombos.get(ruleId);
    }
    var subRules = rules[ruleId];
    var subCombos = subRules.map(function (subRule) {
        if (subRule === 'a' || subRule === 'b') {
            return subRule;
        }
        var subSubCombos = [];
        var splitRules = subRule.split(' ');
        for (var i = 0; i < splitRules.length; i++) {
            var rule = splitRules[i];
            var combos = findAllCombos(rule, ruleId);
            subSubCombos.push(combos);
        }
        var perms = subSubCombos[0];
        if (subSubCombos.length > 1) {
            perms = permutator(subSubCombos[0], subSubCombos[1], subSubCombos[2]);
        }
        return perms;
    });
    var out = _.flatten(subCombos);
    knownCombos.set(ruleId, out);
    return out;
};
var vc31 = Array.from(new Set(findAllCombos('31', null)));
var vc42 = Array.from(new Set(findAllCombos('42', null)));
var check42 = function (message) {
    var newMessage = message;
    var has = vc42.some(function (combo) {
        if (message.startsWith(combo)) {
            newMessage = message.replace(combo, '');
            return true;
        }
        return false;
    });
    return { has: has, message: newMessage };
};
var check42e = function (message) {
    var newMessage = message;
    var has = vc42.some(function (combo) {
        if (message.endsWith(combo)) {
            newMessage = message.replace(new RegExp(combo + '$'), '');
            return true;
        }
        return false;
    });
    return { has: has, message: newMessage };
};
var check31 = function (message) {
    var newMessage = message;
    var has = vc31.some(function (combo) {
        if (message.endsWith(combo)) {
            newMessage = message.replace(new RegExp(combo + '$'), '');
            return true;
        }
        return false;
    });
    return { has: has, message: newMessage };
};
;
var candidates = [];
for (var i = 0; i < messages.length; i++) {
    var message = messages[i];
    var c42 = check42(message);
    var c31 = check31(message);
    if (c42.has && c31.has) {
        candidates.push({ strip31: 0, strip42e: 0, message: message });
    }
}
var newMessages = candidates;
while (true) {
    var leftovers = [];
    for (var i = 0; i < newMessages.length; i++) {
        var message = newMessages[i];
        var count = message.strip31;
        var c31 = check31(message.message);
        if (c31.has) {
            count++;
        }
        leftovers.push({ strip31: count, strip42e: message.strip42e, message: c31.message });
    }
    if (_.isEqual(leftovers, newMessages)) {
        break;
    }
    newMessages = leftovers;
}
while (true) {
    var leftovers = [];
    for (var i = 0; i < newMessages.length; i++) {
        var message = newMessages[i];
        var count = message.strip42e;
        var c42e = check42e(message.message);
        if (c42e.has) {
            count++;
        }
        leftovers.push({ strip31: message.strip31, strip42e: count, message: c42e.message });
    }
    if (_.isEqual(leftovers, newMessages)) {
        break;
    }
    newMessages = leftovers;
}
var c = 0;
newMessages.forEach(function (m) {
    if (m.message === '' && m.strip42e > m.strip31) {
        c++;
    }
});
console.log(c);
