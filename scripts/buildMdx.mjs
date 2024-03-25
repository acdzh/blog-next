import config from '../libs/mdx/mdx.config.mjs';
import { MdxCompiler } from '../libs/mdx/MdxCompiler.mjs';

const argv = process.argv.slice(2);

(async function main() {
  const compiler = new MdxCompiler(config);
  if (argv[0] === '-w') {
    await compiler.watch();
  } else {
    await compiler.run();
  }
})();
