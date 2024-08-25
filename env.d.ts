export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // APP
      PORT: number;
      JWT_KEY: string;
      NODE_ENV: 'test' | 'dev' | 'prod';
      HOST: string;
      // DB
      DB_NAME: string;
      DB_HOST: string;
      DB_PORT: number;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      // payment
      STRIPE_SK: string;
      STRIPE_PK: string;
      STRIPE_WEBHOOK_SK: string;
      // email smtp
      EMAIL_USER: string;
      EMAIL_SK: string;
    }
  }
}
