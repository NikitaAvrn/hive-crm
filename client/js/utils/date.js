export function formatDateRu(isoDate) {
    if (!isoDate) return '';
    const [year, month, day] = isoDate.split('-');
    return `${day}.${month}.${year}`;
}

export function diffDays(dueDate, today) {
    if (!dueDate) return null;
    const d = new Date(dueDate + 'T00:00:00');
    const now = today || new Date();
    const t = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((d - t) / 86400000);
}