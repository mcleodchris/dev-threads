const { ThreadsAPI } = require("threads-api");
const Bottleneck = require("bottleneck");
const FETCH = require("@11ty/eleventy-fetch");
const developers = require("../developers.json");
const { profile } = require("console");

async function getProfileData(threadsAPI, developer) {
  const userId = await threadsAPI.getUserIDfromUsername(developer.username);
  if (!userId) {
    return;
  }
  const user = await threadsAPI.getUserProfile(userId);
  return { ...user, topics: developer.topics };
}

module.exports = async function () {
  const threadsAPI = new ThreadsAPI();

  const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 500,
  });

  // const profileData = await Promise.all(
  //   developers.map((developer) =>
  //     limiter.schedule(() => getProfileData(threadsAPI, developer))
  //   )
  // );

  // hope to remove this "slow mode" soon
  const profileData = [];

  try {
    for (const developer of developers) {
      const data = await limiter.schedule(() =>
        getProfileData(threadsAPI, developer)
      );
      if (data) {
        profileData.push(data);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
  // This is a hacky workaround.
  if (profileData.length === 0) {
    console.log(
      "No data from Threads API. Attempting to get searchdata.json from live site."
    );
    // Something has gone wrong, so to try prevent a broken site,
    // fetch the last known good data from the live site:
    const data = await FETCH("https://dev-threads.directory/searchdata.json", {
      duration: "1d",
      type: "json",
    });

    if (data) {
      return data;
    }
  }

  return profileData;
};
