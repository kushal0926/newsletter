import request from "supertest";
import httpStatus from "http-status";
import { createServer } from "../../src/server";
import { describe, it } from "node:test";

describe("health", () => {
  // const pubSub = new TestPubSub()
  const app = createServer();

  it("should return 200 if the server is up", async () => {
    await request(app)
      .get("api/health")
      .send()
      .expect("ok")
      .expect(httpStatus.OK);
  });
});
