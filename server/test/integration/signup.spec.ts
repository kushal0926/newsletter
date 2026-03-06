import request from "supertest";
import httpStatus from "http-status";
import { createServer } from "../../src/server";
import { describe, it } from "node:test";
// import { TestPubSub } from "../../src/services/pubsub/test-pubsub";

describe("signup", () => {
  // const pubSub = new TestPubSub();

  const app = createServer();

  it("should return 400 if not sent an email in the body", async () => {
    await request(app)
      .post("/api/newsletter/signup")
      .send({})
      .expect(httpStatus.BAD_REQUEST)
      .expect("error");
  });
});
