import * as core from "@actions/core";
import { sendRequest } from "./requests";

try {
  const webhookUrl = core.getInput("webhook_url")
    ? core.getInput("webhook_url")
    : process.env.WEBHOOK_URL
    ? process.env.WEBHOOK_URL
    : "";

  const method = core.getInput("method")
    ? core.getInput("method")
    : process.env.METHOD
    ? process.env.METHOD
    : "GET";

  const headers = core.getInput("headers")
    ? core.getInput("headers")
    : process.env.HEADERS
    ? process.env.HEADERS
    : "{}";

  try {
    JSON.parse(headers);
  } catch (e) {
    core.setFailed(e.message);
  }

  const body = core.getInput("body")
    ? core.getInput("body")
    : process.env.BODY
    ? process.env.BODY
    : "{}";

  try {
    JSON.parse(body);
  } catch (e) {
    core.setFailed(e.message);
  }

  sendRequest(webhookUrl, method, headers, body)
    .then((data) => {
      core.setOutput("response", data);
    })
    .catch((err) => {
      core.setFailed(err.message);
    });
} catch (error) {
  core.setFailed(error.message);
}
