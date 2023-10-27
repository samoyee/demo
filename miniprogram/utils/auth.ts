import Fetch from "./fetch";

interface AuthOptions {
  tokenKey?: string;
  fetch: Fetch;
}

interface LoginParams {
  code?: string;
  cloudID: string;
  encryptedData: string;
  iv: string;
}

function wxCheckSession() {
  return new Promise((resolve) => {
    wx.checkSession({
      success: (res) => {
        if (res.errMsg === "checkSession:ok") {
          resolve(true);
          return;
        }
        resolve(false);
      },
      fail: () => {
        resolve(false);
      },
    });
  });
}

function wxLogin(fetch: Fetch) {
  return new Promise<any>((resolve, reject) => {
    wx.login({
      success(res) {
        if (res.code) {
          fetch
            .post("/auth/silentLogin", { code: res.code })
            .then((data: any) => {
              resolve(data);
            })
            .catch((error: any) => {
              reject(error);
            });
        } else {
          reject(res);
        }
      },
      fail(error) {
        reject(error);
      },
    });
  });
}

export default class Auth {
  tokenKey: string;
  fetch: Fetch;
  params?: LoginParams;

  constructor(options: AuthOptions) {
    this.tokenKey = options.tokenKey || "__USER_SESSION__";
    this.fetch = options.fetch;
  }

  getAuthToken() {
    const token = wx.getStorageSync(this.tokenKey);
    return token;
  }

  async login(params: LoginParams) {
    const hasSession = await wxCheckSession();
    let authToken = this.getAuthToken();
    if (authToken && hasSession) return authToken;
    try {
      authToken = await this.silentLogin();
      return authToken;
    } catch (error) {
      const { code, openId } = error || {};
      if (code === "NO_BIND_WECHAT") {
        try {
          const token = await this.fetch.post(
            "/auth/login",
            {
              ...params,
            },
            {
              showLoading: true,
              headers: {
                "X-SessionKey": openId,
              },
            }
          );
          wx.setStorageSync(this.tokenKey, token);
          this.trigger(token, null);
          return token;
        } catch (error) {
          console.log(error);
          //   await this.reLogin(params);
          this.trigger(null, error);
          return;
        }
      }
      throw new Error(error.message);
    }
  }

  async silentLogin() {
    const token = await wxLogin(this.fetch);
    wx.setStorageSync(this.tokenKey, token);
    return token;
  }

  async reLogin(params: LoginParams) {
    try {
      await this.silentLogin();
    } catch (error) {
      const { code, openId } = error || {};
      if (code === "NO_BIND_WECHAT") {
        try {
          const data = await this.fetch.post(
            "/auth/login",
            {
              ...params,
            },
            {
              showLoading: true,
              headers: {
                "X-SessionKey": openId,
              },
            }
          );
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  async logout() {
    try {
      await this.fetch.post("/auth/logout");
      wx.removeStorageSync(this.tokenKey);
    } catch (error) {}
  }

  listeners: Function[] = [];

  trigger(token: any, error: any) {
    this.listeners.forEach((item) => {
      if (item && typeof item === "function") {
        item(token, error);
      }
    });
  }

  listen() {
    return new Promise((resolve, reject) => {
      const callback = (token: any, error: any) => {
        if (error) reject(error);
        else resolve(token);
        const index = this.listeners.indexOf(callback);
        if (index > -1) this.listeners.splice(index, 1);
      };
      this.listeners.push(callback);
    });
  }
}
