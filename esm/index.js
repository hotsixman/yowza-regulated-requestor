import axios from "axios";
import { AxiosError } from "axios";
export function defineRequestHandler({ url, method }) {
    return async (requestData) => {
        try {
            const response = await axios({
                url,
                method,
                data: requestData
            });
            const responseData = {
                status: "success",
                data: response.data
            };
            return responseData;
        }
        catch (err) {
            if (err instanceof AxiosError) {
                if (err.status) {
                    const error = {
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
    };
}
//# sourceMappingURL=index.js.map