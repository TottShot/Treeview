import * as React from "react";

export const SectionContext = React.createContext();

export function SectionProvider({ children }) {
    const [contentId, setContentId] = React.useState();
    return <SectionContext.Provider value={{
        contentId,
        setContentId
    }}>
        {children}
    </SectionContext.Provider>
}

export function useSectionContext() {
    const context = React.useContext(SectionContext);
    return context;
}