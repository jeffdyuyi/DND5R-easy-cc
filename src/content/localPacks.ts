/** Optional workstation-only packs. The Android build replaces this module with an empty map. */
export default import.meta.glob('../../data/builtin/srd-*.json', { eager: true, import: 'default' }) as Record<string, any>;
