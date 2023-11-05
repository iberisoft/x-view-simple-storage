const process = require('process');
const express = require('express');
const cors = require('cors');
const path = require('path');
const fsp = require('fs/promises');
const fs = require('fs');
const settings = require('./settings');
const createJpegFile = require('./createJpegFile');

const app = express();
app.use(cors());

const rootPath = process.argv[2];
if (!rootPath) {
    console.error('Root path not defined');
    return;
}

app.get('/storage/:folderName', async (request, response) => {
    const dirPath = path.join(rootPath, request.params.folderName);
    console.log(`Reading ${dirPath}`);
    const fileNames = (await fsp.readdir(dirPath)).filter(fileName => path.extname(fileName).toLowerCase() == '.dcm');
    response.json(fileNames);
});

app.get('/storage/:folderName/:fileName', (request, response) => {
    const filePath = path.join(rootPath, request.params.folderName, request.params.fileName);
    console.log(`Downloading ${filePath}`);
    if (path.extname(filePath) == '.jpg' && !fs.existsSync(filePath)) {
        createJpegFile(filePath.substring(0, filePath.lastIndexOf('.')) + '.dcm', filePath);
    }
    response.download(filePath);
});

app.listen(settings.port, () => {
    console.log(`Listening on port ${settings.port}`);
});
