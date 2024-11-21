/**
 * @author WMXPY
 * @namespace Document_Controller
 * @description Editing Controller
 */

import { DocumentProperties, IImbricateDatabase, IImbricateDocument } from "@imbricate/core";

export type DocumentEditingControllerEditingDocument = {

    readonly document: IImbricateDocument;
    readonly updatedProperties: DocumentProperties;
};

export class DocumentEditingController {

    public static create(
        database: IImbricateDatabase,
    ): DocumentEditingController {

        return new DocumentEditingController(database);
    }

    private readonly _database: IImbricateDatabase;

    private readonly _editingDocuments: Map<string, DocumentEditingControllerEditingDocument>;

    private constructor(
        database: IImbricateDatabase,
    ) {

        this._database = database;

        this._editingDocuments = new Map();
    }

    public startEditingDocument(document: IImbricateDocument): void {

        this._editingDocuments.set(
            document.uniqueIdentifier,
            {
                document,
                updatedProperties: document.properties,
            },
        );
    }
}
