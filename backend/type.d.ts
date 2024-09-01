declare namespace NodeJS {
     interface ProcessEnv {
          PORT: number;
          DB_URL: string;
          JWT_SECRET: string;
          COOKIE_NAME: string;
          COOKIE_SECRET: string;
     }
}
