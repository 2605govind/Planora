const {Queue} = require('bullmq')

const myqueue = new Queue('email-my-queue', { connection: { host: '127.0.0.1', port: 6379 } });

async function init() {
    const res = await myqueue.add('this is first', {
        email: "abc@exmaple.com",
        subject: "something",
    })
    console.log("job add "+ res.id);
}

init();
