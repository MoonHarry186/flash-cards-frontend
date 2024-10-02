import React, { useContext } from "react";
import Layout from "../layout/Layout";
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { client } from "../client";
import { GlobalContext } from "../context/GlobalState";

const Login = () => {
  const navigate = useNavigate()
  const {login} = useContext(GlobalContext)

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const user = jwtDecode(credentialResponse.credential);
            const doc = {
              _id: user.sub,
              _type: "user",
              name: user.name,
              avatar: user.picture,
              email: user.email,
            };
            client.createIfNotExists(doc).then(() => {
              navigate("/", { replace: true });
            });
            login(true)
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </Layout>
  );
};

export default Login;
