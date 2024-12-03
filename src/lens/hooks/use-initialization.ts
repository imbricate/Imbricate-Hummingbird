/**
 * @author WMXPY
 * @namespace Lens_Hooks
 * @description Use Initialization
 */

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LensSlice } from "../../store/feature/lens";
import { readLendsConfig } from "../storage/lens-config";

export const useLensInitialization = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        const lensConfig = readLendsConfig();

        dispatch(
            LensSlice.actions.setLensConfig(lensConfig),
        );
    }, []);
};
