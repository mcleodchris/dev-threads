const Image = require("@11ty/eleventy-img");

module.exports = async function (url, alt, widths, sizes = "", cls = "") {
  // widths must be an array
  widths = widths.split(",");

  // if widths.length > 1, then we need a sizes string
  if (widths.length > 1 && sizes.length === 0) {
    widths = [widths[0]];
  }

  const metadata = await Image(url, {
    widths,
    formats: ["avif", "jpeg"],
    urlPath: "/img-cache/",
    outputDir: "./_site/img-cache/",
    useCache: true,
    sharpJpegOptions: {
      quality: 85,
    },
  });

  const imageAttributes = {
    sizes,
    class: cls,
    alt,
    loading: "lazy",
  };

  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline",
  });
};
