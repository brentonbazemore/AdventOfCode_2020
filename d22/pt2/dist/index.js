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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var rawData = fs.readFileSync('input.txt', 'utf8');
var _a = rawData.split('\n\n'), p1String = _a[0], p2String = _a[1];
var Player = /** @class */ (function () {
    function Player(initString) {
        var d = initString.split('\n');
        d.shift();
        this.deck = d.map(function (s) { return +s; });
    }
    Player.prototype.getCard = function () {
        return this.deck.shift() || -1;
    };
    Player.prototype.addWinnings = function (mine, theirs) {
        this.deck.push(mine, theirs);
    };
    return Player;
}());
var playWar = function (p1, p2) {
    var snapshots = new Set();
    var winner = null;
    var round = 1;
    while (p1.deck.length > 0 && p2.deck.length > 0) {
        var roundSnap = [p1.deck.join(','), p2.deck.join(',')].join(':');
        if (snapshots.has(roundSnap)) {
            return { player: p1, id: 1 };
        }
        snapshots.add([p1.deck.join(','), p2.deck.join(',')].join(':'));
        var p1Card = p1.getCard();
        var p2Card = p2.getCard();
        // console.log({ round, p1: { card: p1Card, deck: p1.deck }, p2: { card: p2Card, deck: p2.deck } });
        if (p1.deck.length >= p1Card && p2.deck.length >= p2Card) {
            var fullP1 = __spreadArrays([p1Card], p1.deck);
            var fullP2 = __spreadArrays([p2Card], p2.deck);
            var newP1 = new Player(fullP1.slice(0, p1Card + 1).join('\n'));
            var newP2 = new Player(fullP2.slice(0, p2Card + 1).join('\n'));
            winner = playWar(newP1, newP2);
            if (winner.id === 1) {
                p1.addWinnings(p1Card, p2Card);
            }
            else if (winner.id === 2) {
                p2.addWinnings(p2Card, p1Card);
            }
        }
        else {
            if (p1Card > p2Card) {
                p1.addWinnings(p1Card, p2Card);
            }
            else if (p2Card > p1Card) {
                p2.addWinnings(p2Card, p1Card);
            }
        }
        round++;
    }
    if (p1.deck.length === 0) {
        return { player: p2, id: 2 };
    }
    if (p2.deck.length === 0) {
        return { player: p1, id: 1 };
    }
    return { player: p1, id: 1 };
};
var player1 = new Player(p1String);
var player2 = new Player(p2String);
var winner = playWar(player1, player2);
var calculateScore = function (p) {
    var deckSize = p.deck.length;
    var sum = 0;
    for (var i = deckSize; i >= 0; i--) {
        sum += p.getCard() * i;
    }
    console.log(sum);
};
calculateScore(winner.player);
