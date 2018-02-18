export function setCookie(cname: string, cvalue: any, exdays = 1): void {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

export function getCookie(cname: string): any {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

export function setLocalStorage(cname: string, cvalue: any): void {
    localStorage.setItem(cname, cvalue);
}

export function getLocalStorage(cname: string): any {
    return localStorage.getItem(cname);
}

export function deleteLocalStorage(cname: string): void {
    localStorage.removeItem(cname);
}

export function deleteCookie(cname: string): void {
    setCookie(cname, '', 0);
}


export function isLocalStorageAvailable(): boolean {
    const test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

export const getSavingMethod = () => {
    return isLocalStorageAvailable() ? setLocalStorage : setCookie;
};
export const getRetrieveMethod = () => {
    return isLocalStorageAvailable() ? getLocalStorage : getCookie;
}
;export const getDeleteMethod = () => {
    return isLocalStorageAvailable() ? deleteLocalStorage : deleteCookie;
};

export const saveToStorage = getSavingMethod();
export const loadFromStorage = getRetrieveMethod();
export const deleteFromStorage = getDeleteMethod();