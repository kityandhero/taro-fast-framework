/* eslint-disable no-undef */

function mSleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

function sleep(n) {
  mSleep(n * 1000);
}

sleep(2);
