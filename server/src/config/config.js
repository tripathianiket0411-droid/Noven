import dotenv from 'dotenv'
dotenv.config()

const config = {
    PORT : process.env.PORT,
    MONGO_URL: process.env.MONGO_URI,
    ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET,
    IMAGEKIT_PRIVATE_KEY:process.env.IMAGEKIT_PRIVATE_KEY,
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL:process.env.GOOGLE_CALLBACK_URL

}

export default config;