import { marked } from "marked";

const renderer = new marked.Renderer();

renderer.code = (code, language) => {
  return `<pre class="bg-gray-100 p-4 rounded-md"><code class="language-${language} text-gray-800">${code}</code></pre>`;
};

marked.use({ renderer });

export { marked };
