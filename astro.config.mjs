import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";

// Turn ```mermaid code fences into <pre class="mermaid"> blocks so the client
// can render them as diagrams. We do this in a remark plugin (before syntax
// highlighting) so Shiki leaves the diagram source alone. Authors just write a
// normal ```mermaid block in any .mdx file - no imports, no image files.
function escapeHtml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function remarkMermaid() {
    return (tree) => {
        const walk = (node) => {
            if (!node || !Array.isArray(node.children)) return;
            node.children = node.children.map((child) => {
                if (child.type === "code" && child.lang === "mermaid") {
                    return {
                        type: "html",
                        value: `<pre class="mermaid">${escapeHtml(child.value)}</pre>`,
                    };
                }
                walk(child);
                return child;
            });
        };
        walk(tree);
    };
}


// Deployed as a GitHub Pages "project page" for the repo
//   github.com/Foysal-Munsy/projects-case-studies
// so the live URL is https://foysal-munsy.github.io/projects-case-studies/.
// The root portfolio at foysal-munsy.github.io is a separate repo and stays
// untouched. If you ever move this to a user page or custom domain, set `site`
// and change `base` to "/".
export default defineConfig({
    site: "https://foysal-munsy.github.io",
    base: "/projects-case-studies",
    integrations: [
        mdx(),
        tailwind({ applyBaseStyles: false }),
    ],

    markdown: {
        remarkPlugins: [remarkMermaid],
        shikiConfig: {
            theme: "github-dark",
            wrap: true,
        },
    },

});
