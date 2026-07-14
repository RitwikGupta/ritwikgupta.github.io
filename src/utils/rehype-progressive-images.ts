import path from "node:path";
import { createLqip } from "./lqip";

interface HastNode {
    type: string;
    tagName?: string;
    properties?: Record<string, unknown>;
    children?: HastNode[];
}

interface VFileLike {
    path?: string;
}

function isElement(node: HastNode): node is HastNode & {
    tagName: string;
    properties: Record<string, unknown>;
    children: HastNode[];
} {
    return node.type === "element";
}

async function wrapLocalImages(parent: HastNode, file: VFileLike): Promise<void> {
    if (!parent.children) return;
    for (let index = 0; index < parent.children.length; index += 1) {
        const node = parent.children[index];
        if (!isElement(node)) continue;

        const src = node.tagName === "img" ? node.properties.src : undefined;
        if (typeof src === "string" && !src.startsWith("/") && !URL.canParse(src)) {
            const filePath = file.path;
            if (!filePath) continue;

            const sourcePath = path.resolve(path.dirname(filePath), src);
            const lqip = await createLqip(sourcePath);
            node.properties.loading ??= "lazy";
            node.properties.decoding ??= "async";

            parent.children[index] = {
                type: "element",
                tagName: "span",
                properties: {
                    className: ["progressive-image", "progressive-image--content"],
                    dataProgressiveImage: "",
                    style: `--lqip: url("${lqip}");`,
                },
                children: [node],
            };
            continue;
        }

        await wrapLocalImages(node, file);
    }
}

export default function rehypeProgressiveImages() {
    return async (tree: HastNode, file: VFileLike) => wrapLocalImages(tree, file);
}
