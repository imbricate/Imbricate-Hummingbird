/**
 * @author WMXPY
 * @namespace Navigation_Util
 * @description Routes
 */

export const getRouteSearchView = (
): string => {

    return "/search";
};

export const getRouteOriginNewView = (
): string => {

    return "/origin-new";
};

export const getRouteOriginView = (
    originUniqueIdentifier: string,
): string => {

    return `/origin/${originUniqueIdentifier}`;
};

export const getRouteLensNewView = (
): string => {

    return "/lens-new";
};

export const getRouteLensView = (
    lensUniqueIdentifier: string,
): string => {

    return `/lens/${lensUniqueIdentifier}`;
};

export const getRouteLensEditView = (
    lensUniqueIdentifier: string,
): string => {

    return `/lens/${lensUniqueIdentifier}/edit`;
};

export const getRouteDatabasesView = (
): string => {

    return "/databases";
};

export const getRouteDatabaseDocumentsView = (
    databaseUniqueIdentifier: string,
): string => {

    return `/database/${databaseUniqueIdentifier}/documents`;
};

export const getRouteDocumentView = (
    databaseUniqueIdentifier: string,
    documentUniqueIdentifier: string,
): string => {

    return `/database/${databaseUniqueIdentifier}/document/${documentUniqueIdentifier}`;
};

export const getRouteDatabaseSchemaView = (
    databaseUniqueIdentifier: string,
): string => {

    return `/database/${databaseUniqueIdentifier}/schema`;
};

export const getRouteViewView = (
    databaseUniqueIdentifier: string,
    documentUniqueIdentifier: string,
    propertyUniqueIdentifier: string,
): string => {

    return `/view/${databaseUniqueIdentifier}/document/${documentUniqueIdentifier}/property/${propertyUniqueIdentifier}`;
};

export const getRouteEditView = (
    databaseUniqueIdentifier: string,
    documentUniqueIdentifier: string,
    propertyUniqueIdentifier: string,
): string => {

    return `/edit/${databaseUniqueIdentifier}/document/${documentUniqueIdentifier}/property/${propertyUniqueIdentifier}`;
};
