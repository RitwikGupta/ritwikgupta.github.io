import sharp from "sharp";

const lqipCache = new Map<string, Promise<string>>();

export function createLqip(sourcePath: string): Promise<string> {
    const cached = lqipCache.get(sourcePath);
    if (cached) return cached;

    const pending = sharp(sourcePath, { animated: false })
        .rotate()
        .resize({ width: 32, height: 32, fit: "inside", withoutEnlargement: true })
        .blur(1)
        .webp({ quality: 35 })
        .toBuffer()
        .then((buffer) => `data:image/webp;base64,${buffer.toString("base64")}`);

    lqipCache.set(sourcePath, pending);
    return pending;
}
