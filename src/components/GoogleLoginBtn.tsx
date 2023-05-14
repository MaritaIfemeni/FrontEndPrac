import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import React from "react";

const GoogleLoginBtn = () => {
  return (
    <GoogleOAuthProvider  clientId="1">
  <GoogleLogin
    onSuccess={(credentialResponse) => {
      console.log(credentialResponse);
    }}
    onError={() => {
      console.log("Login Failed");
    }}
  />
  </GoogleOAuthProvider>
  )
}

export default GoogleLoginBtn;
