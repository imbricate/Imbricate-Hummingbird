/**
 * @author WMXPY
 * @namespace Navigation
 * @description Navigation Lenses
 */

import { Listbox, ListboxItem } from "@nextui-org/react";
import React, { FC } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigateLensNewView } from "./hooks/use-routes";

export const NavigationLenses: FC = () => {

    const navigateToLensNew = useNavigateLensNewView();

    return (<div>
        <Listbox
            aria-label="lenses-list-new"
        >
            <ListboxItem
                key="new"
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
    </div>);
};
