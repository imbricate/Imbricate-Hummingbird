/**
 * @author WMXPY
 * @namespace Lens_Hooks
 * @description Use Lenses
 */

import { useLensSlice } from "../../store/feature/lens";
import { LensConfig } from "../types/lens-config";

export const useLensConfig = (): LensConfig => {

    const lensState = useLensSlice();

    return lensState.lensConfig;
};
