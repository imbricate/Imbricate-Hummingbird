/**
 * @author WMXPY
 * @namespace Lens
 * @description Lens View
 */

import { Button, Navbar, NavbarBrand, NavbarContent, Spacer } from "@nextui-org/react";
import React, { FC } from "react";
import { FaEdit } from "react-icons/fa";
import { HiRefresh } from "react-icons/hi";
import { RiCameraLensFill } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { useVersion } from "../common/hooks/use-version";
import { useAsyncTitle } from "../navigation/hooks/use-title";
import { getRouteLensEditView } from "../navigation/util/routes";
import { LensRender } from "./components/lens-render";
import { useLensConfig } from "./hooks/use-lenses";
import { LENS_CONFIG_SOURCE, LensConfig, LensConfigItem } from "./types/lens-config";

export type LensViewProps = {
};

// LAZY LOAD ONLY
const LensView: FC<LensViewProps> = (
    _props: LensViewProps,
) => {

    const params = useParams();
    const lensIdentifier: string =
        params["lens-identifier"] as string;

    const [version, updateVersion] = useVersion();

    const lensConfig: LensConfig = useLensConfig();

    const targetLens: LensConfigItem<LENS_CONFIG_SOURCE> | undefined =
        lensConfig.items.find((lens: LensConfigItem<LENS_CONFIG_SOURCE>) => {
            return lens.lensIdentifier === lensIdentifier;
        });

    useAsyncTitle(
        () => Boolean(targetLens),
        () => {
            return [
                targetLens!.lensName,
                "Lens",
            ];
        },
        [targetLens?.lensIdentifier],
    );

    if (!targetLens) {
        return null;
    }

    return (<div
        className="flex flex-col gap-2 pb-4 overflow-auto h-full min-h-full"
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
                className="flex flex-col gap-0"
            >
                <p className="font-bold text-xl">
                    {targetLens.lensName}
                </p>
                <Link
                    className="h-2 text-tiny flex gap-1 items-center"
                    to={getRouteLensEditView(targetLens.lensIdentifier)}
                >
                    <FaEdit /><div>Edit Lens</div>
                </Link>
            </NavbarContent>
            <NavbarContent
                justify="end"
            >
                <Button
                    isIconOnly
                    variant="flat"
                    color="primary"
                    onClick={() => {
                        updateVersion();
                    }}
                >
                    <HiRefresh
                        className="text-xl"
                    />
                </Button>
            </NavbarContent>
        </Navbar>
        <div
            className="pr-2 h-full"
        >
            <LensRender
                version={version}
                lensItem={targetLens}
            />
        </div>
    </div>);
};

export default LensView;
