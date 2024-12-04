/**
 * @author WMXPY
 * @namespace Navigation
 * @description Navigation Lenses
 */

import { Listbox, ListboxItem } from "@nextui-org/react";
import React, { FC } from "react";
import { FaPlus } from "react-icons/fa";
import { useLensConfig } from "../lens/hooks/use-lenses";
import { LENS_CONFIG_SOURCE, LensConfigItem } from "../lens/types/lens-config";
import { getUserFriendlyLensSourceName } from "../lens/util/user-friendly";
import { useNavigateLensNewView, useNavigateLensView } from "./hooks/use-routes";

export const NavigationLenses: FC = () => {

    const lensConfig = useLensConfig();
    const navigateToLensNew = useNavigateLensNewView();
    const navigateToLensView = useNavigateLensView();

    return (<div>
        <Listbox
            aria-label="lenses-list-new"
        >
            <ListboxItem
                key="new"
                description="Create a new lens"
                startContent={<FaPlus />}
                className="text-primary"
                color="primary"
                onClick={() => {
                    navigateToLensNew();
                }}
            >
                Add Lens
            </ListboxItem>
        </Listbox>
        <Listbox
            aria-label="lens-list"
            items={lensConfig.items}
            onAction={(key) => {
                navigateToLensView(key as string);
            }}
        >
            {(lens: LensConfigItem<LENS_CONFIG_SOURCE>) => {
                return (<ListboxItem
                    key={lens.lensIdentifier}
                    description={getUserFriendlyLensSourceName(lens.source)}
                >
                    {lens.lensName}
                </ListboxItem>);
            }}
        </Listbox>
    </div>);
};
