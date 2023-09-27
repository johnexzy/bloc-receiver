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
const axios_1 = __importDefault(require("axios"));
function sendWebHook(data, url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const options = {
                url: url,
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                data: JSON.stringify({
                    blocks: [
                        {
                            type: "divider",
                        },
                        {
                            "type": "header",
                            "text": {
                                "type": "plain_text",
                                "text": data.text,
                                "emoji": true
                            }
                        },
                        {
                            type: "section",
                            fields: [
                                {
                                    type: "mrkdwn",
                                    text: `*From*\n${data.from}`,
                                },
                                {
                                    type: "mrkdwn",
                                    text: `*To*\n${data.to}`,
                                },
                            ],
                        },
                        {
                            type: "section",
                            fields: [
                                {
                                    type: "mrkdwn",
                                    text: `*Amount*\n${data.value}`,
                                },
                                {
                                    type: "mrkdwn",
                                    text: `*Type*\n${data.text}`,
                                },
                            ],
                        },
                        {
                            type: "divider",
                        },
                    ],
                }),
            };
            yield (0, axios_1.default)(options);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = sendWebHook;
