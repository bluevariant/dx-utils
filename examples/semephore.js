const Semaphore = require("../Semaphore");

const one = new Semaphore(2);
one
  .acquire((release) => {
    let i = 0;
    const timer = setInterval(() => {
      console.log("0:", i);
      i++;

      if (i === 10) {
        clearInterval(timer);
        release("OK");
      }
    }, 1000);
  })
  .then(console.log);
