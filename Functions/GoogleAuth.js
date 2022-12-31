import { config } from "dotenv";
config();

export const clientSecret = process.env.CLIENTSECRET;
export const clientId = process.env.CLIENTID
export const redirectUrl = process.env.REDIRECTURL
export const scopes = ['https://www.googleapis.com/auth/youtube','https://www.googleapis.com/auth/youtube.force-ssl','profile'];
export const yt_api = process.env.YT_API
export const secret = process.env.SECRET
