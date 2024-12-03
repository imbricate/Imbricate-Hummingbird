/**
 * @author WMXPY
 * @namespace Store
 * @description Store
 */

import { configureStore } from "@reduxjs/toolkit";
import { originSlice } from "./feature/origin";
import { LensSlice } from "./feature/lens";

export const applicationStore = configureStore({
    reducer: {
        origin: originSlice.reducer,
        lens: LensSlice.reducer,
    },
});
