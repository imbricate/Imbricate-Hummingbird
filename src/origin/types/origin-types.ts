/**
 * @author WMXPY
 * @namespace Origin_Types
 * @description Origin Types
 */

export enum ORIGIN_TYPE {

    STACK_API = "STACK_API",
}

export const originTypeMap: Record<ORIGIN_TYPE, string> = {

    [ORIGIN_TYPE.STACK_API]: "@imbricate/origin-stack-api",
};
