/**
 * @author WMXPY
 * @namespace Database
 * @description Databases View
 */

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import React, { FC } from "react";

const columns = [
    {
        key: "database-identifier",
        label: "Identifier",
    },
    {
        key: "database-name",
        label: "Name",
    },
];

export type DatabasesViewProps = {
};

export const DatabasesView: FC = () => {

    return (<div>
        <Table
            aria-label="database-list"
            selectionMode="single"
            removeWrapper
            onRowAction={(row: any) => {
                alert(JSON.stringify(row));
            }}
        >
            <TableHeader columns={columns}>
                {(column) => {
                    return (<TableColumn key={column.key}>
                        {column.label}
                    </TableColumn>);
                }}
            </TableHeader>
            <TableBody>
                <TableRow key="1" className="hover:cursor-pointer">
                    <TableCell>Tony</TableCell>
                    <TableCell>CEO</TableCell>
                </TableRow>
                <TableRow key="2">
                    <TableCell>Lang</TableCell>
                    <TableCell>Technical Lead</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>);
};
