require("@testing-library/jest-dom");
require("whatwg-fetch");

const { TextEncoder, TextDecoder } = require("util");
const { ReadableStream, WritableStream, TransformStream } = require("stream/web");

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.ReadableStream = ReadableStream;
global.WritableStream = WritableStream;
global.TransformStream = TransformStream;

class MockBroadcastChannel {
  constructor(name) {
    this.name = name;
  }
  postMessage() {}
  close() {}
  addEventListener() {}
  removeEventListener() {}
}

global.BroadcastChannel = MockBroadcastChannel;

require("./src/test/setup-msw");