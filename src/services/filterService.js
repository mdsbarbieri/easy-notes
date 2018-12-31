const isAbleToShow = (query, note) => {
    if (!query) {
        return true;
    }
    if (query.includes('*')) {
        let validCount = 0;
        const filtersArray = query.split('*');
        filtersArray.forEach(currentQuery => {
            if (_compareContent(currentQuery, note)) {
                validCount++;
            }
        });
        return validCount === filtersArray.length
    }
    return _compareContent(query, note);
}

const _compareContent = (query, note) => {
    const regularizedQuery = regularizeString(query);
    const regularizedTitle = regularizeString(note.title);
    const regularizedContent = regularizeString(note.content);
    if (regularizedQuery && !regularizedContent.includes(regularizedQuery) && !regularizedTitle.includes(regularizedQuery)) {
        return false;
    }
    return true;
}

const regularizeString = string => {
    if (!string) {
        return "";
    }
    const replaceCharsString = string.replace(/[^a-zA-Z0-9]+/g, "");
    return replaceCharsString.toLowerCase();
}

export {
    isAbleToShow,
    regularizeString
}