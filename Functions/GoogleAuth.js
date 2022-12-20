import { google } from "googleapis";

const clientSecret = "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";
const clientId = "250276764654-8sf0mbais31hcomjktjj3uvj0b9n4phu.apps.googleusercontent.com";
const redirectUrl = "http://localhost:8080/googlesignin/token";
const scopes = ['https://www.googleapis.com/auth/youtube.readonly'];


export const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);

export const GetToken = async ()=>{
  try {
    const url = oauth2Client.generateAuthUrl({
      access_type : 'offline',
      scope : scopes
    });
    return url;
    } catch (error) {
      return error;
    }
} 

export const SetToken = async (code) =>{
  const {tokens} = await oauth2Client.getToken(code)
  oauth2Client.setCredentials(tokens);
  return;
}