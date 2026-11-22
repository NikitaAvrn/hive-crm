export function metaToOptions(meta) {
    return Object.entries(meta)
        .map(([value, m]) => ({ value, ...m }))
        .sort((a, b) => a.order - b.order)
}