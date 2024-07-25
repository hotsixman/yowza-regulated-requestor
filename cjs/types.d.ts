export type RRequestHandler<Req extends RRequestData, Res> = (requestData: Req) => Promise<RResponse<Res>>;
export interface RRequestHandlerOption<Req extends RRequestData> {
    url: string;
    method: Req extends null ? string : "post" | "put" | "delete";
}
export type RRequestData = RRequestJSON | FormData | string | null;
export type RRequestJSON = object;
export type RResponse<Res> = RSuccessResponse<Res> | RErrorResponse;
export interface RSuccessResponse<Res> {
    status: "success";
    data: Res;
}
export interface RErrorResponse {
    status: "error";
    statusCode: number | null;
    reason?: string;
}
//# sourceMappingURL=types.d.ts.map