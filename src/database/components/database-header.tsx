/**
 * @author WMXPY
 * @namespace Database_Components
 * @description Database Header
 */

import { IImbricateDatabase } from "@imbricate/core";
import { Button, Navbar, NavbarBrand, NavbarContent, Spacer } from "@nextui-org/react";
import React, { FC } from "react";
import { FaDatabase } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export type DatabaseHeaderProps = {

    readonly database: IImbricateDatabase;
    readonly isSchema?: boolean;
};

export const DatabaseHeader: FC<DatabaseHeaderProps> = (props: DatabaseHeaderProps) => {

    const navigate = useNavigate();

    return (<Navbar
        isBordered
    >
        <NavbarBrand>
            <FaDatabase
                className="text-2xl"
            />
            <Spacer />
            <p
                className="font-mono"
            >
                Database
            </p>
        </NavbarBrand>
        <NavbarContent
            justify="center"
        >
            <p className="font-bold text-xl">
                {props.database.databaseName}
            </p>
        </NavbarContent>
        <NavbarContent
            justify="end"
        >
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
        </NavbarContent>
    </Navbar>);
};
