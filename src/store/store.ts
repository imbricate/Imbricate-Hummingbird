/**
 * @author WMXPY
 * @namespace Store
 * @description Store
 */

import { configureStore } from "@reduxjs/toolkit";
import { originSlice } from "./feature/origin";

export const applicationStore = configureStore({
    reducer: {
        origin: originSlice.reducer,
    },
});
