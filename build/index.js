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
var core = __importStar(require("@actions/core"));
var requests_1 = require("./requests");
try {
    var webhookUrl = core.getInput("webhook_url")
        ? core.getInput("webhook_url")
        : process.env.WEBHOOK_URL
            ? process.env.WEBHOOK_URL
            : "";
    var method = core.getInput("method")
        ? core.getInput("method")
        : process.env.METHOD
            ? process.env.METHOD
            : "GET";
    var headers = core.getInput("headers")
        ? core.getInput("headers")
        : process.env.HEADERS
            ? process.env.HEADERS
            : "{}";
    try {
        JSON.parse(headers);
    }
    catch (e) {
        core.setFailed(e.message);
    }
    var body = core.getInput("body")
        ? core.getInput("body")
        : process.env.BODY
            ? process.env.BODY
            : "{}";
    try {
        JSON.parse(body);
    }
    catch (e) {
        core.setFailed(e.message);
    }
    requests_1.sendRequest(webhookUrl, method, headers, body)
        .then(function (data) {
        core.setOutput("response", data);
    })
        .catch(function (err) {
        core.setFailed(err.message);
    });
}
catch (error) {
    core.setFailed(error.message);
}
