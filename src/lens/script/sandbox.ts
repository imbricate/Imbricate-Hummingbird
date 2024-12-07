/**
 * @author WMXPY
 * @namespace Lens_Script
 * @description Sandbox
 */

import { Sandbox } from "@sudoo/marked";
import { markedDateMixinFactory } from "@sudoo/marked-mixin-date";
import { markedJsonMixinFactory } from "@sudoo/marked-mixin-json";
import { markedMathMixinFactory } from "@sudoo/marked-mixin-math";
import { markedObjectMixinFactory } from "@sudoo/marked-mixin-object";
import { markedParseMixinFactory } from "@sudoo/marked-mixin-parse";
import { createDatabaseSandboxPlugin } from "./database";

export const createMarkedSandbox = (): Sandbox => {

    const sandbox: Sandbox = Sandbox.fromAllEvaluators();

    sandbox.inject("print", (...content: any[]) => {
        console.log("[IMBRISCRIPT]", ...content);
    });

    sandbox.use(markedDateMixinFactory.createInjectMixin("Date"));
    sandbox.use(markedJsonMixinFactory.createInjectMixin("Json"));
    sandbox.use(markedMathMixinFactory.createInjectMixin("Math"));
    sandbox.use(markedObjectMixinFactory.createInjectMixin("Object"));
    sandbox.use(markedParseMixinFactory.createInjectMixin("Parse"));

    sandbox.use(createDatabaseSandboxPlugin());

    return sandbox;
};
