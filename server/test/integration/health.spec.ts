import request from "supertest";
import httpStatus from "http-status";
import { describe, it } from "@jest/globals";
import { createServer } from "../../src/server";
import { TestPubSub } from "../../src/services/pubsub/test-pubsub";
import TestMailer from "../../src/services/mailer/test-mailer";

describe("health", () => {
  const pubSub = new TestPubSub();
  const mailer = new TestMailer();
  const app = createServer({ pubSub, mailer });

  it("should return 200 if the server is up", async () => {
    await request(app)
      .get("/api/health")
      .send()
      .expect("ok")
      .expect(httpStatus.OK);
  });
});
