// import IORedis  from 'ioredis'
import {Queue, Worker } from 'bullmq'
// import {ENV} from '../config/env.js'

// export const redis = new IORedis(ENV.REDIS_URL);



export const emailQueue = new Queue('email-queue');

export const passwordResetQueue = new Queue('password-reset-queue');


export {Queue, Worker};