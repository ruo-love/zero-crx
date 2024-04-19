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
    fetchEventSource("https://open.bigmodel.cn/api/paas/v4/chat/completions", {
      method: "POST",
      openWhenHidden: true,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 432b814e216cba24d09b9c52c0a1f196.jf4kvde0vFLhFkSC",
      },
      body: JSON.stringify({
        stream: true,
        model: "glm-4",
        messages: [{ role: "user", content: prompt }],
      }),
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
    });
  } catch (err) {
    console.log("e2rr", err);
  }
  return ctrl;
}
