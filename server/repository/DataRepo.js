import { readFileSync } from 'fs';

export function getSectionData() {
    return new Promise((resolve, reject) => {
        try {
            const csvResult = readFileSync(process.cwd() + '\\dataSet.dat', { encoding: 'utf-8' });
            const lines = processData(csvResult);
            resolve(lines);
        } catch (e) {
            reject(e);
        }
    });
}

function processData(allText) {
    const allTextLines = allText.split(/\r\n|\n/);
    const headers = allTextLines[0].split(',');
    const lines = [];

    for (var i = 1; i < allTextLines.length; i++) {
        const data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            const line = {};
            for (var j = 0; j < headers.length; j++) {
                line[headers[j]] = data[j];
            }
            lines.push(line);
        }
    }
    return lines;
}
