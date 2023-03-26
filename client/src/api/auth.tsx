import axios from "axios";

const REST_API_URL = "https://lqdon.com";

interface IRegister {
  email?: string;
  username?: string;
  password1: string;
  password2: string;
}

export const onRegister = async (body: IRegister) => {
    const res = await axios.post(
      `${REST_API_URL}/api-auth/v1/registration/`,
      body
    );
    return res.data;
};


interface IVerifyEmail {
  key: string;
}

export const onVerifyEmail = async (body: IVerifyEmail) => {
    const res = await axios.post(
      `${REST_API_URL}/api-auth/v1/registration/verify-email/`,
      body
    );
    return res.data;
};

interface IResendVerify {
  email: string;
}

export const onResendVerify = async (body: IResendVerify) => {
    const res = await axios.post(
      `${REST_API_URL}/api-auth/v1/registration/resend-email/`,
      body
    );
    return res.data;
};

interface ILogin {
  email: string;
  password: string;
}

export const onLogin = async (body: ILogin) => {
    const res = await axios.post(
      `${REST_API_URL}/api-auth/v1/login/`,
      body
    );
    return res.data;
};

interface IResetPassword {
  email: string;
}

export const onResetPassword = async (body: IResetPassword) => {
    const res  = await axios.post(
      `${REST_API_URL}/api-auth/v1/password/reset/`,
      body
    );
    return res.data;
};

interface IResetPasswordConfirm {
  uid: string;
  token: string;
  new_password1: string;
  new_password2: string;
}

export const onResetPasswordConfirm = async (body: IResetPasswordConfirm) => {
    const res  = await axios.post(
      `${REST_API_URL}/api-auth/v1/password/reset/confirm/`,
      body
    );
    return res.data;
  
};

interface IResetPasswordChange {
  new_password1: string;
  new_password2: string;
  old_password: string;
}

export const onResetPasswordChange = async (body: IResetPasswordChange) => {
    const res  = await axios.post(
      `${REST_API_URL}/api-auth/v1/password/change/`,
      body
    );
    return res.data;
};


interface IReFreshToken {
  refresh: string;
}

export const onReFreshToken = async (body: IReFreshToken) => {
    const res  = await axios.post(
      `${REST_API_URL}/api-auth/v1/token/refresh/`,
      body
    );
    return res.data;
};

interface IVerifyToken {
  token: string;
}

export const onVerifyToken = async (body: IVerifyToken) => {
    const res  = await axios.post(
      `${REST_API_URL}/api-auth/v1/token/verify/`,
      body
    );
    return res.data;
};


// export const onUserDetail = async () => {
//   
//     const { res } = await axios.get(`${REST_API_URL}/api-auth/v1/user/`, body);
//     return res.data;
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const onGetMe = async (body) => {
//   
//     const { res } = await axios.get(`${REST_API_URL}/api/v1/me/`, body);
//     return res.data;
//   } catch (err) {
//     console.error(err);
//   }
// };

interface IRegisterMetamask {
  user: {
    email?: string;
    username?: string;
  }
  public_address: string;
}

export const onRegisterMetamask = async (body: IRegisterMetamask) => {
  const res  = await axios.post(
    `${REST_API_URL}/api-auth/v1/metamask/registration/`,
    body
  );
  return res.data;
};

interface IGetNonce {
  public_address: string;
}

export const onGetNonce = async (body: IGetNonce) => {
  const { public_address } = body;
  const res = await axios.get(
    `${REST_API_URL}/api-auth/v1/metamask/registration/${public_address}`
  );
  return res.data;
};

interface ILoginMetamask {
  signature: string;
}

export const onLoginMetamask = async (body: ILoginMetamask) => {
  const res  = await axios.post(
    `${REST_API_URL}/api-auth/v1/metamask/login/${body.signature}}`,
    body
  );
  return res.data;
};

interface IRegisterOauth {
  code: string;
}

export const onDiscord = async (body: IRegisterOauth) => {
  const res  = await axios.post(
    `${REST_API_URL}/api-auth/v1/discord/`,
    body
  );
  return res.data;
};



export const onGithub = async (body: IRegisterOauth) => {
  const res  = await axios.post(
    `${REST_API_URL}/api-auth/v1/github/`,
    body
  );
  return res.data;
};

// export const onSignMessage = async (body) => {
//   
//     const res  = await axios.post(
//       `${REST_API_URL}/api/v1/sign-message/`,
//       body
//     );
//     return res.data;
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const onNewRequest = async (body) => {
//   
//     const res  = await axios.post(
//       `${REST_API_URL}/api-auth/v1/registration/manufacturer/`,
//       body
//     );
//     return res.data;
//   } catch (err) {
//     console.error(err);
//   }
// };
