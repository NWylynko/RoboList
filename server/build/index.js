"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = express_1.default();
var port = 8080;
app.use(body_parser_1.default.json());
var data = {};
app.get("/", function (req, res) {
    res.send(data);
});
app.post("/", function (req, res) {
    console.log(req.body);
    var _a = req.body, id = _a.id, ip = _a.ip;
    data[id] = { ip: ip };
    res.send('success');
});
app.listen(port, function () {
    console.log("listening at http://localhost:" + port);
});
//# sourceMappingURL=index.js.map