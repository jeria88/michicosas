import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL || "redis://:ocJ93Qfmtgj76Hgjo8IaO832mMCGQQVn47jOmbS5u38n6fImuTo4Pt6DeUJlVB7W@q10ac16ubixriqizxg39govp:6379",
    http: {
      storeCors: process.env.STORE_CORS || "http://michicosas.146.181.39.4.sslip.io",
      adminCors: process.env.ADMIN_CORS || "http://michicosas-backend.146.181.39.4.sslip.io",
      authCors: process.env.AUTH_CORS || "http://michicosas-backend.146.181.39.4.sslip.io",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  }
})
