import * as log4js from "log4js";

log4js.configure({
  appenders: {
    app: { type: "file", filename: "multiple-alerts.log" },
    console: { type: "console"},
  },
  categories: {
    default: { appenders: ["app"], level: "INFO" },
    multipleDiscordAlerts: {appenders: ["app", "console"], level: "INFO"}
  },
});

const logger = log4js.getLogger("multipleDiscordAlerts");

export default logger;