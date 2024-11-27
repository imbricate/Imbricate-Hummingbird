/**
 * @author WMXPY
 * @namespace Search_Component
 * @description Search Result Item
 */

import { IMBRICATE_SEARCH_TARGET_TYPE, ImbricateSearchItem, ImbricateSearchTarget } from "@imbricate/core";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ImbricateOriginObject } from "../../origin/hooks/use-origins";

export type SearchResultItemProps = {

    readonly origin: ImbricateOriginObject;
    readonly searchItem: ImbricateSearchItem;
};

export const SearchResultItem: FC<SearchResultItemProps> = (
    props: SearchResultItemProps,
) => {

    const navigate = useNavigate();

    return (<Card
        shadow="none"
        className="border-1"
        isPressable
        onClick={() => {

            // IMBRICATE_SEARCH_TARGET_TYPE SWITCH
            switch (props.searchItem.target.type) {

                case IMBRICATE_SEARCH_TARGET_TYPE.DATABASE: {

                    const target: ImbricateSearchTarget<IMBRICATE_SEARCH_TARGET_TYPE.DATABASE> =
                        props.searchItem.target as ImbricateSearchTarget<IMBRICATE_SEARCH_TARGET_TYPE.DATABASE>;

                    navigate(`/database/${target.target.databaseUniqueIdentifier}/documents`);
                    return;
                }
                case IMBRICATE_SEARCH_TARGET_TYPE.DOCUMENT: {

                    const target: ImbricateSearchTarget<IMBRICATE_SEARCH_TARGET_TYPE.DOCUMENT> =
                        props.searchItem.target as ImbricateSearchTarget<IMBRICATE_SEARCH_TARGET_TYPE.DOCUMENT>;

                    navigate(`/database/${target.target.databaseUniqueIdentifier}/documents`);
                    return;
                }
                case IMBRICATE_SEARCH_TARGET_TYPE.MARKDOWN: {

                    const target: ImbricateSearchTarget<IMBRICATE_SEARCH_TARGET_TYPE.MARKDOWN> =
                        props.searchItem.target as ImbricateSearchTarget<IMBRICATE_SEARCH_TARGET_TYPE.MARKDOWN>;

                    navigate(`/edit/${target.target.databaseUniqueIdentifier}/document/${target.target.documentUniqueIdentifier}/property/${target.target.propertyUniqueIdentifier}`);
                    return;
                }
            }
        }}
    >
        <CardHeader>
            {props.searchItem.primary}
        </CardHeader>
        <Divider />
        <CardBody>
            {props.searchItem.secondary}
        </CardBody>
        {JSON.stringify(props.searchItem)}
    </Card>);
};
