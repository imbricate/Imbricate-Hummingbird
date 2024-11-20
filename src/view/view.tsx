/**
 * @author WMXPY
 * @namespace View
 * @description View
 */

import React, { FC } from "react";
import { useParams } from "react-router-dom";

export const ViewRoute: FC = () => {

    const params = useParams();

    console.log(params);

    return <div>View</div>;
};
