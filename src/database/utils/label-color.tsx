/**
 * @author WMXPY
 * @namespace Database_Utils
 * @description Label Color
 */

import React from "react";

export const getLabelColorClassName = (color: string): string | null => {

    switch (color) {

        case "black": return "bg-black";
        case "red": return "bg-red-600";
        case "blue": return "bg-blue-600";
        case "purple": return "bg-purple-600";
    }

    return null;
};

export const getLabelColorTextClassNameReverse = (color: string): string | null => {

    switch (color) {

        case "black": return "text-white";
        case "red": return "text-white";
        case "blue": return "text-white";
        case "purple": return "text-white";
    }

    return null;
};

export const getLabelColorDot = (color: string): React.ReactNode => {

    const className: string | null = getLabelColorClassName(color);

    if (!className) {
        return null;
    }

    return (<div
        className={`w-4 h-4 rounded-full ${className}`}
    />);
};
