export interface SectionData {
    id: string;
    title: string;
    parentId: string;
    ordering: string;
}

export interface SectionTreeData {
    children: SectionTreeData[];
    id: string;
    title: string;
    parentId: string;
    ordering: string;
}