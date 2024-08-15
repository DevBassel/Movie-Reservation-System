export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // APP
      PORT: number;
      JWT_KEY: string;
      NODE_ENV: 'test' | 'dev' | 'prod';
      // DB
      DB_NAME: string;
      DB_HOST: string;
      DB_PORT: number;
      DB_USERNAME: string;
      DB_PASSWORD: string;
    }
  }
}
