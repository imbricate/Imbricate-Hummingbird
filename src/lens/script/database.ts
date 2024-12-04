/**
 * @author WMXPY
 * @namespace Lens_Script
 * @description Database
 */

import { ImbricateDocumentQuery } from "@imbricate/core";
import { ISandbox, MarkedMixin } from "@sudoo/marked";
import { prepareDatabases } from "../util/prepare-databases";

export const createDatabaseSandboxPlugin = (): MarkedMixin => {

    return (sandbox: ISandbox) => {

        sandbox.provide("@imbricate/database", {
            getDatabase: async (uniqueIdentifier: string) => {

                const databases = await prepareDatabases();

                const targetDatabase = databases.find((database) => database.database.uniqueIdentifier === uniqueIdentifier);

                if (!targetDatabase) {
                    return null;
                }

                return {
                    queryDocument: async (
                        query: ImbricateDocumentQuery = {},
                    ) => {

                        const documents = await targetDatabase.database.queryDocuments(query);

                        return documents.map((document) => {
                            return {
                                uniqueIdentifier: document.uniqueIdentifier,
                            };
                        });
                    },
                };
            },
        });
    };
};
