module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "karma-typescript"],
    files: [
      {
        pattern: "test/**/*.spec.ts",
        served: true,
        watched: true,
        included: true
      },
      {
        pattern: "src/**/*.ts",
        served: true,
        watched: true,
        included: true
      },
      {
        pattern: "public/**/*.*",
        served: true,
        watched: true,
        included: true
      }
    ],
    preprocessors: {
      "**/*.ts": "karma-typescript"
    },
    reporters: ["progress", "karma-typescript"],
    browsers: ["ChromeHeadless"]
  });
};
