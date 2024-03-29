const storage = window.localStorage;

const encode = data => window.btoa(window.JSON.stringify(data));

const decode = string => window.JSON.parse(window.atob(string));

const persist = (key, data) => {
    if (key) {
        return storage.setItem(key, encode(data));
    }

    return null;
};

const get = (key) => {
    if (key) {
        const item = storage.getItem(key);
        if (item) {
            return decode(item);
        }
    }

    return null;
};

const clear = (key) => {
    if (key) {
        return storage.removeItem(key);
    }

    return storage.clear();
};

// TODO Remove in prod
window.clearStorage = clear;

export {
    persist,
    get,
    clear,
};
