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
var player1 = new Player(p1String);
var player2 = new Player(p2String);
while (player1.deck.length > 0 && player2.deck.length > 0) {
    var p1Card = player1.getCard();
    var p2Card = player2.getCard();
    if (p1Card > p2Card) {
        player1.addWinnings(p1Card, p2Card);
    }
    else if (p2Card > p1Card) {
        player2.addWinnings(p2Card, p1Card);
    }
}
var calculateScore = function (p) {
    var deckSize = p.deck.length;
    var sum = 0;
    for (var i = deckSize; i >= 0; i--) {
        sum += p.getCard() * i;
    }
    console.log(sum);
};
calculateScore(player1);
calculateScore(player2);
