import fs from 'fs';

function replace(path) {
    fs.writeFileSync(path, fs.readFileSync(path, {encoding: "utf-8"}).replaceAll("/assets", "/olinf54/assets"), {encoding: "utf-8"});
}

replace("./dist/index.html");
fs.readdirSync("./dist/assets").forEach(file => {
    if (file.endsWith(".js")) replace("./dist/assets/" + file);
});