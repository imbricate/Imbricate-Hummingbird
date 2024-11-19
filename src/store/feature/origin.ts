/**
 * @author WMXPY
 * @namespace Store_Feature
 * @description Origin
 */

import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { OriginStorageInstance } from "../../origin/origin-storage";

export type OriginSliceState = {

    readonly originInstance: OriginStorageInstance;
};

export type OriginSliceReducers = {

    readonly setOriginInstance: (state: OriginSliceState, action: {
        payload: OriginStorageInstance,
    }) => OriginSliceState;
};

export const originSlice = createSlice<
    OriginSliceState,
    OriginSliceReducers,
    "origin",
    any
>({
    name: "origin",
    initialState: {
        originInstance: {
            origins: [],
        },
    },
    reducers: {
        setOriginInstance: (state: OriginSliceState, action: {
            payload: OriginStorageInstance,
        }) => {
            return {
                ...state,
                originInstance: action.payload,
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
