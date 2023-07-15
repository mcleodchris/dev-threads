module.exports = function () {
  return {
    sha: process.env.BUILD_SHA || "local",
    date: process.env.BUILD_DATE || new Date().toISOString(),
  };
};
