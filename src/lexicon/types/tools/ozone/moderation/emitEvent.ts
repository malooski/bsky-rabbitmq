/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type HeadersMap, XRPCError } from "@atproto/xrpc";
import { ValidationResult, BlobRef } from "@atproto/lexicon";
import { isObj, hasProp } from "../../../../util";
import { lexicons } from "../../../../lexicons";
import { CID } from "multiformats/cid";
import type * as ToolsOzoneModerationDefs from "./defs";
import type * as ComAtprotoAdminDefs from "../../../com/atproto/admin/defs";
import type * as ComAtprotoRepoStrongRef from "../../../com/atproto/repo/strongRef";

export type QueryParams = {};

export interface InputSchema {
    event:
        | ToolsOzoneModerationDefs.ModEventTakedown
        | ToolsOzoneModerationDefs.ModEventAcknowledge
        | ToolsOzoneModerationDefs.ModEventEscalate
        | ToolsOzoneModerationDefs.ModEventComment
        | ToolsOzoneModerationDefs.ModEventLabel
        | ToolsOzoneModerationDefs.ModEventReport
        | ToolsOzoneModerationDefs.ModEventMute
        | ToolsOzoneModerationDefs.ModEventUnmute
        | ToolsOzoneModerationDefs.ModEventMuteReporter
        | ToolsOzoneModerationDefs.ModEventUnmuteReporter
        | ToolsOzoneModerationDefs.ModEventReverseTakedown
        | ToolsOzoneModerationDefs.ModEventResolveAppeal
        | ToolsOzoneModerationDefs.ModEventEmail
        | ToolsOzoneModerationDefs.ModEventTag
        | { $type: string; [k: string]: unknown };
    subject:
        | ComAtprotoAdminDefs.RepoRef
        | ComAtprotoRepoStrongRef.Main
        | { $type: string; [k: string]: unknown };
    subjectBlobCids?: string[];
    createdBy: string;
    [k: string]: unknown;
}

export type OutputSchema = ToolsOzoneModerationDefs.ModEventView;

export interface CallOptions {
    signal?: AbortSignal;
    headers?: HeadersMap;
    qp?: QueryParams;
    encoding?: "application/json";
}

export interface Response {
    success: boolean;
    headers: HeadersMap;
    data: OutputSchema;
}

export class SubjectHasActionError extends XRPCError {
    constructor(src: XRPCError) {
        super(src.status, src.error, src.message, src.headers, { cause: src });
    }
}

export function toKnownErr(e: any) {
    if (e instanceof XRPCError) {
        if (e.error === "SubjectHasAction") return new SubjectHasActionError(e);
    }

    return e;
}
