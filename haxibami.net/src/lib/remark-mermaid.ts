import * as playwright from "playwright";
import rehypeParse from "rehype-parse";
import { optimize } from "svgo";
import { unified } from "unified";
import { is } from "unist-util-is";
import { visit } from "unist-util-visit";

import { isParent } from "./mdast-util-node-is";

import type { Code, Paragraph } from "mdast";
import type { Mermaid, Config } from "mermaid";
import type { Plugin, Transformer } from "unified";
import type { Node, Parent } from "unist";
import type { VFileCompatible } from "vfile";

declare const mermaid: Mermaid;

export const UserTheme = {
  Forest: "forest",
  Dark: "dark",
  Default: "default",
  Neutral: "neutral",
  Null: "null",
} as const;

export type Theme = typeof UserTheme[keyof typeof UserTheme];

export interface RemarkMermaidOptions {
  /**
   * Launch options to pass to playwright.
   *
   * @default {}
   */
  launchOptions?: playwright.LaunchOptions;

  /**
   * The Mermaid theme to use.
   *
   * @default 'default'
   */
  theme?: Theme;

  /**
   * Whether to wrap svg with <div> element.
   *
   * @default "false"
   */
  wrap?: boolean;

  /**
   * When wrapping with <div>, you can choose what classname to add.
   * @default []
   */
  classname?: string[];
}

function svgParse(svg: string): Node {
  const processor = unified().use(rehypeParse);
  const ast = processor.parse(svg);
  return ast;
}

function isMermaid(node: unknown): node is Code {
  if (!is(node, { type: "code", lang: "mermaid" })) {
    return false;
  }
  return true;
}

const remarkMermaid: Plugin<[RemarkMermaidOptions?]> = function mermaidTrans(
  options
): Transformer {
  const DEFAULT_SETTINGS = {
    launchOptions: {
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
    theme: "default",
    wrap: false,
    classname: [],
  };

  const settings = Object.assign({}, DEFAULT_SETTINGS, options);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async (node: Node, _file: VFileCompatible) => {
    const promises: (() => Promise<void>)[] = [];
    const browser = await playwright.chromium.launch(settings.launchOptions);
    const context = await browser.newContext({
      viewport: { width: 1000, height: 3000 },
    });
    const page = await context.newPage();
    const html = `<!DOCTYPE html>`;
    await page.setContent(html);
    await page.addScriptTag({
      url: "https://unpkg.com/mermaid@9.1.7/dist/mermaid.min.js",
    });
    await page.setViewportSize({ width: 1000, height: 3000 });
    visit(node, isMermaid, visitor);
    await Promise.all(promises.map((t) => t()));
    await browser.close();

    function visitor(node: Code, index: number, parent: Parent | undefined) {
      if (!isParent(parent)) {
        return;
      }
      promises.push(async () => {
        const svg = await getSvg(node, page, settings.theme);
        if (settings.wrap) {
          parent.children[index] = {
            type: "parent",
            children: [],
            data: {
              hChildren: [
                {
                  type: "element",
                  children: [svgParse(svg)],
                  tagName: "div",
                  properties: {
                    className: settings.classname,
                  },
                },
              ],
            },
          } as Parent;
        } else {
          parent.children[index] = {
            type: "paragraph",
            children: [],
            data: {
              hChildren: [svgParse(svg)],
            },
          } as Paragraph;
        }
      });
      return true;
    }
  };
};

async function getSvg(node: Code, page: playwright.Page, theme: Theme) {
  const graph = await page.evaluate(
    ([code, theme]) => {
      const id = "a";
      const config: Config = {
        theme: theme as Theme,
      };
      mermaid.initialize(config);
      const div = document.createElement("div");
      div.innerHTML = mermaid.render(id, code);
      return div.innerHTML;
    },
    [node.value, theme]
  );

  const svgoOptions = {
    js2svg: {
      indent: 2,
      pretty: true,
    },
    multipass: false,
    plugins: [
      { name: "cleanupEnableBackground", active: false },
      { name: "convertShapeToPath", active: false },
      {
        name: "inlineStyles",
        active: true,
        params: { onlyMatchedOnce: false },
      },
      { name: "convertStyleToAttrs", active: true },
      { name: "moveElemsAttrsToGroup", active: false },
      { name: "moveGroupAttrsToElems", active: false },
      { name: "removeEmptyAttrs", active: false },
      { name: "removeOffCanvasPaths", active: true },
      { name: "removeRasterImages", active: true },
      { name: "removeScriptElement", active: true },
      { name: "removeStyleElement", active: true },
      {
        name: "removeUselessStrokeAndFill",
        active: true,
        params: { removeNone: true },
      },
      { name: "removeXMLNS", active: true },
      { name: "reusePaths", active: true },
      { name: "removeAttrs", active: true, params: { attrs: ["class"] } },
    ],
  };

  const value = optimize(graph, svgoOptions).data;
  return value;
}

export default remarkMermaid;
