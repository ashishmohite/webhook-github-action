import fetch, { Headers } from "node-fetch";

async function requests(
  url = "",
  method = "GET",
  headers = "",
  data: string | "{}"
): Promise<string> {
  interface Params {
    method: string;
    headers: Headers;
    [key: string]: any;
  }

  const params: Params = {
    method: method,
    headers: new Headers(JSON.parse(headers)),
  };

  if (method != "GET") {
    params.body = data;
  }
  const response = await fetch(url, params);
  return await response.text();
}

export const sendRequest = requests;
