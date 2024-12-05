/**
 * @author WMXPY
 * @namespace Edit_Components
 * @description Close Button
 */

import { Button } from "@nextui-org/react";
import React, { FC } from "react";
import { FaTimes } from "react-icons/fa";

export type EditCloseButtonProps = {
};

export const EditCloseButton: FC<EditCloseButtonProps> = (
    _props: EditCloseButtonProps,
) => {

    return (<Button
        isIconOnly
        variant="solid"
        color="success"
        onClick={async () => {
            window.close();
        }}
    >
        <FaTimes
            className="text-large"
        />
    </Button>);
};
