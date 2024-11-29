/**
 * @author WMXPY
 * @namespace Database_Components
 * @description Database Header
 */

import { IImbricateDatabase } from "@imbricate/core";
import { Button, ButtonGroup } from "@nextui-org/react";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

export type DatabaseHeaderProps = {

    readonly database: IImbricateDatabase;
    readonly isSchema?: boolean;
};

export const DatabaseHeader: FC<DatabaseHeaderProps> = (props: DatabaseHeaderProps) => {

    const navigate = useNavigate();

    return <div
        className="m-2"
    >
        <ButtonGroup>
            <div
                className="text-2xl border-l-2 border-t-2 border-b-2 pl-2 pr-2 m-0 box-content h-9 flex justify-center items-center rounded-l-xl"
            >
                {props.database.databaseName}
            </div>
            {props.isSchema
                ? <Button
                    variant="flat"
                    color="primary"
                    onClick={() => {
                        navigate(`/database/${props.database.uniqueIdentifier}/documents`, {
                            replace: true,
                        });
                    }}
                >
                    View Documents
                </Button>
                : <Button
                    variant="flat"
                    onClick={() => {
                        navigate(`/database/${props.database.uniqueIdentifier}/schema`);
                    }}
                >
                    Edit Schema
                </Button>}
        </ButtonGroup>
    </div>;
};
