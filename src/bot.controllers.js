const debug = require("debug")("bot");

const ChatIds = require("./models/ChatIds");
const Rooms = require("./models/Rooms");

const HELP_TEXT = `
/help - Melihat semua daftar perintah
/join - Untuk memasukkan anda ke daftar pencarian seseorang
/find - Untuk mencari teman langsung
/refresh - Untuk mengakhiri percakapan

Perhatian: Sebelum /find harus /join dulu
`;

exports.refresh = async (ctx) => {
    const chat_id = ctx.chat.id;
    if (await Rooms.exists({ room: chat_id })) {
        const rooms = await Rooms.findOneAndDelete({ room: chat_id });
        rooms.room.forEach(
            async (chat_id) =>
                await ctx.telegram.sendMessage(
                    chat_id,
                    "Chat berakhir...\nKirim /join untuk mulai lagi"
                )
        );
        debug(`${rooms.room.join(" ! ")}`);
    }
};

exports.join = async (ctx) => {
    const chat_id = ctx.chat.id;
    if (
        !(
            (await ChatIds.exists({ chat_id })) ||
            (await Rooms.exists({ room: chat_id }))
        )
    ) {
        await ChatIds.create({ chat_id });
        debug(await ChatIds.find({}, { chat_id: 1 }));
        await ctx.reply(
            "Selamat bergabung, silahkan tunggu sampai mendapatkan teman atau kirim /find untuk mencari teman segera"
        );
    } else await ctx.reply("Anda sudah bergabung");
};

exports.find = async (ctx) => {
    const chat_id = ctx.chat.id;
    const chat_id_count = await ChatIds.estimatedDocumentCount();
    if (await Rooms.exists({ room: chat_id })) {
        await ctx.reply("Anda sedang di dalam room");
    } else if (chat_id_count > 1) {
        const getRandomChatId = async () => {
            const res = await ChatIds.findOne({
                chat_id: { $ne: chat_id },
                $sampleRate: 0.5,
            });

            return res ? res.chat_id : getRandomChatId();
        };
        const friend_id = await getRandomChatId();
        await Rooms.create({ room: [friend_id, chat_id] });
        await ChatIds.deleteMany({
            room: { $in: [friend_id, chat_id] },
        });
        await ctx.reply("Teman sudah ditemukan");
        await ctx.telegram.sendMessage(friend_id, "Anda mendapatkan teman");
    } else {
        await ctx.reply("Belum ada user yang bergabung. Coba lagi nanti");
    }
};

exports.setupTextMessage = async (ctx) => {
    const chat_id = ctx.chat.id;
    if (await Rooms.exists({ room: chat_id })) {
        const { room } = await Rooms.findOne({ room: chat_id });
        room.splice(room.indexOf(chat_id), 1);
        await ctx.telegram.sendMessage(room[0], ctx.message.text);
        debug(`${chat_id} -> ${room[0]}`);
    }
};

exports.help = async (ctx) => {
    await ctx.reply(HELP_TEXT);
};
