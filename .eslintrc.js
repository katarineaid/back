module.exports = {
  extends: ["airbnb-base", "prettier"],
  overrides: [
    {
      files: [
        "__tests__/**/*.js",
        "test.js",
        "**/test.js",
        "**/**/test.js",
        "**/**/**/test.js"
      ]
    }
  ],
  env: {
    node: true,
    mocha: true
  }
};
