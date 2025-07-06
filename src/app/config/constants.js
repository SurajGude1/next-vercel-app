const nodeEnv = process.env.NODE_ENV;

export const GOLANG_API_BASE_URL =
  nodeEnv === "LOCAL"
    ? process.env.NEXT_PUBLIC_GOLANG_API_BASE_URL_LOCAL
    : process.env.NEXT_PUBLIC_GOLANG_API_BASE_URL_PROD;