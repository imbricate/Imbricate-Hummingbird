/**
 * @author WMXPY
 * @namespace Origin_Hooks
 * @description Initialization
 */

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { originSlice } from "../../store/feature/origin";
import { getOriginStorageInstance } from "../origin-storage";

export const useOriginInitialization = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        const originInstances = getOriginStorageInstance();

        for (const origin of originInstances.origins) {
            console.log(origin);
        }

        dispatch(
            originSlice.actions.setOriginInstance({
                origins: [{
                    type: "@imbricate/origin-stack-api",
                    basePath: "http://localhost:3000/3aed7b5d30561f970002248479705a4684d9d451/",
                    authentication: {
                        type: "Bearer",
                        value: "test",
                    },
                }],
            }),
        );
    }, []);
};
