import type { UserManagerSettings } from "oidc-client-ts";

export const authConfig : UserManagerSettings= {
  authority: 'https://pnb-auth-stage.isupay.in/application/o/pnb/',
  client_id: 'SaDG8kozoNOUC07Uv46et8',
  redirect_uri: 'http://localhost:3000/redirected',
  post_logout_redirect_uri: 'http://localhost:3000/login',
  scope: "path openid profile email offline_access authorities privileges user_name created adminName bankCode goauthentik.io/api"
};