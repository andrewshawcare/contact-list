/* global nodeRequire */
({
  baseUrl: './src',
  name: 'main',
  out: './build/main.js',
  onModuleBundleComplete: ({ path: filePath }) => {
    const fs = nodeRequire('fs');
    const amdclean = nodeRequire('amdclean');
    fs.writeFileSync(filePath, amdclean.clean({ filePath }));
  }
});
