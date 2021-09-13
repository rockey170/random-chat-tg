const controllers = require("./bot.controllers");

module.exports = (bot) => {
    // SETUP COMMANDS
    bot.command("refresh", controllers.refresh);

    bot.command("join", controllers.join);

    bot.command("find", controllers.find);

    bot.command("help", controllers.help);

    // SETUP FRIENDSHIP
    bot.on("text", controllers.setupTextMessage);
};
