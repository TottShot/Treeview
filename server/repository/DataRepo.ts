import { readFileSync } from "fs";
import { SectionData, SectionTreeData } from "./types";

export function getSectionData() {
    return new Promise<SectionTreeData[]>((resolve, reject) => {
        try {
            const csvResult = readFileSync("./dataSet.dat", { encoding: "utf-8" });
            const lines = processData<SectionData>(csvResult);
            resolve(generateTree(lines));
        } catch (e) {
            reject(e);
        }
    });
}

function processData<T = Record<string, string>>(allText: string) {
    const allTextLines = allText.split(/\r\n|\n/);
    const headers = allTextLines[0].split(',');
    const lines: Array<T> = [];

    for (var i = 1; i < allTextLines.length; i++) {
        const data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            const line: T = {} as T;
            for (var j = 0; j < headers.length; j++) {
                line[headers[j]] = data[j];
            }
            lines.push(line);
        }
    }
    return lines;
}

function generateTree(data: SectionData[]): SectionTreeData[] {
    // This relies on mutation from implied, which is the reason for the copy before creation
    const root: SectionTreeData[] = [];
    const nodeMap = new Map<string, SectionTreeData>();

    data.forEach((value) => {
        const treeValue: SectionTreeData = { ...value, children: [] };
        if (!value.parentId) {
            root.push(treeValue);
        } else {
            const parent = nodeMap.get(value.parentId);
            if (parent) {
                parent.children.push(treeValue);
            } else {
                root.push(treeValue);
            }
        }
        nodeMap.set(treeValue.id, treeValue);
    });
    return root;
}