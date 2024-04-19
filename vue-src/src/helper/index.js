import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
export function mdRender() {
  const mdi = new MarkdownIt({
    breaks: true,
    highlight: function (str, lang) {
      console.log("highlight", str, lang);
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(str, { language: lang, ignoreIllegals: true })
              .value +
            "</code></pre>"
          );
        } catch (__) {}
      }

      return (
        '<pre class="hljs"><code>' + mdi.utils.escapeHtml(str) + "</code></pre>"
      );
    },
  });
  return mdi;
}
