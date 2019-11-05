export const isDataUrl = (v: string) =>
    v.trim().startsWith('data:') && v.includes(',')
