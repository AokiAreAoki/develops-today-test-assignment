import { APISuccessResponse, APIErrorResponse } from "../types/APIResponse";

const wrapAPIResponse = {
	success: <T>(data: T): APISuccessResponse<T> => ({ success: true, data }),
	error: (error: Error): APIErrorResponse => ({ success: false, error }),
};

export default wrapAPIResponse;
