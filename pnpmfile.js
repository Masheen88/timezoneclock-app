// pnpmfile.js

module.exports = {
  hooks: {
    readPackage(pkg) {
      // Exclude the iconv-corefoundation package in non-macOS environments
      if (process.platform !== "darwin") {
        if (pkg.dependencies["iconv-corefoundation"]) {
          delete pkg.dependencies["iconv-corefoundation"];
        }
        if (pkg.optionalDependencies["iconv-corefoundation"]) {
          delete pkg.optionalDependencies["iconv-corefoundation"];
        }
      }
      return pkg;
    },
  },
};
