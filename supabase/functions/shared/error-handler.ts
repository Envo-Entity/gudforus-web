/**
 * Centralized error handling for Supabase Edge Functions
 * Sanitizes error messages to prevent information leakage
 */

export interface ErrorResponse {
    error: string;
    message: string;
    code?: string;
    request_id?: string;
}

/**
 * Custom API Error class for structured error handling
 */
export class APIError extends Error {
    constructor(
        public statusCode: number,
        public userMessage: string,
        public errorCode?: string,
        public internalDetails?: unknown,
    ) {
        super(userMessage);
        this.name = "APIError";
    }
}

/**
 * Handle errors and return sanitized responses
 * Logs full error details internally, returns safe message to client
 */
export function handleError(
    error: Error | APIError | unknown,
    requestId?: string,
): { status: number; body: ErrorResponse } {
    // Log full error details internally (visible in function logs)
    console.error("[Error Handler] Error occurred:", {
        name: error instanceof Error ? error.name : "Unknown",
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        internalDetails: error instanceof APIError ? error.internalDetails : undefined,
        requestId,
        timestamp: new Date().toISOString(),
    });

    // Return sanitized error to client
    if (error instanceof APIError) {
        return {
            status: error.statusCode,
            body: {
                error: error.name,
                message: error.userMessage,
                code: error.errorCode,
                request_id: requestId,
            },
        };
    }

    // Generic error for unexpected issues (don't leak internal details)
    return {
        status: 500,
        body: {
            error: "Internal Server Error",
            message: "An unexpected error occurred. Please try again later.",
            request_id: requestId,
        },
    };
}

/**
 * Predefined common errors
 */
export const Errors = {
    // Authentication & Authorization
    UNAUTHORIZED: new APIError(
        401,
        "Authentication required",
        "AUTH_REQUIRED",
    ),
    FORBIDDEN: new APIError(
        403,
        "You don't have permission to access this resource",
        "FORBIDDEN",
    ),

    // Rate Limiting
    RATE_LIMITED: new APIError(
        429,
        "Too many requests. Please try again later.",
        "RATE_LIMIT_EXCEEDED",
    ),

    // Subscription
    SUBSCRIPTION_REQUIRED: new APIError(
        402,
        "Subscription required to access this feature",
        "SUBSCRIPTION_REQUIRED",
    ),

    // Validation
    INVALID_INPUT: (field: string) =>
        new APIError(400, `Invalid ${field}`, "INVALID_INPUT"),
    MISSING_FIELD: (field: string) =>
        new APIError(400, `Missing required field: ${field}`, "MISSING_FIELD"),

    // Resources
    NOT_FOUND: (resource: string) =>
        new APIError(404, `${resource} not found`, "NOT_FOUND"),
    ALREADY_EXISTS: (resource: string) =>
        new APIError(409, `${resource} already exists`, "ALREADY_EXISTS"),

    // Processing
    PROCESSING_FAILED: (reason?: string) =>
        new APIError(
            500,
            reason || "Processing failed. Please try again.",
            "PROCESSING_FAILED",
        ),
};

/**
 * Generate a unique request ID for tracking
 */
export function generateRequestId(): string {
    return crypto.randomUUID();
}
