import { readDocument, saveDocuments } from './platformDocuments';
import { createSourceClient } from './sourceClient';

export type { PackageReadRecord, PackageReadState } from './sourceClient';

// Keep page imports stable; native hosts can provide their own adapters to createSourceClient.
export const { checkCoreRevision, loadCore, discoverHomebrew, loadHomebrew } = createSourceClient(
    { readDocument, saveDocuments },
    (input, init) => fetch(input, init),
);
