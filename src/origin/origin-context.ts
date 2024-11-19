/**
 * @author WMXPY
 * @namespace Origin
 * @description Origin Context
 */

import React from "react";
import { OriginStorageInstance } from "./origin-storage";

export const OriginContext = React.createContext<OriginStorageInstance | null>(null);
