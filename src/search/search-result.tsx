/**
 * @author WMXPY
 * @namespace Search
 * @description Search Result
 */

import React, { FC } from "react";
import { SearchResultItem } from "./components/search-result-item";
import { HummingbirdSearchResult } from "./types/search";
import { hashSearchItemTarget } from "./utils/hash";

export type SearchResultProps = {

    readonly searchResults: HummingbirdSearchResult[];
};

export const SearchResult: FC<SearchResultProps> = (
    props: SearchResultProps,
) => {

    const renderItems: React.ReactNode[] = [];

    for (const result of props.searchResults) {

        for (const searchItem of result.result.items) {

            const targetHash = hashSearchItemTarget(searchItem);

            renderItems.push(<SearchResultItem
                key={targetHash}
                origin={result.origin}
                searchItem={searchItem}
            />);
        }
    }

    return (<div
        className="flex flex-col gap-2"
    >
        {renderItems}
    </div>);
};
