declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    MONGODB_URI: string;
    JWT_SECRET: string;
    OPENAI_API_KEY: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
