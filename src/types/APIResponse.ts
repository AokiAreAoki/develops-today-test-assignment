export interface APISuccessResponse<T> {
	success: true
	data: T
}

export interface APIErrorResponse {
	success: false
	error: Error
}

export type APIResponse<T> = APISuccessResponse<T> | APIErrorResponse
