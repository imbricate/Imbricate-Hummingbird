/**
 * @author WMXPY
 * @namespace Navigation_Hooks
 * @description Use Routes
 */

import { NavigateOptions, useNavigate } from "react-router-dom";

export const useNavigateConfigView = (): (
    options?: NavigateOptions,
) => void => {

    const navigate = useNavigate();

    return (
        options?: NavigateOptions,
    ) => navigate("/config", options);
};

export const useNavigateSearchView = (): (
    options?: NavigateOptions,
) => void => {

    const navigate = useNavigate();

    return (
        options?: NavigateOptions,
    ) => navigate("/search", options);
};

export const useNavigateOriginNewView = (): (
    options?: NavigateOptions,
) => void => {

    const navigate = useNavigate();

    return (
        options?: NavigateOptions,
    ) => navigate("/origin-new", options);
};

export const useNavigateOriginView = (): (
    originUniqueIdentifier: string,
    options?: NavigateOptions,
) => void => {

    const navigate = useNavigate();

    return (
        originUniqueIdentifier: string,
        options?: NavigateOptions,
    ) => navigate(`/origin/${originUniqueIdentifier}`, options);
};

export const useNavigateLensNewView = (): (
    options?: NavigateOptions,
) => void => {

    const navigate = useNavigate();

    return (
        options?: NavigateOptions,
    ) => navigate("/lens-new", options);
};

export const useNavigateLensView = (): (
    lensUniqueIdentifier: string,
    options?: NavigateOptions,
) => void => {

    const navigate = useNavigate();

    return (
        lensUniqueIdentifier: string,
        options?: NavigateOptions,
    ) => navigate(`/lens/${lensUniqueIdentifier}`, options);
};

export const useNavigateDatabasesView = (): (
    options?: NavigateOptions,
) => void => {

    const navigate = useNavigate();

    return (
        options?: NavigateOptions,
    ) => navigate("/databases", options);
};

export const useNavigateDatabaseDocumentsView = (): (
    databaseUniqueIdentifier: string,
    options?: NavigateOptions,
) => void => {

    const navigate = useNavigate();

    return (
        databaseUniqueIdentifier: string,
        options?: NavigateOptions,
    ) => navigate(`/database/${databaseUniqueIdentifier}/documents`, options);
};

export const useNavigateDocumentView = (): (
    databaseUniqueIdentifier: string,
    documentUniqueIdentifier: string,
    options?: NavigateOptions,
) => void => {

    const navigate = useNavigate();

    return (
        databaseUniqueIdentifier: string,
        documentUniqueIdentifier: string,
        options?: NavigateOptions,
    ) => navigate(`/database/${databaseUniqueIdentifier}/document/${documentUniqueIdentifier}`, options);
};

export const useNavigateDatabaseSchemaView = (): (
    databaseUniqueIdentifier: string,
    options?: NavigateOptions,
) => void => {

    const navigate = useNavigate();

    return (
        databaseUniqueIdentifier: string,
        options?: NavigateOptions,
    ) => navigate(`/database/${databaseUniqueIdentifier}/schema`, options);
};

export const useNavigateViewView = (): (
    databaseUniqueIdentifier: string,
    documentUniqueIdentifier: string,
    propertyUniqueIdentifier: string,
    options?: NavigateOptions,
) => void => {

    const navigate = useNavigate();

    return (
        databaseUniqueIdentifier: string,
        documentUniqueIdentifier: string,
        propertyUniqueIdentifier: string,
        options?: NavigateOptions,
    ) => navigate(`/view/${databaseUniqueIdentifier}/document/${documentUniqueIdentifier}/property/${propertyUniqueIdentifier}`, options);
};

export const useNavigateEditView = (): (
    databaseUniqueIdentifier: string,
    documentUniqueIdentifier: string,
    propertyUniqueIdentifier: string,
    options?: NavigateOptions,
) => void => {

    const navigate = useNavigate();

    return (
        databaseUniqueIdentifier: string,
        documentUniqueIdentifier: string,
        propertyUniqueIdentifier: string,
        options?: NavigateOptions,
    ) => navigate(`/edit/${databaseUniqueIdentifier}/document/${documentUniqueIdentifier}/property/${propertyUniqueIdentifier}`, options);
};
