import * as React from 'react';

export const TreeViewContext = React.createContext();

export function TreeViewProvider({ children, onNodeSelect, selected }) {
    const [expanded, setExpanded] = React.useState(new Set());
    
    const controlExpanded = React.useCallback((nodeId) => {
        setExpanded((prev) => {
            if (prev.has(nodeId)) {
                const newSet = new Set([...prev].filter((id) => id !== nodeId)); 
                return newSet;
            } else {
                return new Set([nodeId, ...prev]);
            }
        });
    }, []);

    return <TreeViewContext.Provider value={{
        selected,
        onNodeSelect,
        expanded,
        controlExpanded
    }}>
        {children}
    </TreeViewContext.Provider>
}

export function useTreeViewContext() {
    const context = React.useContext(TreeViewContext);
    return context;
}
