const dotenv = require("dotenv");
const debug = require("debug")("bot");

const mongoose = require("mongoose");

const { Telegraf } = require("telegraf");

const route = require("./bot.route");

// AKTIFKAN CONFIG
dotenv.config({ path: "botconfig.env" });

// AKTIFKAN MONGODB
mongoose.connect(process.env.MONGODB_URI);

// MEMBUAT BOT
const bot = new Telegraf(process.env.TOKEN);

// SETUP BOT
route(bot);

// MEMULAI BOT
(async () => {
    debug("starting...");
    const msg = await bot.telegram.sendMessage(
        process.env.OWNER_ID,
        "i'm starting..."
    );

    await bot.launch();

    await bot.telegram.editMessageText(
        process.env.OWNER_ID,
        msg.message_id,
        undefined,
        "i'm launch!"
    );
    debug("launch!");
})();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
