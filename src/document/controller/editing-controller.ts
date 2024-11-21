/**
 * @author WMXPY
 * @namespace Document_Controller
 * @description Editing Controller
 */

import { DocumentProperties, IImbricateDatabase, IImbricateDocument } from "@imbricate/core";
import { cloneDocumentProperties } from "../util/clone-properties";

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

    private readonly _listening: Set<(count: number) => void> = new Set();
    private readonly _editingDocuments: Map<string, DocumentEditingControllerEditingDocument>;

    private constructor(
        database: IImbricateDatabase,
    ) {

        this._database = database;

        this._listening = new Set();
        this._editingDocuments = new Map();
    }

    public listen(onChange: (count: number) => void): () => void {

        this._listening.add(onChange);
        return () => {

            console.log("dispose");
            this._listening.delete(onChange);
        };
    }

    public startEditingDocument(document: IImbricateDocument): void {

        this._editingDocuments.set(
            document.uniqueIdentifier,
            {
                document,
                updatedProperties: cloneDocumentProperties(document.properties),
            },
        );

        this._notify();
    }

    public cancelEditingDocument(document: IImbricateDocument): void {

        this._editingDocuments.delete(document.uniqueIdentifier);
        this._notify();
    }

    public isDocumentEditing(document: IImbricateDocument): boolean {

        return this._editingDocuments.has(document.uniqueIdentifier);
    }

    private _notify(): void {

        for (const listener of this._listening) {
            listener(this._editingDocuments.size);
        }
    }
}
