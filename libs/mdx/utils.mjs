import crypto from 'crypto';
import npath from 'path';

export const md5 = (content) => crypto.createHash('md5').update(content).digest('hex')

// export const encodePath = name => {
//   const ext = npath.extname(name);
//   const nameWithOutExt = name.replace(new RegExp(`${ext.replace('.', '\\.')}$`), '');
//   return nameWithOutExt.split('/').map(s => s === '.' ? '.' : md5(s).slice(0, 6)).join('/') + ext;
// };
