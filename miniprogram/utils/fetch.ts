interface FetchOptions {
  baseURL: string;
}
interface FetchRequestParams {
  method:
    | "POST"
    | "GET"
    | "OPTIONS"
    | "HEAD"
    | "PUT"
    | "DELETE"
    | "TRACE"
    | "CONNECT";
  url: string;
  showLoading?: boolean;
  loadingText?: string;
  needLogin?: boolean;
  needJumpLoginPage?: boolean;
  headers?: any;
  body?: any;
  query?: any;
  timeout?: number;
}

export default class Fetch {
  options: FetchOptions;

  constructor(options: FetchOptions) {
    if (!options.baseURL) {
      throw new Error("请配置域名");
    }
    this.options = options;
  }

  async request(params: FetchRequestParams) {
    const {
      needJumpLoginPage,
      needLogin,
      showLoading = true,
      loadingText = "加载中...",
      query,
      body,
      method,
      timeout,
    } = params || {};
    if (showLoading) {
      wx.showLoading({ title: loadingText });
    }
    let url =
      params.url.indexOf("http") > -1
        ? params.url
        : this.options.baseURL + params.url;
    let queryString = "";
    if (query)
      for (let key in query) {
        const value = query[key];
        if (typeof value !== "undefined")
          queryString += `&${key}=${encodeURIComponent(query[key] || "")}`;
      }
    if (queryString)
      url += url.indexOf("?") > -1 ? queryString : "?" + queryString.slice(1);

    const header = params.headers || {};
    const auth = getApp().auth;
    let token = auth.getAuthToken();
    // 如果需要登录，且 token为空
    if (needLogin && !token) {
      try {
        // 静默登录
        token = await auth.silentLogin();
      } catch (error) {
        if (!needJumpLoginPage) {
          if (showLoading) wx.hideLoading();
          throw error;
        }
      }
      try {
        // 如果静默登录失败，且需要跳转登录页
        if (!token && needJumpLoginPage) {
          wx.navigateTo({ url: "/modules/login/pages/index/index" });
          // 监听来自登录页的登录消息
          token = await auth.listen();
        }
      } catch (error) {
        if (showLoading) wx.hideLoading();
        // 登录失败
        throw error;
      }
    }
    if (token) header["x-user-token"] = token;
    // 正常的接口请求
    return new Promise((resolve, reject) => {
      wx.request<any>({
        url,
        method: method,
        data: body,
        header,
        timeout: timeout,
        success: (res) => {
          const { data, statusCode } = res;
          if (statusCode >= 400) {
            reject(data);
            return;
          }
          resolve(data);
        },
        fail: (err) => {
          console.error(err);
          reject({
            code: "WX_REQUEST_ERR",
            message: "服务繁忙，请稍后再试",
          });
        },
        complete: () => {
          if (showLoading) wx.hideLoading();
        },
      });
    });
  }

  post(
    url: string,
    body?: any,
    options?: Omit<FetchRequestParams, "method" | "url" | "body">
  ) {
    return this.request({ ...options, method: "POST", url, body });
  }

  get(
    url: string,
    options?: Omit<FetchRequestParams, "method" | "url" | "body">
  ) {
    return this.request({ ...options, method: "GET", url });
  }
}
