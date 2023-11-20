export const setValue = (key: string, value: string) => {
    return localStorage.setItem(key, value);
};

export const removeValue = (key: string) => {
    return localStorage.removeItem(key);
};