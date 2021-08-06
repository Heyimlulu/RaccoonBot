const { Listener } = require('discord-akairo');

class UnhandledRejectionListener extends Listener {
    constructor() {
        super('unhandledRejection', {
            emitter: 'process',
            event: 'unhandledRejection'
        });
    }

    async exec(error) {
        console.error(`\x1b[31mUnhandledRejection: ${error}\x1b[37m`);
    }
}

module.exports = UnhandledRejectionListener;