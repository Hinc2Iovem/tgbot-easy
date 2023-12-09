const TelegramApi = require("node-telegram-bot-api");

const token = "6741390764:AAGx855xO--eIc5HwogUy6FN5fHQC0XVYto";

const bot = new TelegramApi(token, { polling: true });

const chats = {};

bot.setMyCommands([
  { command: "/start", description: "Start App" },
  { command: "/info", description: "Check Info About Yourself" },
  { command: "/game", description: "Guessing a Number" },
]);

const startGame = async (chatId) => {
  await bot.sendMessage(
    chatId,
    "I'm thinking about a certain number, try to guess it."
  );
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  console.log(randomNumber);
  await bot.sendMessage(chatId, "Guesssss", gameOptions);
};

const start = () => {
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const first_name = msg.chat.first_name;
    const username = msg.chat.username;
    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        "https://tlgrm.eu/_/stickers/8a7/1d8/8a71d866-9c8e-3b81-89c0-a4d7f24459cb/1.webp"
      );
      return bot.sendMessage(chatId, `Hello ${first_name}`);
    }
    if (text === "/info") {
      return bot.sendMessage(
        chatId,
        `Your name is ${first_name}, your username is ${username}`
      );
    }
    if (text === "/game") {
      return startGame(chatId);
    }
    return bot.sendMessage(chatId, "No such command");
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === "/again") {
      return startGame(chatId);
    }
    if (data === chats[chatId]) {
      return bot.sendMessage(
        chatId,
        "It's Your Day Today, You Win!!!!",
        againOptions
      );
    } else {
      return bot.sendMessage(
        chatId,
        `You Lose, ${chats[chatId]}`,
        againOptions
      );
    }
  });
};

start();
