/**
 * @author WMXPY
 * @namespace Document_Utils
 * @description Parse Date
 */

import { getLocalTimeZone, parseDate } from "@internationalized/date";
import { DateValue } from "@nextui-org/react";

export const dateToUIDate = (date: Date): DateValue => {

    const paddedYear: string = date.getFullYear().toString().padStart(4, "0");
    const paddedMonth: string = (date.getMonth() + 1).toString().padStart(2, "0");
    const paddedDate: string = date.getDate().toString().padStart(2, "0");

    const ISOString = `${paddedYear}-${paddedMonth}-${paddedDate}`;

    return parseDate(ISOString);
};

export const UIDateToDate = (date: DateValue): Date => {

    return date.toDate(getLocalTimeZone());
};
