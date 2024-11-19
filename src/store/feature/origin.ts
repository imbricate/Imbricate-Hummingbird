/**
 * @author WMXPY
 * @namespace Store_Feature
 * @description Origin
 */

import { IImbricateOrigin } from "@imbricate/core";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export type OriginSliceState = {

    readonly origins: IImbricateOrigin[];
};

export type OriginSliceReducers = {

    readonly setOrigins: (state: OriginSliceState, action: { payload: IImbricateOrigin[] }) => OriginSliceState;
};

export const originSlice = createSlice<
    OriginSliceState,
    OriginSliceReducers,
    "origin",
    any
>({
    name: "origin",
    initialState: {
        origins: [],
    },
    reducers: {
        setOrigins: (state: OriginSliceState, action: { payload: IImbricateOrigin[] }) => {
            return {
                ...state,
                origins: action.payload,
            };
        },
    },
});

export const useOriginSlice = (): OriginSliceState => {

    const originState: OriginSliceState = useSelector((state: any) => {
        return state.origin;
    });

    return originState;
};
