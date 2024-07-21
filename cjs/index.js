"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineRequestHandler = void 0;
const axios_1 = __importDefault(require("axios"));
const axios_2 = require("axios");
function defineRequestHandler({ url, method }) {
    return async (requestData) => {
        try {
            const response = await (0, axios_1.default)({
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
            if (err instanceof axios_2.AxiosError) {
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
exports.defineRequestHandler = defineRequestHandler;
//# sourceMappingURL=index.js.map