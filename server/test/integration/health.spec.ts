import request from "supertest";
import httpStatus from "http-status";
import { describe, it } from "@jest/globals";
import { createServer } from "../../src/server";
import { TestPubSub } from "../../src/services/pubsub/test-pubsub";

describe("health", () => {
  const pubSub = new TestPubSub();
  const app = createServer(pubSub);

  it("should return 200 if the server is up", async () => {
    await request(app)
      .get("/api/health")
      .send()
      .expect("ok")
      .expect(httpStatus.OK);
  });
});
