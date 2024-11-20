/**
 * @author WMXPY
 * @namespace Common_Ongoing
 * @description Ongoing
 */

import { OngoingManager } from "./ongoing-manager";

export const executeDeduplicate = async <T>(
    identifier: string,
    execute: () => PromiseLike<T>,
): Promise<T> => {

    const ongoingManager: OngoingManager = OngoingManager.getInstance();

    try {

        return ongoingManager.execute<T>(identifier, execute);
    } catch (err) {

        console.error(err);
        throw err;
    }
};
