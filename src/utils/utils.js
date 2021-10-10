export const turnNameIntoTag = tagName => {
    const lowerCaseTagName = tagName.toLowerCase();

    return lowerCaseTagName.charAt(0).toUpperCase() + tagName.slice(1);
};

export const formatStringToCamelCase = text => {
    const words = text.split(" ");
    if (words.length > 2) return;

    const secondWord = words[1];

    if(!!secondWord) {
        const firstLetter = secondWord.charAt(0);
        const formatSecondWord = secondWord.replace(firstLetter, firstLetter.toUpperCase());
        const formattedWords = words.slice(0, 1);
        formattedWords.push(formatSecondWord);
        return formattedWords.join("");
    }

    return text;
};

export const saveToLocalStorage = (key, data) => {
    
    localStorage.setItem(key, JSON.stringify({ ...data }));
};

export const saveProfileWithGivenName = (key, data) => {
    // Google Sign In saves the name as "givenName" & "familyName"
    // we use "givenName" for the greeting in the Navbar
    if (!data.profile.givenName) data.profile.givenName = data.profile.name.split(" ")[0];

    saveToLocalStorage(key, data);
};

export const getLocalStorageItem = key => {
    const localStorageItem = localStorage.getItem(key);
    return JSON.parse(localStorageItem);
};

export const removeLocalStorageItem = key => {
    localStorage.removeItem(key);
};