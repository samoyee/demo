Component({
  options: {
    virtualHost: true,
  },
  properties: {
    errorType: {
      type: String,
      value: "SYSTEM_ERROR",
    },
    errorMsg: {
      type: String,
      value: "系统错误，请稍后再试",
    },
    fullPage: {
      type: Boolean,
      value: false,
    },
    showRefresh: {
      type: Boolean,
      value: false,
    },
  },
  methods: {
    refresh() {
      this.triggerEvent("refresh");
    },
  },
});

export type ErrorType =
  | "SYSTEM_ERROR"
  | "SYSTEM_REPAIR"
  | "EMPTY_DATA"
  | "AUTH_ERROR";
