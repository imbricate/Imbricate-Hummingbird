/**
 * @author WMXPY
 * @namespace Lens
 * @description New Lens View
 */

import { IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import React, { FC } from "react";
import { CommonPropertySelect, CommonPropertySelectResponse } from "../common/components/property-selector";

export type NewLensViewProps = {
};

export const NewLensView: FC<NewLensViewProps> = (
    _props: NewLensViewProps,
) => {

    const [selectedImbriScript, setSelectedImbriScript] = React.useState<CommonPropertySelectResponse | null>(null);

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
                    onSelectCancel={() => {
                        setSelectedImbriScript(null);
                    }}
                    onSelectConfirm={(response: CommonPropertySelectResponse) => {
                        setSelectedImbriScript(response);
                    }}
                />
            </CardBody>
            {selectedImbriScript &&
                <React.Fragment>
                    <Divider />
                    <CardFooter>
                        <Button
                            variant="flat"
                            color="primary"
                        >
                            Create Lens
                        </Button>
                    </CardFooter>
                </React.Fragment>}
        </Card>
    </div>);
};
