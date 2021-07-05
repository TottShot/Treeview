import * as React from 'react';
import { TreeViewProvider } from './TreeViewContext';

export function TreeView({ children, onNodeSelect, selected}) {
    return <div>
        <TreeViewProvider onNodeSelect={onNodeSelect} selected={selected}>
            {children}
        </TreeViewProvider>
    </div>;
}