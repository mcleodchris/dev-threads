const { ThreadsAPI } = require("threads-api");
const developers = require("../developers.json");

async function getProfileData(threadsAPI, developer) {
  const userId = await threadsAPI.getUserIDfromUsername(developer.userame);
  if (!userId) {
    return;
  }
  const user = await threadsAPI.getUserProfile(userId);
  return { ...user, topics: developer.topics };
}

module.exports = async function () {
  const threadsAPI = new ThreadsAPI();
  const profileData = await Promise.all(
    developers.map((developer) => getProfileData(threadsAPI, developer))
  );

  return profileData;
};
