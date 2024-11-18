/**
 * @author WMXPY
 * @namespace Navigation
 * @description Navigation
 */

import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import React, { FC } from "react";
import { NavigationLogo } from "./logo";

export const Navigation: FC = () => {

    return (<Navbar>
        <NavbarBrand>
            <NavigationLogo />
        </NavbarBrand>
        <NavbarContent className="sm:flex gap-4" justify="center">
            <NavbarItem>
                <Link color="foreground" href="views">
                    Views
                </Link>
            </NavbarItem>
            <NavbarItem>
                <Link color="foreground" href="databases">
                    Databases
                </Link>
            </NavbarItem>
            <NavbarItem>
                <Link color="foreground" href="Origins">
                    Origins
                </Link>
            </NavbarItem>
        </NavbarContent>
    </Navbar>);
};
