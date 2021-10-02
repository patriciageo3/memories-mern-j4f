export const turnNameIntoTag = tagName => {
    const lowerCaseTagName = tagName.toLowerCase();

    return lowerCaseTagName.charAt(0).toUpperCase() + tagName.slice(1);
};

export const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify({ ...data }));
};

export const getLocalStorageItem = key => {
    const localStorageItem = localStorage.getItem(key);
    return JSON.parse(localStorageItem);
};

export const removeLocalStorageItem = key => {
    localStorage.removeItem(key);
};