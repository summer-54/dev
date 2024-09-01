import fs from 'fs';

fs.writeFileSync("./dist/index.html", fs.readFileSync("./dist/index.html", {encoding: "utf-8"}).replaceAll("/assets", "/olinf54/assets"), {encoding: "utf-8"});