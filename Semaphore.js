const Queue = require("better-queue");

class Semaphore {
  constructor(slotLimit) {
    this.queue = new Queue(
      async function (inputFn, cb) {
        const release = (result) => {
          cb(null, result);
        };

        try {
          await inputFn(release);
        } catch (e) {
          cb(e, null);
        }
      },
      {
        concurrent: slotLimit,
      }
    );
  }

  acquire(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push(fn, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  }
}

module.exports = Semaphore;
