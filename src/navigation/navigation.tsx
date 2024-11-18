/**
 * @author WMXPY
 * @namespace Navigation
 * @description Navigation
 */

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import React, { FC } from "react";
import { Link } from "react-router-dom";

export const Navigation: FC = () => {

    return (<Navbar>
        <NavbarBrand>
            Imbricate Hummingbird
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
