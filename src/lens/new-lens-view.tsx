/**
 * @author WMXPY
 * @namespace Lens
 * @description New Lens View
 */

import { IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input, Navbar, NavbarBrand, NavbarContent, Spacer } from "@nextui-org/react";
import { UUIDVersion1 } from "@sudoo/uuid";
import React, { FC } from "react";
import { RiCameraLensFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { CommonPropertySelect, CommonPropertySelectResponse } from "../common/components/property-selector";
import { useNavigateLensView } from "../navigation/hooks/use-routes";
import { LensSlice } from "../store/feature/lens";
import { readLendsConfig, writeLensConfig } from "./storage/lens-config";
import { LENS_CONFIG_SOURCE, LensConfig, LensConfigItem } from "./types/lens-config";

export type NewLensViewProps = {
};

export const NewLensView: FC<NewLensViewProps> = (
    _props: NewLensViewProps,
) => {

    const [selectedImbriScript, setSelectedImbriScript] = React.useState<CommonPropertySelectResponse | null>(null);
    const [lensName, setLensName] = React.useState<string>("");

    const navigateToLensView = useNavigateLensView();

    const dispatch = useDispatch();

    return (<div
        className="flex flex-col gap-2"
    >
        <Navbar
            maxWidth="full"
            isBordered
        >
            <NavbarBrand>
                <RiCameraLensFill
                    className="text-2xl"
                />
                <Spacer />
                <p
                    className="font-mono"
                >
                    Lens
                </p>
            </NavbarBrand>
            <NavbarContent
                justify="center"
            >
                <p className="font-bold text-xl">
                    Create New Lens
                </p>
            </NavbarContent>
            <NavbarContent
                justify="end"
            ></NavbarContent>
        </Navbar>
        <div
            className="pr-2 flex flex-col gap-2"
        >
            <Card
                className="border-1"
                shadow="none"
            >
                <CardHeader>
                    Create Lens
                </CardHeader>
                <CardBody>
                    <Input
                        label="Lens Name"
                        placeholder="The lens name"
                        value={lensName}
                        onChange={(event) => {
                            setLensName(event.target.value);
                        }}
                    />
                </CardBody>
            </Card>
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
                                isDisabled={lensName.length === 0}
                                onClick={() => {

                                    const current: LensConfig = readLendsConfig();

                                    const newItem: LensConfigItem<LENS_CONFIG_SOURCE.IMBRISCRIPT> = {

                                        lensIdentifier: UUIDVersion1.generateString(),

                                        lensName,
                                        source: LENS_CONFIG_SOURCE.IMBRISCRIPT,
                                        target: {
                                            databaseUniqueIdentifier: selectedImbriScript.selectedDatabase.uniqueIdentifier,
                                            documentUniqueIdentifier: selectedImbriScript.selectedDocument.uniqueIdentifier,
                                            propertyKey: selectedImbriScript.selectedProperty,
                                        },
                                    };

                                    const updated: LensConfig = {
                                        items: [
                                            ...current.items,
                                            newItem,
                                        ],
                                    };

                                    writeLensConfig(updated);

                                    dispatch(
                                        LensSlice.actions.setLensConfig(updated),
                                    );

                                    navigateToLensView(newItem.lensIdentifier);
                                }}
                            >
                                Create Lens
                            </Button>
                        </CardFooter>
                    </React.Fragment>}
            </Card>
        </div>
    </div>);
};
