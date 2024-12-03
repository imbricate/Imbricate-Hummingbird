/**
 * @author WMXPY
 * @namespace Lens
 * @description New Lens View
 */

import { IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import React, { FC } from "react";
import { CommonPropertySelect } from "../common/components/property-selector";

export type NewLensViewProps = {
};

export const NewLensView: FC<NewLensViewProps> = (
    _props: NewLensViewProps,
) => {

    return (<div
        className="flex flex-col gap-2 p-2"
    >
        <Card
            className="border-1"
            shadow="none"
        >
            <CardHeader>
                Select ImbriScript
            </CardHeader>
            <Divider />
            <CardBody>
                <CommonPropertySelect
                    allowedPropertyType={[
                        IMBRICATE_PROPERTY_TYPE.IMBRISCRIPT,
                    ]}
                />
            </CardBody>
        </Card>
    </div>);
};
