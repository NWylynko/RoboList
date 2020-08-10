module.exports = {
  apps : [{
    name: "RoboListServer",
    script: "./server/build/index.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }, {
    name: "RoboListWebApp",
    script: "serve",
    env: {
      PM2_SERVE_PATH: './client/build',
      PM2_SERVE_PORT: 80,
      PM2_SERVE_SPA: 'true',
      PM2_SERVE_HOMEPAGE: 'index.html'
    }
  }]
}