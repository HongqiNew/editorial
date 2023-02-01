const [year, month, day] = [new Date().getUTCFullYear(), new Date().getUTCMonth() + 1, new Date().getUTCDate()]

export const isAnniversary = month % 6 === 2 && day === 5 // Birthday: 2022/8/5

export const age = year - 2023 + Math.ceil(month / 6) * 0.5
