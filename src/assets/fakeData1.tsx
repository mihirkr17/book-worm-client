const currentYear = new Date().getFullYear();
const targetYear = 1899;

export const publishedYear = Array.from({ length: currentYear - targetYear }, (_, index) => 1900 + index);