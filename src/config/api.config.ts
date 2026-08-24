class ApiConfig {
  baseURL =
    process.env.NODE_ENV === 'development'
      ? '/_backend'
      : 'https://gateway.elysiac.fun/';
}

export const apiConfig = new ApiConfig();
