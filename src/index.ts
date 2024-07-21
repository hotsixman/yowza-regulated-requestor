import axios from "axios";
import { AxiosError } from "axios";
import { RRequestHandlerOption, RErrorResponse, RRequestData, RSuccessResponse, RRequestHandler } from "./types";

export function defineRequestHandler<Req extends RRequestData, Res>({ url, method }: RRequestHandlerOption<Req>): RRequestHandler<Req, Res> {
    return async (requestData: Req) => {
        try {
            const response = await axios({
                url,
                method,
                data: requestData
            })

            const responseData: RSuccessResponse<Res> = {
                status: "success",
                data: response.data
            }

            return responseData;
        }
        catch (err) {
            if (err instanceof AxiosError) {
                if (err.status) {
                    const error: RErrorResponse = {
                        status: "error",
                        statusCode: err.status,
                        reason: err.response?.data?.reason
                    };
                    return error;
                }
                return {
                    status: "error",
                    statusCode: null
                };
            }
            throw err;
        }
    }
}