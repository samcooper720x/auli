require("esbuild").buildSync({
  entryPoints: ["src/auli.ts"],
  bundle: true,
  platform: "node",
  target: ["node16.7.0"],
  external: ["./node_modules/*"],
  outfile: "dist/auli.js",
});
