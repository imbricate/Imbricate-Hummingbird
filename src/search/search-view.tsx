/**
 * @author WMXPY
 * @namespace Search
 * @description Search View
 */

import { Button, Input } from "@nextui-org/react";
import React, { FC } from "react";
import { FaSearch } from "react-icons/fa";
import { useOrigins } from "../origin/hooks/use-origins";
import { SearchResult } from "./search-result";
import { HummingbirdSearchResult } from "./types/search";

export const SearchView: FC = () => {

    const origins = useOrigins();

    const [keyword, setKeyword] = React.useState<string>("");
    const [searchResults, setSearchResults] = React.useState<HummingbirdSearchResult[]>([]);

    const performSearch = async () => {

        const searchResults: HummingbirdSearchResult[] = [];

        for (const origin of origins) {
            const result = await origin.origin.search(keyword);
            searchResults.push({
                origin: origin,
                result,
            });
        }

        setSearchResults(searchResults);
    };

    return (<div>
        <div className="mt-5 mb-5">
            <div
                className="flex gap-2"
            >
                <Input
                    autoFocus
                    className="flex-1"
                    variant="bordered"
                    color="primary"
                    label="keyword"
                    value={keyword}
                    onChange={(event) => {
                        setKeyword(event.target.value);
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            performSearch();
                        }
                    }}
                />
                <Button
                    className="w-[56px] h-[56px]"
                    variant="flat"
                    color="primary"
                    isIconOnly
                    onClick={performSearch}
                >
                    <FaSearch />
                </Button>
            </div>
        </div>
        <SearchResult
            searchResults={searchResults}
        />
    </div>);
};
