const childProcess = require('child_process');
const settings = require('./settings');

module.exports = function (filePath, jpegFilePath) {
    childProcess.spawnSync(settings.jpegConverterPath, [filePath, jpegFilePath]);
}
