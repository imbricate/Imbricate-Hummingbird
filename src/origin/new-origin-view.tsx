/**
 * @author WMXPY
 * @namespace Origin
 * @description New Origin View
 */

import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import React, { FC } from "react";
import { NewOriginSelect } from "./components/origin-new/origin-new-select";
import { NewOriginSwitch } from "./components/origin-new/origin-new-switch";
import { OriginStorageInstanceStackAPIOrigin } from "./origin-storage";
import { ORIGIN_TYPE } from "./types/origin-types";

export type NewOriginViewProps = {
};

export const NewOriginView: FC<NewOriginViewProps> = (
    _props: NewOriginViewProps,
) => {

    const [originType, setOriginType] = React.useState<ORIGIN_TYPE | null>(null);
    const [originInstance, setOriginInstance] = React.useState<OriginStorageInstanceStackAPIOrigin | null>(null);

    return (<div
        className="flex flex-col gap-2"
    >
        <NewOriginSelect
            onSelect={(type: ORIGIN_TYPE) => {
                setOriginType(type);

                switch (type) {

                    case ORIGIN_TYPE.STACK_API: {
                        setOriginInstance({
                            type: "@imbricate/origin-stack-api",
                            basePath: "",
                            authentication: {
                                type: "Basic",
                                value: "",
                            },
                        });
                        return;
                    }
                }
            }}
        />
        {originType && originInstance && <React.Fragment>
            <Card
                shadow="none"
                className="border-1"
            >
                <CardHeader>
                    Create Origin as {originType}
                </CardHeader>
                <Divider />
                <CardBody>
                    <NewOriginSwitch
                        originType={originType}
                        originInstance={originInstance}
                        onOriginChange={(instance: OriginStorageInstanceStackAPIOrigin) => setOriginInstance(instance)}
                    />
                </CardBody>
            </Card>
            <div>
                <Button
                    variant="flat"
                    color="primary"
                    onClick={() => {
                        console.log(originInstance);
                    }}
                >
                    Create Origin
                </Button>
            </div>

        </React.Fragment>}
    </div>);
};
