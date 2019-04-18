const fs = require('fs');
const path = require('path');

function getSourceFilePath (filePath)  {
    let entries = [];
    fs.readdirSync(filePath).forEach((filename) => {
        const combineDir = path.join(filePath, filename);
        const stat = fs.statSync(combineDir);
        if (stat && stat.isDirectory()) {
            entries = entries.concat(getSourceFilePath(combineDir));
        } else {
            entries.push(combineDir);
            }
    });
    return entries;
};
module.exports= getSourceFilePath;