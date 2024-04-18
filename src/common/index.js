import { fetchEventSource } from "@microsoft/fetch-event-source";
export class Action {
  constructor(type, payload) {
    this.type = type;
    this.payload = payload;
  }
}

export function aiSearch(prompt, options) {
  const ctrl = new AbortController();
  try {
    fetchEventSource(
      "https://open.bigmodel.cn/api/paas/v3/model-api/chatglm_turbo/sse-invoke",
      {
        method: "POST",
        openWhenHidden: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsInNpZ25fdHlwZSI6IlNJR04ifQ.eyJhcGlfa2V5IjoiNDMyYjgxNGUyMTZjYmEyNGQwOWI5YzUyYzBhMWYxOTYiLCJpYXQiOjE3MTMzNDc0OTEsImV4cCI6MTc0NDg4MzQ5MX0.ft-9tCnccRKioY437xZMnzmvECQ4Z52wXHKtaVVK-G0`,
        },
        body: JSON.stringify({ prompt: [{ role: "user", content: prompt }] }),
        signal: ctrl.signal,
        async onopen(e) {
          const { status } = e;
          if (status > 200) {
            return console.log("open error");
          }
          options.onopen && options.onopen(e);
        },
        onmessage(msg) {
          options.onmessage && options.onmessage(msg);
        },
        async onclose() {
          options.onclose && options.onclose();
        },
        onerror(err) {
          options.onerror && options.onerror(err);
        },
      }
    );
  } catch (err) {
    console.log("e2rr", err);
  }
  return ctrl;
}
