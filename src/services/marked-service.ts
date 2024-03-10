import { marked } from "marked";
import { MarkedError } from "../core/models/errors";

const renderer = new marked.Renderer();

renderer.paragraph = (text) => {
  return `<p class="my-2">${text}</p>`;
};

renderer.listitem = (text) => {
  return `<li class="text-li my-2 text-sm">${text}</li>`;
};

renderer.heading = (text, level) => {
  return `<h${level} class="font-medium text-sm my-2 text-h">${text}</h${level}>`;
};

renderer.code = (code, language) => {
  return `<pre class="bg-gray-800 p-4 rounded-md"><code class="language-${language} text-gray-100">${code}</code></pre>`;
};

renderer.strong = (text) => {
  return `<strong class="font-medium text-sm">${text}</strong>`;
};

marked.use({ renderer });

const newMarked = (content: string) => {
  try {
    return marked(content);
  } catch (error) {
    throw new MarkedError(`Error parsing content (${error})`);
  }
};

export { newMarked as marked };
