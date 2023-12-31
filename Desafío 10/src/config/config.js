import dotenv from 'dotenv';

dotenv.config({path:'./.env', override:true})

export const config={
    PORT:process.env.PORT||3000,
    MONGO_URL:process.env.MONGO_URL+process.env.DB_NAME,
    DB_NAME:process.env.DB_NAME
}