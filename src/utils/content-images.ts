import path from "node:path";
import type { ImageMetadata } from "astro";

export interface LocalImageAsset {
    src: ImageMetadata;
    sourcePath: string;
}

const imageModules = import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/**/*.{jpg,jpeg,png,webp,gif}",
    { eager: true },
);

export function contentImage(assetPath: string): LocalImageAsset {
    const key = `/src/assets/${assetPath}`;
    const image = imageModules[key]?.default;
    if (!image) throw new Error(`Missing local content image for ${assetPath}`);

    return {
        src: image,
        sourcePath: path.join(process.cwd(), key.slice(1)),
    };
}

export function contentImageFromMetadata(metadata: ImageMetadata): LocalImageAsset {
    const match = Object.entries(imageModules).find(([, image]) => image.default.src === metadata.src);
    if (!match) throw new Error(`Unable to resolve source file for ${metadata.src}`);

    return {
        src: metadata,
        sourcePath: path.join(process.cwd(), match[0].slice(1)),
    };
}
