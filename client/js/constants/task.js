export const STATUS_META = {
    todo: { label: 'К выполнению', color: 'primary', order: 0 },
    in_progress: { label: 'В работе', color: 'warning', order: 1 },
    review: { label: 'На проверке', color: 'info', order: 2 },
    paused: { label: 'Приостановлено', color: 'secondary', order: 3 },
    canceled: { label: 'Отменено', color: 'danger', order: 4 },
    done: { label: 'Готово', color: 'success', order: 5 },
}

export const PRIORITY_META = {
    low: { label: 'Низкий', color: 'secondary', order: 0 },
    medium: { label: 'Средний', color: 'primary', order: 1 },
    high: { label: 'Высокий', color: 'warning', order: 2 },
    critical: { label: 'Критический', color: 'danger', order: 3 },
}

export const DUE_SOON_DAYS = 5