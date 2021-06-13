fs = require("fs");
envsub = require("envsub");

const targetDir = "dist";
const themeDir = "theme";
const templateFile = `${themeDir}/manifest.json`;

fs.readdirSync(themeDir)
  .filter((fn) => fn.endsWith(".env"))
  .forEach((envFile) => {
    let options = {
      all: true, // see --all flag
      diff: false, // see --diff flag
      envFiles: [`${themeDir}/${envFile}`], // see --env-file flag
      protect: true, // see --protect flag
      syntax: "default", // see --syntax flag
      system: false, // see --system flag
    };

    const themeName = envFile.replace(/\.env$/, "");

    const outputDir = `${targetDir}/${themeName}`;
    const outputFile = `${outputDir}/manifest.json`;

    fs.mkdir(outputDir, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
      envsub({ templateFile, outputFile, options })
        .then((envobj) => {
          console.log(`Created manifest: ${outputFile}`);
        })
        .catch((err) => console.error(err.message));
    });
  });
