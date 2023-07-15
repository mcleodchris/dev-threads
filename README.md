# :thread: Dev-Threads

## What is it?

Dev-Threads is a directory of software engineering and related accounts found on the Threads social network - developers, engineers, tools, newsletters, etc. All accounts have submitted themselves for inclusion. Profile data is pulled from Threads using [the unofficial API client](https://github.com/junhoyeo/threads-api) by [Junho Yeo](https://junho.io/).

## How to add yourself to the directory?

:one: First, fork this repository using the button near the top of the repository homepage.

:two: Secondly, add an entry with your username to the array in `./src/developers.json`, along with an optional array of a few topics which describe what you post about on Threads.

The format is a regular JavaScript object in an array. Don't forget to add the comma after the preceding entry!
The updated file should look something like this:

```JSON
[
  {
    "userame": "mstrkapowski",
    "topics": [
      "general",
      "azure",
      "learning & development",
      "warhammer",
      "life"
    ]
  },
  // snip .....
  {
    "userame": "yournamehere",
    "topics": [
      "ai",
      "machine learning",
      "boba tea",
      "photography"
    ]
  }
]

```

:three: Finally, Submit a Pull Request back to this repository.

At busy/holiday times it might take a while to review and approve the PR, but all will be looked at. While it should be rare, the admin reserves the right to reject a submission for any reason.

:no_pedestrians: If you want to remove your profile from the directory, please submit a new PR with your data removed from `./src/developers.json`.

## Credits

Dev-Threads is originally based on the [winty](https://github.com/distantcam/windty/) [11ty](https://www.11ty.dev/) starter project.

The idea is based on [PersonalSit.es](https://personalsit.es/).

Profile data is pulled from Threads using [the unofficial API client](https://github.com/junhoyeo/threads-api) by [Junho Yeo](https://junho.io/).
