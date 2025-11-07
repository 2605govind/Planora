const {Worker} = require('bullmq')


const Send = (s) => new Promise((res,rej) => setTimeout(() => res(), s * 1000))

const worker = new Worker('email-my-queue', async (job) => {
        console.log('worker job id '+ job.id)
        console.log('data ', job)
        // await
        await Send(5);
        console.log('send')
},  { connection: { host: '127.0.0.1', port: 6379 }});