/**
 * @author WMXPY
 * @namespace Origin
 * @description Origin View
 */

import { Navbar, NavbarBrand, NavbarContent, Spacer } from "@nextui-org/react";
import React, { FC } from "react";
import { TbWorld } from "react-icons/tb";
import { useParams } from "react-router-dom";
import { useAsyncTitle } from "../navigation/hooks/use-title";
import { OriginDatabaseListView } from "./components/origin-database-list-view";
import { OriginInformationView } from "./components/origin-information-view";
import { ImbricateOriginObject, useOrigins } from "./hooks/use-origins";

export type OriginViewProps = {
};

export const OriginView: FC<OriginViewProps> = (
    _props: OriginViewProps,
) => {

    const params = useParams();
    const originUniqueIdentifier: string =
        params["origin-unique-identifier"] as string;

    const origins: ImbricateOriginObject[] = useOrigins();

    const targetOrigin: ImbricateOriginObject | undefined =
        origins.find((origin: ImbricateOriginObject) => {
            return origin.origin.uniqueIdentifier === originUniqueIdentifier;
        });

    useAsyncTitle(
        () => Boolean(targetOrigin),
        () => {
            return [
                targetOrigin!.originName,
                "Origin",
            ];
        },
        [targetOrigin?.origin.uniqueIdentifier],
    );

    if (!targetOrigin) {
        return null;
    }

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
                    {targetOrigin.originName}
                </p>
            </NavbarContent>
            <NavbarContent
                justify="end"
            ></NavbarContent>
        </Navbar>
        <div
            className="pr-2"
        >
            <OriginInformationView
                originInstance={targetOrigin.originInstance}
            />
            <OriginDatabaseListView
                originName={targetOrigin.originName}
                origin={targetOrigin.origin}
            />
        </div>
    </div>);
};
