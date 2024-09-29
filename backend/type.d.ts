declare namespace NodeJS {
     interface ProcessEnv {
          PORT: number;
          DB_URL: string;
          JWT_SECRET: string;
          COOKIE_NAME: string;
          COOKIE_SECRET: string;
          CLOUD_NAME: string;
          API_KEY: string;
          API_SECRET: string;
          STRIPE_SECRET: string;
          STRIPE_KEY: string;
     }
}
