import dayjs from "dayjs";

export interface GetExchangeRequest {
  status: string;
  searchKey?: string;
  pageNo: number;
}

export interface Exchange {
  expiryTime: string;
  id: number;
  name: string;
  searchKey: string;
  shopInfo: string;
  shopInfoId: number;
  status: string;
  userId: number;
}

export interface GetExchangeListResponse {
  hasMore: boolean;
  list: Exchange[];
}

export function getExchangeList(
  params: GetExchangeRequest
): Promise<GetExchangeListResponse> {
  return getApp().fetch.post(
    "/point/exchange.item.list",
    {
      status: params.status,
      searchKey: params.searchKey,
    },
    {
      query: {
        pageNo: params.pageNo,
        pageSize: 10,
      },
    }
  );
}

export interface ExchangeResponse {
  message: string;
  code: "SUCCESS" | "FAIL";
}

export function exchange(id: string): Promise<ExchangeResponse> {
  return getApp().fetch.post("/point/exchange.submit", {
    shopInfoId: id,
    status: 1,
  });
}

export interface GetSigninPointCalendarResponse {
  [key: string]: true;
}

export function getSigninPointCalendar(): Promise<GetSigninPointCalendarResponse> {
  return getApp().fetch.get("/point/signin.list", {
    needLogin: true,
    needJumpLoginPage: true,
  });
}

export interface SigninPointTodayResponse {}

export function signinPointToday(): Promise<SigninPointTodayResponse> {
  return getApp().fetch.post("/point/signin.submit", {
    date: dayjs().format("YYYY-MM-DD"),
  });
}

export interface ListPointGoodsRequest {
  searchKey?: string;
  pageNo: number;
}

export interface Goods {
  expiryDate: number;
  id: number;
  name: string;
  path: string;
  score: number;
  searchKey: string;
}

export interface ListPointGoodsResponse {
  list: Goods[];
  hasMore: boolean;
}

export function listPointGoods(
  params: ListPointGoodsRequest
): Promise<ListPointGoodsResponse> {
  return getApp().fetch.post(
    "/point/shop.item.list",
    {
      searchKey: params.searchKey,
    },
    {
      query: {
        pageNo: params.pageNo,
        pageSize: 10,
      },
    }
  );
}

export interface GetGoodsResponse extends Goods {}

export function getGoodsDetail(id: string): Promise<GetGoodsResponse> {
  return getApp().fetch.get("/point/shop.item.detail", {
    query: {
      id,
    },
  });
}
