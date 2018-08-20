module.exports = {
    init(room) {
        if (!io.sockets.adapter.rooms[room].chat) {
            io.sockets.adapter.rooms[room].chat = [{
                sender: 'Server',
                message: `Welcome to the ${room} khana`
            }];
            this.sendChatFront(room);
        }
    },

    sendMessage(sender, message, room) {
        const msgObject = {sender, message};
        io.sockets.adapter.rooms[room].chat.push(msgObject);
        this.sendChatFront(room);
    },

    sendChatFront(room) {
        const chat = io.sockets.adapter.rooms[room].chat;
        console.log(chat);
        io.in(room).emit('chatUpdate', chat);
    }
}