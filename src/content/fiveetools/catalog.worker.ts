import { buildCatalogSnapshot } from './catalogPipeline';
import { parseDocuments } from './parser';
import type { SourceDocument } from './model';
import * as store from './documentStore';
import pipelineSource from './catalogPipeline.ts?raw';
import parserSource from './parser.ts?raw';
import entriesSource from './entries.ts?raw';
import expandSource from './expand.ts?raw';
import compatibilitySource from './compatibility.ts?raw';
import modelSource from './model.ts?raw';
import psionicSource from './psionicPresentation.ts?raw';
import itemMetadataSource from './itemMetadata.ts?raw';
import bookRulesSource from './bookRules.ts?raw';
// No raw rule data is deleted: only the UI projection avoids duplicating whole raw objects.
const PROJECTION_VERSION = 'lean-catalog-1';
async function fingerprint() { const bytes = new TextEncoder().encode([PROJECTION_VERSION, pipelineSource, parserSource, entriesSource, expandSource, compatibilitySource, modelSource, psionicSource, itemMetadataSource, bookRulesSource].join('\n')); const digest = await crypto.subtle.digest('SHA-256', bytes); return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join(''); }
const version = fingerprint();
self.onmessage = async (event: MessageEvent) => {
    const id = event.data.id;
    try {
        if (event.data.validate) {
            parseDocuments(event.data.validate as SourceDocument[]);
            self.postMessage({ id, ok: true });
            return;
        }
        const documents = event.data.documents as { generation: string; documents: SourceDocument[] } | undefined;
        const input = documents ? {
            readCatalogCache: async () => ({ generation: documents.generation, snapshot: null }),
            readCatalogDocuments: async () => ({ generation: documents.generation, documents: documents.documents.filter(doc => doc.active !== false) }),
            writeCatalogCache: async () => true,
        } : store;
        const snapshot = await buildCatalogSnapshot(input, await version, phase => self.postMessage({ id, phase }));
        self.postMessage({ id, ok: true, snapshot });
    }
    catch (error) {
        self.postMessage({ id, ok: false, error: String(error) });
    }
};

