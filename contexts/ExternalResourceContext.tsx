import React, { createContext, useContext } from 'react';
import { useExternalResources } from '../hooks/useExternalResources';
const ExternalContext = createContext<ReturnType<typeof useExternalResources> | null>(null);
export function ExternalResourceProvider({ children }: {
    children: React.ReactNode;
}) {
    const resources = useExternalResources();
    return <ExternalContext.Provider value={resources}>{children}</ExternalContext.Provider>;
}
export function useExternalLibrary() {
    const value = useContext(ExternalContext);
    if (!value)
        throw Error('ExternalResourceProvider is required');
    return value;
}
