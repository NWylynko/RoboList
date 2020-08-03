"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var port = 8080;
app.get("/", function (req, res) {
    res.send('yo');
});
app.listen(port, function () {
    console.log("listening at http://localhost:" + port);
});
//# sourceMappingURL=index.js.map