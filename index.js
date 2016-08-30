// We import the package that we installed earlier
const SlackBot = require('slackbots');


const bot = new SlackBot({
  token: process.env.SLACK_TOKEN,
  // Replace <BOT_NAME> with the name from step E
  name: 'kaptenkrok'
});

// Everything above this line from before will be the same
bot.on('start', () => {
  // We will now make the bot post a message to a specific user on startup
  // Replace <USERNAME> with your username
  bot.postMessageToUser(
    // The user we want to send a message to
    'anjo',
    // The message to send
    'I am online!'
  );
});

const { random } = require('@antjoh/compliments');

// The current compliment
let currentCompliment = 0;

bot.on('message', function(data) {
  // We define a RegExp pattern the bot is looking for
  // In this case it is looking for messages of the form "[Cc]omplement @username"
  // The [Cc] means that we accept the message to start with either a large C or a small c.
  const pattern = /[Cc]ompliment <@(\w+)>/
  if (data.text && data.text.match(pattern)) {
    // If the message matches the pattern, the user ID is extracted from the message
    const user = data.text.match(pattern)[1];

    if (user) {
      // The bot gets the user name from the user ID, and attempts to send the user a random complement
		bot.getUserById(user).then(({ name }) => {
  			bot.postMessageToUser(name, random());
		});
    }
  }
});
