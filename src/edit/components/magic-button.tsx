/**
 * @author WMXPY
 * @namespace Edit_Components
 * @description Magic Button
 */

import React, { FC } from "react";
import { EditCloseButton } from "./close-button";
import { EditSaveButton } from "./save-button";

export type EditMagicButtonProps = {

    readonly isLoading: boolean;

    readonly valueChanged: boolean;
    readonly saveProperty: () => Promise<void>;
};

export const EditMagicButton: FC<EditMagicButtonProps> = (
    props: EditMagicButtonProps,
) => {

    if (props.valueChanged) {

        return (<EditSaveButton
            isLoading={props.isLoading}
            saveProperty={props.saveProperty}
        />);
    }

    return (<EditCloseButton />);
};
