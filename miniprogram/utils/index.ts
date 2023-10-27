export function rpxToPx(rpx: number) {
  const windowInfo = wx.getWindowInfo();
  return (rpx / 750) * windowInfo.windowWidth + "px";
}

export function pxToRpx(px: number) {
  const windowInfo = wx.getWindowInfo();
  return (px * 750) / windowInfo.windowWidth + "rpx";
}

export function getNavBarHeight(titleHeightRpx = 80) {
  const windowInfo = wx.getWindowInfo();
  return parseFloat(rpxToPx(titleHeightRpx)) + windowInfo.statusBarHeight;
}
