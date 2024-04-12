import fs from 'fs';
import npath from 'path';
import sharp from 'sharp';

import { visit } from 'unist-util-visit';

function formatSize(size) {
  if (size < 1024) {
    return `${size} B`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else {
    return `${(size / 1024 / 1024).toFixed(2)} MB`;
  }
}

export class MdxWebpConvertPlugin {
  apply(compiler) {
    compiler.hooks['after-load'].tap('MdxWebpConvertPlugin', async (name) => {
      const extname = npath.extname(name);
      if (extname === '.png' || extname === '.jpg' || extname === '.jpeg') {
        const content = fs.readFileSync(npath.join(compiler.options.output, name))
        const image = sharp(content);
        const metadata = await image.metadata();
        if (metadata.format === 'png' ||  metadata.format === 'jpeg') {
          const webp = image.webp({ quality: 90 })
          const buffer = await webp.toBuffer();
          compiler.emitFile(name.replace(new RegExp(`${extname}$`), '.webp'), buffer);
          Promise.all([image.metadata(), sharp(buffer).metadata()]).then(([meta, webpMeta]) => {
            compiler.emitLog(`convert ${name} to webp, ${formatSize(metadata.size)} -> ${formatSize(webpMeta.size)}, -${(100 - webpMeta.size / metadata.size * 100).toFixed(2)}%`);
          });
        }
      }
    });
  }
}
