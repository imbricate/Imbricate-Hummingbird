/**
 * @author WMXPY
 * @namespace Edit
 * @description Edit View
 */

import React, { FC } from "react";
import { useParams } from "react-router-dom";

export const EditView: FC = () => {

    const params = useParams();

    console.log(params);

    return <div>Edit</div>;
};
