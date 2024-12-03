/**
 * @author WMXPY
 * @namespace Common_Components_Selector
 * @description Document Selector
 */

import { IImbricateDocument, ImbricateDatabaseSchema } from "@imbricate/core";
import { Select, SelectItem } from "@nextui-org/react";
import React, { FC } from "react";
import { useDocuments } from "../../../document/hooks/use-documents";
import { getDocumentPrimary } from "../../../document/util/primary";

export type CommonPropertyDocumentSelectProps = {

    readonly databaseUniqueIdentifier: string;
    readonly databaseSchema: ImbricateDatabaseSchema;

    readonly selectedDocument: IImbricateDocument | null;
    readonly onSelectDocument: (document: IImbricateDocument) => void;
};

export const CommonPropertyDocumentSelect: FC<CommonPropertyDocumentSelectProps> = (
    props: CommonPropertyDocumentSelectProps,
) => {

    const documents = useDocuments(
        props.databaseUniqueIdentifier,
        0,
    );

    return (<Select
        label="Document"
        isLoading={documents.documents.length === 0}
        selectedKeys={props.selectedDocument ? [props.selectedDocument.uniqueIdentifier] : []}
        onChange={(event) => {

            const selectedDocument = documents.documents.find((document) => {
                return document.uniqueIdentifier === event.target.value;
            });

            props.onSelectDocument(selectedDocument!);
        }}
    >
        {documents.documents.map((document) => {

            const primaryKey = getDocumentPrimary(
                props.databaseSchema,
                document.properties,
            );

            const primaryValue: string = primaryKey ?? document.uniqueIdentifier;

            return (<SelectItem
                key={document.uniqueIdentifier}
            >
                {primaryValue}
            </SelectItem>);
        })}
    </Select>);
};
