/**
 * @author WMXPY
 * @namespace Edit_Components
 * @description Save Button
 */

import { Button, ButtonGroup } from "@nextui-org/react";
import React, { FC } from "react";
import { FaRegSave, FaTimes } from "react-icons/fa";

export type EditSaveButtonProps = {

    readonly isLoading: boolean;

    readonly saveProperty: () => Promise<void>;
};

export const EditSaveButton: FC<EditSaveButtonProps> = (props: EditSaveButtonProps) => {

    return (<ButtonGroup
        variant="solid"
        color="primary"
    >
        <Button
            isLoading={props.isLoading}
            startContent={<FaRegSave
                className="text-medium"
            />}
            onClick={async () => {
                await props.saveProperty();
            }}
        >
            Save
        </Button>
        <Button
            isLoading={props.isLoading}
            isIconOnly
            variant="solid"
            color="success"
            onClick={async () => {

                await props.saveProperty();
                window.close();
            }}
        >
            <FaTimes
                className="text-large"
            />
        </Button>
    </ButtonGroup>);
};
