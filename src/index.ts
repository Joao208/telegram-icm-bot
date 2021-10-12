import "dotenv/config";
process.env.NTBA_FIX_319 = "1";
import TelegramBot from "node-telegram-bot-api";
import logger from "js-logger";
import { v4 } from "uuid";
import { calc, formatResponse, isEqual } from "./utils";
import { messages } from "./constants";

logger.useDefaults();

const token = process.env.TELEGRAM_TOKEN;

// @ts-ignore
const bot = new TelegramBot(token, { polling: true });

bot.on("inline_query", ({ query, id }: { query: string; id: string }) => {
  const [height, weight] = query.split(" ");

  const { resultCalc, count } = calc(
    formatResponse(weight),
    formatResponse(height)
  );

  const result = [
    {
      type: "article",
      id: v4(),
      title: `IMC: ${count}`,
      input_message_content: { message_text: `IMC: ${count}` },
    },
    {
      type: "article",
      id: v4(),
      title: count,
      input_message_content: { message_text: count },
    },
    {
      type: "article",
      id: v4(),
      title: `Você está ${resultCalc}`,
      input_message_content: { message_text: count },
    },
  ];

  logger.info(`Inline query for text ${query}...`);

  // @ts-ignore
  bot.answerInlineQuery(id, result);
});

bot.onText(/\/start/, (msg) => {
  logger.info(`Starting new conversation...`);

  const chatId = msg.chat.id;

  let height = 0;
  let weight = 0;

  bot.sendMessage(chatId, messages.YourHeight);

  bot.on("message", (msg) => {
    // @ts-ignore
    if (isEqual(msg, messages.YourHeight)) {
      // @ts-ignore
      height = formatResponse(msg.text);

      bot.sendMessage(chatId, messages.YourWeight);
    } else if (isEqual(msg, messages.YourWeight)) {
      // @ts-ignore
      weight = formatResponse(msg.text);

      const { resultCalc } = calc(weight, height);

      bot.sendMessage(chatId, `Você está ${resultCalc}`);
    } else {
      bot.sendMessage(chatId, messages.MessageNotReplyed);
    }
  });
});
