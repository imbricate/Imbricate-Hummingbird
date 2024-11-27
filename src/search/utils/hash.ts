/**
 * @author WMXPY
 * @namespace Search_Utils
 * @description Hash
 */

import { IMBRICATE_SEARCH_TARGET_TYPE, ImbricateSearchItem, ImbricateSearchTarget } from "@imbricate/core";

export const hashSearchItemTarget = (searchItem: ImbricateSearchItem): string => {

    // IMBRICATE_SEARCH_TARGET_TYPE SWITCH
    switch (searchItem.target.type) {

        case IMBRICATE_SEARCH_TARGET_TYPE.DATABASE: {

            const target: ImbricateSearchTarget<IMBRICATE_SEARCH_TARGET_TYPE.DATABASE> =
                searchItem.target as ImbricateSearchTarget<IMBRICATE_SEARCH_TARGET_TYPE.DATABASE>;

            return `database-${target.target.databaseUniqueIdentifier}`;

        }
        case IMBRICATE_SEARCH_TARGET_TYPE.DOCUMENT: {

            const target: ImbricateSearchTarget<IMBRICATE_SEARCH_TARGET_TYPE.DOCUMENT> =
                searchItem.target as ImbricateSearchTarget<IMBRICATE_SEARCH_TARGET_TYPE.DOCUMENT>;

            return `document-${target.target.databaseUniqueIdentifier}-${target.target.documentUniqueIdentifier}`;
        }
        case IMBRICATE_SEARCH_TARGET_TYPE.MARKDOWN: {

            const target: ImbricateSearchTarget<IMBRICATE_SEARCH_TARGET_TYPE.MARKDOWN> =
                searchItem.target as ImbricateSearchTarget<IMBRICATE_SEARCH_TARGET_TYPE.MARKDOWN>;

            return `markdown-${target.target.databaseUniqueIdentifier}-${target.target.documentUniqueIdentifier}-${target.target.propertyUniqueIdentifier}`;
        }
    }
};
