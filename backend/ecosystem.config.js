require("dotenv").config();

const config = {
  apps: [
    {
      name: "bazaar-insights-api",
      script: "./dist/index.js",
      max_memory_restart: "300M",
      autorestart: true,
    },
  ],
};

module.exports = config;
