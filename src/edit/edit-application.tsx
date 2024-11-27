/**
 * @author WMXPY
 * @namespace Edit
 * @description Edit Application
 */

import React, { FC } from "react";
import { useParams } from "react-router-dom";
import useDarkMode from "use-dark-mode";
import "../index.css";
import { useOriginInitialization } from "../origin/hooks/use-initialization";
import { EditView } from "./edit-view";

export const EditApplication: FC = () => {

    const darkMode = useDarkMode(true);
    useOriginInitialization();

    const params = useParams();

    const databaseUniqueIdentifier: string = params["database-unique-identifier"] as string;
    const documentUniqueIdentifier: string = params["document-unique-identifier"] as string;
    const propertyUniqueIdentifier: string = params["property-unique-identifier"] as string;

    return <main className={`${darkMode.value ? "dark" : ""} h-screen flex flex-col overflow-hidden`}>
        <EditView
            databaseUniqueIdentifier={databaseUniqueIdentifier}
            documentUniqueIdentifier={documentUniqueIdentifier}
            propertyUniqueIdentifier={propertyUniqueIdentifier}
        />
    </main>;
};
