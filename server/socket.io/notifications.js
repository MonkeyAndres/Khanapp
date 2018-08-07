const sendNotification = (game) => {
    io.in(game.title).emit('sendNotification', {
        title: `The ${game.title} Khana has started!!`,
        body: 'Click here to join the khana!!',
        link: `/gameboard/${game._id}`
    });
}

module.exports = sendNotification;