"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomId = void 0;
function generateRandomId() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        S4() +
        S4());
}
exports.generateRandomId = generateRandomId;
