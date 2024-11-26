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

        dispatch(
            originSlice.actions.setOriginInstance(originInstances),
        );
    }, []);
};
