import tailwind from 'bun-plugin-tailwind';
import { rm } from 'node:fs/promises';
import path from 'node:path';

const outdir = path.join(process.cwd(), 'dist');
await rm(outdir, { recursive: true, force: true });

const entrypoints = [...new Bun.Glob('src/**/*.html').scanSync()];

const defineArgs: Record<string, string> = {
   'process.env.NODE_ENV': JSON.stringify('production'),
};

for (const key in process.env) {
   if (key.startsWith('BUN_PUBLIC_')) {
      defineArgs[`process.env.${key}`] = JSON.stringify(process.env[key]);
   }
}

const result = await Bun.build({
   entrypoints,
   outdir,
   plugins: [tailwind],
   minify: true,
   target: 'browser',
   sourcemap: 'linked',
   define: defineArgs,
});

for (const output of result.outputs) {
   console.log(
      ` ${path.relative(process.cwd(), output.path)}  ${(output.size / 1024).toFixed(1)} KB`,
   );
}
