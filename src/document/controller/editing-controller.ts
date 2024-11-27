/**
 * @author WMXPY
 * @namespace Document_Controller
 * @description Editing Controller
 */

import { DocumentProperties, IImbricateDatabase, IImbricateDocument, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { UUIDVersion1 } from "@sudoo/uuid";
import { cloneAndFillDocumentProperties } from "../util/clone-properties";

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

    private readonly _listeningStatusChange: Set<(count: number) => void> = new Set();
    private readonly _listeningVersionChange: Set<() => void> = new Set();
    private readonly _editingDocuments: Map<string, DocumentEditingControllerEditingDocument>;
    private readonly _creatingDocuments: Map<string, DocumentProperties>;

    private constructor(
        database: IImbricateDatabase,
    ) {

        this._database = database;

        this._listeningStatusChange = new Set();
        this._listeningVersionChange = new Set();
        this._editingDocuments = new Map();
        this._creatingDocuments = new Map();
    }

    public listenStatusChange(onChange: (count: number) => void): () => void {

        this._listeningStatusChange.add(onChange);
        return () => {
            this._listeningStatusChange.delete(onChange);
        };
    }

    public listenVersionChange(onChange: () => void): () => void {

        this._listeningVersionChange.add(onChange);

        return () => {
            this._listeningVersionChange.delete(onChange);
        };
    }

    public startCreatingDocument(): string {

        const uuid: string = UUIDVersion1.generateString();

        this._creatingDocuments.set(
            uuid,
            cloneAndFillDocumentProperties(
                {},
                this._database.schema,
            ),
        );

        this._notify();

        return uuid;
    }

    public getCreatingDocuments(): Array<[string, DocumentProperties]> {

        return Array.from(this._creatingDocuments.entries());
    }

    public getCreatingDocument(uuid: string): DocumentProperties | null {

        return this._creatingDocuments.get(uuid) ?? null;
    }

    public updateCreatingDocument(
        uuid: string,
        propertyIdentifier: string,
        value: any,
    ): void {

        const creatingDocument: DocumentProperties | undefined = this._creatingDocuments.get(uuid);
        if (!creatingDocument) {
            return;
        }

        creatingDocument[propertyIdentifier] = {
            type: creatingDocument[propertyIdentifier].type,
            value,
        };

        this._creatingDocuments.set(uuid, creatingDocument);

        this._notify();
    }

    public saveCreatingDocument(
        uuid: string,
    ): void {

        const properties: DocumentProperties | undefined = this._creatingDocuments.get(uuid);

        if (!properties) {
            return;
        }

        this._database.createDocument(properties);
        this._creatingDocuments.delete(uuid);

        this._notifyVersionChange();
    }

    public cancelCreatingDocument(
        uuid: string,
    ): void {

        this._creatingDocuments.delete(uuid);
        this._notify();
    }

    public startEditingDocument(document: IImbricateDocument): void {

        this._editingDocuments.set(
            document.uniqueIdentifier,
            {
                document,
                updatedProperties: cloneAndFillDocumentProperties(
                    document.properties,
                    this._database.schema,
                ),
            },
        );

        this._notify();
    }

    public getUpdatedProperties(document: IImbricateDocument): DocumentProperties | null {

        return this._editingDocuments.get(document.uniqueIdentifier)?.updatedProperties ?? null;
    }

    public setUpdatingProperty(
        document: IImbricateDocument,
        propertyIdentifier: string,
        propertyType: IMBRICATE_PROPERTY_TYPE,
        value: any,
    ): void {

        const editingDocument: DocumentEditingControllerEditingDocument | undefined = this._editingDocuments.get(document.uniqueIdentifier);
        if (!editingDocument) {
            return;
        }

        editingDocument.updatedProperties[propertyIdentifier] = {
            type: propertyType,
            value,
        };

        this._editingDocuments.set(document.uniqueIdentifier, editingDocument);
        this._notify();
    }

    public cancelEditingDocument(document: IImbricateDocument): void {

        this._editingDocuments.delete(document.uniqueIdentifier);
        this._notify();
    }

    public async saveEditingDocument(document: IImbricateDocument): Promise<void> {

        const editingDocument: DocumentEditingControllerEditingDocument | undefined = this._editingDocuments.get(document.uniqueIdentifier);
        if (!editingDocument) {
            return;
        }

        await document.putProperties(editingDocument.updatedProperties);

        this._editingDocuments.delete(document.uniqueIdentifier);
        this._notifyVersionChange();
    }

    public isDocumentEditing(document: IImbricateDocument): boolean {

        return this._editingDocuments.has(document.uniqueIdentifier);
    }

    private _notify(): void {

        for (const listener of this._listeningStatusChange) {
            listener(this._editingDocuments.size);
        }
    }

    private _notifyVersionChange(): void {

        for (const listener of this._listeningVersionChange) {
            listener();
        }
    }
}
