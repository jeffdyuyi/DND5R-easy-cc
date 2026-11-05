import { IS_ANDROID_BUILD } from '../../platform/build';
import * as web from './documentStore';
import { nativeSourceStore, readNativeDocuments } from '../../platform/nativeSourceStore';
import type { SourceDocument } from './model';
import type { DocumentRetirement } from './sourceDocument';

export const readDocument = (repository: SourceDocument['repository'], path: string) =>
    IS_ANDROID_BUILD ? nativeSourceStore.readDocument(repository, path) : web.readDocument(repository, path);
export const saveDocuments = (documents: SourceDocument[], retire?: DocumentRetirement) =>
    IS_ANDROID_BUILD ? nativeSourceStore.saveDocuments(documents, retire) : web.saveDocuments(documents, retire);
export const readDocuments = async () =>
    IS_ANDROID_BUILD ? (await readNativeDocuments()).documents.filter(doc => doc.active !== false) : web.readDocuments();
