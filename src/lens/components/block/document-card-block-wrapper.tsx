/**
 * @author WMXPY
 * @namespace Lens_Components_Block
 * @description Document Card Block Wrapper
 */

import React, { FC } from "react";
import { useDocument } from "../../../document/hooks/use-document";
import { LensBlockDataDocumentCard } from "../../types/lens-definition";
import { LensDocumentCardBlock } from "./document-card-block";

export type LensDocumentCardBlockWrapperProps = {

    readonly block: LensBlockDataDocumentCard;
};

export const LensDocumentCardBlockWrapper: FC<LensDocumentCardBlockWrapperProps> = (
    props: LensDocumentCardBlockWrapperProps,
) => {

    const document = useDocument(
        props.block.database,
        props.block.document,
    );

    if (!document) {
        return null;
    }

    return (<LensDocumentCardBlock
        block={props.block}
        document={document}
    />);
};
