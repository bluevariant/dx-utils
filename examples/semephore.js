const Semaphore = require("../Semaphore");

const two = new Semaphore(2);

const promises = [];

for (let i = 0; i < 3; i++) {
  const promise = two.acquire((release) => {
    let j = 0;
    const timer = setInterval(() => {
      console.log(i + ":", j);
      j++;

      if (j === 10) {
        clearInterval(timer);
        release("OK: " + i);
      }
    }, 1000);
  });

  promises.push(promise);
}

Promise.all(promises).then(console.log);
