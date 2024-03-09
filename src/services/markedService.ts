import { marked } from "marked";

const renderer = new marked.Renderer();

renderer.paragraph = (text) => {
  return `<p class="my-2">${text}</p>`;
};

renderer.code = (code, language) => {
  return `<pre class="bg-gray-800 p-4 rounded-md"><code class="language-${language} text-gray-100">${code}</code></pre>`;
};

marked.use({ renderer });

export { marked };
