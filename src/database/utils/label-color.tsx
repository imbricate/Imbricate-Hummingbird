/**
 * @author WMXPY
 * @namespace Database_Utils
 * @description Label Color
 */

import React from "react";

export const getLabelColorDot = (color: string): React.ReactNode => {

    switch (color) {

        case "black": return <div
            className="w-4 h-4 rounded-full bg-black"
        />;
        case "red": return <div
            className="w-4 h-4 rounded-full bg-red-600"
        />;
        case "blue": return <div
            className="w-4 h-4 rounded-full bg-blue-600"
        />;
        case "purple": return <div
            className="w-4 h-4 rounded-full bg-purple-600"
        />;
    }

    return null;
};
