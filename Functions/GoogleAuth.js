import { config } from "dotenv";
config();

export const clientSecret = process.env.CLIENTSECRET;
export const clientId = process.env.CLIENTID
export const redirectUrl = process.env.REDIRECTURL
export const scopes = ['https://www.googleapis.com/auth/youtube','profile'];
export const yt_api = process.env.YT_API

