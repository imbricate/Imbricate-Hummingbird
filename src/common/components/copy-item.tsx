/**
 * @author WMXPY
 * @namespace Common_Components
 * @description Copy Item
 */

import { Button } from "@nextui-org/react";
import React, { FC } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

export type CommonCopyItemProps = {

    readonly startContent?: React.ReactNode;
    readonly prefix?: React.ReactNode;
    readonly content: string;
};

export const CommonCopyItem: FC<CommonCopyItemProps> = (props: CommonCopyItemProps) => {

    const [copied, setCopied] = React.useState<boolean>(false);

    return (<div className="flex flex-col">
        {props.startContent && <div>
            {props.startContent}
        </div>}
        <div className="flex gap-1 justify-center items-center">
            {props.prefix && <div>
                {props.prefix}
            </div>}
            {props.content}
            <Button
                isIconOnly
                size="sm"
                variant="light"
                color={copied ? "success" : "default"}
                disabled={copied}
                onClick={() => {

                    setCopied(true);
                    navigator.clipboard.writeText(props.content);
                }}
            >
                {copied
                    ? <FaCheck />
                    : <MdOutlineContentCopy />}
            </Button>
        </div>

    </div>);
};
