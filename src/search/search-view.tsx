/**
 * @author WMXPY
 * @namespace Search
 * @description Search View
 */

import { Button, Input } from "@nextui-org/react";
import React, { FC } from "react";
import { FaSearch } from "react-icons/fa";
import { useOrigins } from "../origin/hooks/use-origins";
import { HummingbirdSearchResult } from "./types/search";
import { SearchResult } from "./search-result";

export const SearchView: FC = () => {

    const origins = useOrigins();

    const [keyword, setKeyword] = React.useState<string>("");
    const [searchResults, setSearchResults] = React.useState<HummingbirdSearchResult[]>([]);

    return (<div>
        <div className="m-5">
            <div
                className="flex gap-2"
            >
                <Input
                    className="flex-1"
                    variant="bordered"
                    color="primary"
                    label="keyword"
                    value={keyword}
                    onChange={(event) => {
                        setKeyword(event.target.value);
                    }}
                />
                <Button
                    className="w-[56px] h-[56px]"
                    variant="flat"
                    color="primary"
                    isIconOnly
                    onClick={async () => {

                        const searchResults: HummingbirdSearchResult[] = [];

                        for (const origin of origins) {
                            const result = await origin.origin.search(keyword);
                            searchResults.push({
                                origin: origin,
                                result,
                            });
                        }

                        setSearchResults(searchResults);
                    }}
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
