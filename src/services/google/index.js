import request from "request-promise";
import { OAuth2Client } from "google-auth-library";

export const getUser = accessToken =>
  request({
    uri: "https://www.googleapis.com/userinfo/v2/me",
    json: true,
    qs: {
      access_token: accessToken
    }
  }).then(({ id, name, email, picture }) => ({
    service: "google",
    picture,
    id,
    name,
    email
  }));

export const getUser2 = idToken => {
  const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);
  return client
    .verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_OAUTH_CLIENT_ID
    })
    .then(ticket => {
      const payload = ticket.getPayload();
      return {
        service: "google",
        picture: payload.picture,
        id: payload.sub,
        name: payload.name,
        email: payload.email
      };
    });
};
