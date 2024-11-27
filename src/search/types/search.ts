/**
 * @author WMXPY
 * @namespace Search_Types
 * @description Search
 */

import { ImbricateSearchResult } from "@imbricate/core";
import { ImbricateOriginObject } from "../../origin/hooks/use-origins";

export type HummingbirdSearchResult = {

    readonly origin: ImbricateOriginObject;
    readonly result: ImbricateSearchResult;
};
