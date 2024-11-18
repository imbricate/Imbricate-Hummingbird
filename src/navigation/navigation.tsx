/**
 * @author WMXPY
 * @namespace Navigation
 * @description Navigation
 */

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { createLogoText } from "../util/logo";

const logoText = createLogoText();

export const Navigation: FC = () => {

    return (<Navbar>
        <NavbarBrand className="font-mono whitespace-pre">
            {logoText}
        </NavbarBrand>
        <NavbarContent>
            <NavbarItem>
                <Link to="databases">
                    Databases
                </Link>
            </NavbarItem>
            <NavbarItem>
                <Link to="databases">
                    Databases
                </Link>
            </NavbarItem>
        </NavbarContent>
    </Navbar>);
};
