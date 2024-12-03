/**
 * @author WMXPY
 * @namespace Common_Components
 * @description Property Selector
 */

import { IImbricateDatabase, IImbricateDocument } from "@imbricate/core";
import React, { FC } from "react";
import { CommonPropertyDatabaseSelect } from "./selector/database-selector";
import { CommonPropertyDocumentSelect } from "./selector/document-selector";

export type CommonPropertySelectProps = {
};

export const CommonPropertySelect: FC<CommonPropertySelectProps> = (
    _props: CommonPropertySelectProps,
) => {

    const [selectedDatabase, setSelectedDatabase] = React.useState<IImbricateDatabase | null>(null);
    const [selectedDocument, setSelectedDocument] = React.useState<IImbricateDocument | null>(null);

    return (<div
        className="flex flex-col gap-2"
    >
        <CommonPropertyDatabaseSelect
            selectedDatabase={selectedDatabase}
            onSelectDatabase={setSelectedDatabase}
        />
        {selectedDatabase
            && <CommonPropertyDocumentSelect
                databaseUniqueIdentifier={selectedDatabase.uniqueIdentifier}
                databaseSchema={selectedDatabase.schema}
                selectedDocument={selectedDocument}
                onSelectDocument={setSelectedDocument}
            />}
    </div>);
};
