import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

export const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION ?? "eu-north-1",
});

export const USER_POOL_ID =
  process.env.COGNITO_USER_POOL_ID ?? "eu-north-1_oV7SvOaED";
