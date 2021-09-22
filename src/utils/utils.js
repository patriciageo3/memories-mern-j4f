export const turnNameIntoTag = tagName => {
    const lowerCaseTagName = tagName.toLowerCase();

    return lowerCaseTagName.charAt(0).toUpperCase() + tagName.slice(1);
};