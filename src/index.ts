import axios from "axios";
import { AxiosError } from "axios";

interface RRequestHandlerOption {
    url: string;
}

type RRequestResponse<Res> = RRequestSuccessResponse<Res> | RRequestErrorResponse;

interface RRequestSuccessResponse<Res>{
    status: "success";
    data: Res
}
interface RRequestErrorResponse{
    status: "error";
    statusCode: number;
    reason?: string;
}

function defineRequestHandler<Req, Res>({ url }: RRequestHandlerOption): (requestData: Req) => Promise<RRequestSuccessResponse<Res>> {
    return async (requestData: Req) => {
        try {
            const response = await axios({
                url
            })

            return response.data as RRequestSuccessResponse<Res>;
        }
        catch(err) {
            if(err instanceof AxiosError){
                
            }

            throw err;
        }
    }
}