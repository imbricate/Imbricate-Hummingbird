/**
 * @author WMXPY
 * @namespace Common_Window
 * @description Window
 */

export const openWindow = (url: string): void => {

    const win = window as Window | null;
    if (win) {
        win.open(url, "_blank")?.focus();
    }
};

export const openEditWindow = (
    databaseUniqueIdentifier: string,
    documentUniqueIdentifier: string,
    propertyUniqueIdentifier: string,
): void => {

    openWindow(`/edit/${databaseUniqueIdentifier}/document/${documentUniqueIdentifier}/property/${propertyUniqueIdentifier}`);
};

export const openViewWindow = (
    databaseUniqueIdentifier: string,
    documentUniqueIdentifier: string,
    propertyUniqueIdentifier: string,
): void => {

    openWindow(`/view/${databaseUniqueIdentifier}/document/${documentUniqueIdentifier}/property/${propertyUniqueIdentifier}`);
};
