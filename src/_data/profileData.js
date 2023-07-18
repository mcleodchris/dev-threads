const { ThreadsAPI } = require("threads-api");
const Bottleneck = require("bottleneck");
const developers = require("../developers.json");

async function getProfileData(threadsAPI, developer) {
  const userId = await threadsAPI.getUserIDfromUsername(developer.username);
  if (!userId) {
    return;
  }
  const user = await threadsAPI.getUserProfile(userId);
  return { ...user, topics: developer.topics };
}

module.exports = async function () {
  const threadsAPI = new ThreadsAPI({
    username: process.env.THREADSUSER, // Your username
    password: process.env.THREADSPWD, // Your password
  });

  await threadsAPI.login();

  const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 2500,
  });
  // const profileData = await Promise.all(
  //   developers.map((developer) =>
  //     limiter.schedule(() => getProfileData(threadsAPI, developer))
  //   )
  // );
  const profileData = [];

  for (const developer of developers) {
    const data = await limiter.schedule(() =>
      getProfileData(threadsAPI, developer)
    );
    if (data) {
      profileData.push(data);
    }
  }

  return profileData;
};
