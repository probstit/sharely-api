import { registerTable } from "exceptional.js";

export function initErrors() {
  registerTable({
    namespace: "default",
    locale: "en",
    errors: {
      0: "Oops, something went wrong on our end",
      1: "Unkown API version {apiVersion}",
    },
  });
}
