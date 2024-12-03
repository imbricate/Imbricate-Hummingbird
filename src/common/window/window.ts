/**
 * @author WMXPY
 * @namespace Common_Window
 * @description Window
 */

export const openWindow = (url: string): void => {

    const windowClone = window as Window | null;

    setTimeout(() => {

        if (windowClone) {
            windowClone.open(
                url,
                "_blank",
                "noopener,noreferrer",
            );
        }
    }, 0);

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
