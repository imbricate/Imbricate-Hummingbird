/**
 * @author WMXPY
 * @namespace Edit
 * @description Edit
 */

import React, { FC } from "react";
import { useParams } from "react-router-dom";

export const EditRoute: FC = () => {

    const params = useParams();

    console.log(params);

    return <div>Edit</div>;
};
