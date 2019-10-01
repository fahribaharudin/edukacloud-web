import axios from "axios";
import Cookie from "js-cookie";

const Auth = {
  isAuthenticated: false,
  async authenticate(username, password) {
    const loginUrl = process.env.REACT_APP_API_URL + "/v1/oauth/token";
    const clientID = process.env.REACT_APP_API_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_API_CLIENT_SECRET;
    try {
      let res = await axios.post(loginUrl, {
        grant_type: "password",
        client_id: clientID,
        client_secret: clientSecret,
        username: username,
        password: password,
        scope: "*",
      });

      Cookie.set("access_token", res.data.access_token);
      Cookie.set("refresh_token", res.data.refresh_token);

      this.isAuthenticated = true;

      return this.isAuthenticated
    } catch (err) {
      throw err;
    }
  },
  signOut() {
    Cookie.remove("access_token");
    Cookie.remove("refresh_token");

    this.isAuthenticated = false;
  },
  checkToken() {
    const access_token = Cookie.get("access_token") ? Cookie.get("access_token") : null;
    const refresh_token = Cookie.get("refresh_token") ? Cookie.get("refresh_token") : null;

    if (access_token != null && refresh_token != null) {
      this.isAuthenticated = true;
    }
  }
};

export default Auth;