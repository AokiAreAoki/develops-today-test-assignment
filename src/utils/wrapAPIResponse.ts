import { APIResponse } from "../types/APIResponse";

export default function wrapAPIResponse<T>(
	response: T,
	isError = false,
): APIResponse<T> {
	return isError
		? { success: false, error: response }
		: { success: true, data: response };
}
