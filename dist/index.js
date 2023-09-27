"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const webhookParser_1 = __importDefault(require("./webhookParser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    return res.status(400).json('Server Ready');
});
// webhook
app.post("/webhook", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        console.log(body);
        (0, webhookParser_1.default)(body, process.env.SLACKHOOK);
    }
    catch (e) {
        console.log(e);
        return res.status(400).json();
    }
    return res.status(200).json();
}));
app.listen(port, () => {
    console.log(`Listening for API Calls on port: ${port}`);
});
