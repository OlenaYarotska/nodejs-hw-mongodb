const parseContactType = (contactType) => {
    const isString = typeof contactType === 'string';
    if (!isString) return;
    const isContactType = (contactType) => ['work', 'home', 'personal'].includes(contactType);
    if (isContactType(contactType)) return contactType;
};

  const parseBoolean = (isFavourite) => {
    if (typeof isFavourite === 'boolean') {
        return isFavourite;
    }
    if (typeof isFavourite === 'string') {
        if (isFavourite.toLowerCase() === 'true') {
            return true;
        }
        if (isFavourite.toLowerCase() === 'false') {
            return false;
        }
    }
    return;
};

export const parseFilterParams = (query) => {
    const { contactType, isFavourite } = query;

    const parsedContactType = parseContactType(contactType);
    const parsedIsFavourite = parseBoolean(isFavourite);

    return {
        contactType: parsedContactType,
        isFavourite: parsedIsFavourite,
    };
};

