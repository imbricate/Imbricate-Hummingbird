/**
 * @author WMXPY
 * @namespace Document_Components_PropertyValue_Reference
 * @description Selected Reference
 */

import { DocumentPropertyValueObjectReference } from "@imbricate/core";
import { Button, Link } from "@nextui-org/react";
import React, { FC } from "react";
import { MdDelete } from "react-icons/md";
import { LoadingWrapper } from "../../../../common/components/loading-wrapper";
import { useDocument } from "../../../hooks/use-document";
import { getDocumentPrimary } from "../../../util/primary";
import { FaDatabase } from "react-icons/fa";
import { useNavigateDocumentView } from "../../../../navigation/hooks/use-routes";

export type DocumentReferenceValueSelectedReferenceProps = {

    readonly reference: DocumentPropertyValueObjectReference;
    readonly onDelete: () => void;
};

export const DocumentReferenceValueSelectedReference: FC<DocumentReferenceValueSelectedReferenceProps> = (
    props: DocumentReferenceValueSelectedReferenceProps,
) => {

    const navigateToDocument = useNavigateDocumentView();

    const document = useDocument(
        props.reference.databaseUniqueIdentifier,
        props.reference.documentUniqueIdentifier,
    );

    if (!document) {
        return (<LoadingWrapper
            size="md"
            color="default"
        />);
    }

    const primaryKey = getDocumentPrimary(
        document.database.database.schema,
        document.document.properties,
    );

    const displayKey = primaryKey ?? document.document.uniqueIdentifier;

    return (<div
        className="flex items-center gap-2 w-full"
    >
        <div
            className="flex-1"
        >
            <Link
                className="hover:cursor-pointer"
                onClick={() => {
                    navigateToDocument(
                        props.reference.databaseUniqueIdentifier,
                        props.reference.documentUniqueIdentifier,
                    );
                }}
            >
                {displayKey}
            </Link>
            <div
                className="text-tiny text-gray-600 flex gap-1 items-center"
            >
                <FaDatabase />
                {document.database.database.databaseName}
            </div>
        </div>
        <Button
            color="danger"
            variant="flat"
            isIconOnly
            radius="sm"
            onClick={props.onDelete}
        >
            <MdDelete />
        </Button>
    </div>);
};