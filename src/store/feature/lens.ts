/**
 * @author WMXPY
 * @namespace Store_Feature
 * @description Lens
 */

import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { LensConfig } from "../../lens/types/lens-config";

export type LensSliceState = {

    readonly lensConfig: LensConfig;
};

export type LensSliceReducers = {

    readonly setLensConfig: (state: LensSliceState, action: {
        payload: LensConfig,
    }) => LensSliceState;
};

export const LensSlice = createSlice<
    LensSliceState,
    LensSliceReducers,
    "lens",
    any
>({
    name: "lens",
    initialState: {
        lensConfig: {
            items: [],
        },
    },
    reducers: {
        setLensConfig: (state: LensSliceState, action: {
            payload: LensConfig,
        }) => {
            return {
                ...state,
                lensConfig: action.payload,
            };
        },
    },
});

export const useLensSlice = (): LensSliceState => {

    const lensState: LensSliceState = useSelector((state: any) => {
        return state.lens;
    });

    return lensState;
};
