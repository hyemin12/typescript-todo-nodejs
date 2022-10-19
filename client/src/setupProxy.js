//2021년 7월 14일 기준 Typescript template CRA는 http-proxy-middleware을 지원하지 않음
// js파일로 작성하면 됨

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
