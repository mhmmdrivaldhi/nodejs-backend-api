export const ErrorResponse = (message: string | null, error: any | null) => {
    if (error != null && error instanceof Error) {
        const response = {
            message: message != null ? message : error.message,
            errors: error
        }
        return response;
    }
    const response = {
        message: message != null ? message : "Internal server error",
        errors: error
    }
    return response;
}

export const SuccessResponse = (message: string | null, data: any | null) => {
    const response = {
        message: message != null ? message : "",
        data: data != null ? data : null
    }
    return response;
}