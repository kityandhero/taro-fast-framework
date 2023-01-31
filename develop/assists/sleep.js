/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */

function mSleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

function sleep(n) {
  if (n <= 0) {
    return;
  }

  console.log(`sleep ${n}s`);

  mSleep(n * 1000);
}

sleep(2);
