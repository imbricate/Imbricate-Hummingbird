/**
 * @author WMXPY
 * @namespace Edit_Components
 * @description Save Button
 */

import { Button, ButtonGroup, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import React, { FC } from "react";
import { FaRegSave } from "react-icons/fa";
import { FaCircleChevronDown } from "react-icons/fa6";

export type EditSaveButtonProps = {

    readonly saveProperty: () => Promise<void>;
};

const descriptionsMap: Record<string, string> = {
    saveAndClose: "Save property and close this editor.",
    saveAndContinue: "Save property and continue editing.",
};

const labelsMap: Record<string, string> = {
    saveAndClose: "Save and Close",
    saveAndContinue: "Save and Continue",
};

export const EditSaveButton: FC<EditSaveButtonProps> = (props: EditSaveButtonProps) => {

    const [selectedOption, setSelectedOption] = React.useState(new Set(["saveAndClose"]));
    const selectedOptionValue = Array.from(selectedOption)[0];

    return (<ButtonGroup
        variant="solid"
        color="primary"
    >
        <Button
            startContent={<FaRegSave />}
            onClick={async () => {
                await props.saveProperty();

                if (selectedOptionValue === "saveAndClose") {
                    window.close();
                }
            }}
        >
            {labelsMap[selectedOptionValue]}
        </Button>
        <Dropdown
            placement="bottom-end"
        >
            <DropdownTrigger>
                <Button
                    isIconOnly
                >
                    <FaCircleChevronDown />
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                disallowEmptySelection
                aria-label="Merge options"
                selectedKeys={selectedOption}
                selectionMode="single"
                onSelectionChange={(set: any) => {
                    setSelectedOption(set);
                }}
                className="max-w-[300px]"
            >
                <DropdownItem key="saveAndClose" description={descriptionsMap["saveAndClose"]}>
                    {labelsMap["saveAndClose"]}
                </DropdownItem>
                <DropdownItem key="saveAndContinue" description={descriptionsMap["saveAndContinue"]}>
                    {labelsMap["saveAndContinue"]}
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </ButtonGroup>);
};
