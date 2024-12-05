/**
 * @author WMXPY
 * @namespace Origin
 * @description New Origin View
 */

import { Button, Card, CardBody, CardHeader, Divider, Navbar, NavbarBrand, NavbarContent, Spacer } from "@nextui-org/react";
import React, { FC } from "react";
import { TbWorld } from "react-icons/tb";
import { NewOriginSelect } from "./components/origin-new/origin-new-select";
import { NewOriginSwitch } from "./components/origin-new/origin-new-switch";
import { OriginStorageInstance, OriginStorageInstanceStackAPIOrigin, getOriginStorageInstance, putOriginStorageInstance } from "./origin-storage";
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
        <Navbar
            maxWidth="full"
            isBordered
        >
            <NavbarBrand>
                <TbWorld
                    className="text-2xl"
                />
                <Spacer />
                <p
                    className="font-mono"
                >
                    Origin
                </p>
            </NavbarBrand>
            <NavbarContent
                justify="center"
            >
                <p className="font-bold text-xl">
                    Add Origin
                </p>
            </NavbarContent>
            <NavbarContent
                justify="end"
            ></NavbarContent>
        </Navbar>
        <div
            className="flex flex-col gap-2 pr-2"
        >
            <NewOriginSelect
                onSelect={(type: ORIGIN_TYPE) => {
                    setOriginType(type);

                    switch (type) {

                        case ORIGIN_TYPE.STACK_API: {
                            setOriginInstance({
                                originName: "new origin",
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

                            const currentOrigins: OriginStorageInstance = getOriginStorageInstance();

                            currentOrigins.origins.push(originInstance);

                            putOriginStorageInstance(currentOrigins);
                        }}
                    >
                        Create Origin
                    </Button>
                </div>
            </React.Fragment>}
        </div>

    </div>);
};
