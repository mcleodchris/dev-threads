const fs = require("fs");
const htmlmin = require("html-minifier");
const img = require("./shortcodes/img.js");
const { EleventyRenderPlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  eleventyConfig.addShortcode("img", img);

  eleventyConfig.addPlugin(EleventyRenderPlugin);

  eleventyConfig.addShortcode("replace", (value, search, replacement) =>
    value.replaceAll(search, replacement)
  );
  eleventyConfig.addShortcode("jsonify", (value) =>
    JSON.stringify(value, null, 2)
  );

  if (process.env.ELEVENTY_PRODUCTION) {
    eleventyConfig.addTransform("htmlmin", htmlminTransform);
  }

  // Passthrough
  eleventyConfig.addPassthroughCopy({ "src/static": "." });

  // Watch targets
  eleventyConfig.addWatchTarget("./src/styles/");

  let pathPrefix = "";
  // if (process.env.GITHUB_REPOSITORY) {
  //   pathPrefix = process.env.GITHUB_REPOSITORY.split("/")[1];
  // }

  return {
    dir: {
      input: "src",
    },
    pathPrefix,
  };
};

function htmlminTransform(content, outputPath) {
  if (outputPath.endsWith(".html")) {
    let minified = htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
    });
    return minified;
  }
  return content;
}
