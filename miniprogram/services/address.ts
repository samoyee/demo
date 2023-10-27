export interface AddressData {
  id: string;
  name: string;
  leaf: boolean;
  children?: AddressData[];
}

export interface GetAddressParams {
  ids?: string;
  id?: string;
}

export type GetAddressResponse = Array<AddressData>;

export function getAddress(
  params?: GetAddressParams
): Promise<GetAddressResponse> {
  return getApp().fetch.get("/address", {
    query: params,
  });
}
