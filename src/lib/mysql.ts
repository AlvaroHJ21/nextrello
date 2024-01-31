import { env } from 'process';
import mysql from 'serverless-mysql';

export const db = mysql({
  config: {
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    database: env.DB_DATABASE,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

// export default async function excuteQuery({ query, values }) {
//   try {

//     const results = await db.query(query, values);

//     await db.end();

//     return results;

//   } catch (error) {
//     return { error };
//   }
// }
