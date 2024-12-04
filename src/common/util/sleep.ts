/**
 * @author WMXPY
 * @namespace Common_Util
 * @description Sleep
 */

export const asyncSleep = (time: number): Promise<void> => {

    return new Promise((resolve: () => void) => {
        setTimeout(resolve, time);
    });
};
