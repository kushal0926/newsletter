import request from "supertest";
import httpStatus from "http-status";
import { describe, it, expect } from "@jest/globals";
import { createServer } from "../../src/server";
import { TestPubSub } from "../../src/services/pubsub/test-pubsub";
import TestMailer from "../../src/services/mailer/test-mailer";

describe("signup", () => {
  const pubSub = new TestPubSub();

  const mailer = new TestMailer();
  const app = createServer({ pubSub, mailer });

  it("should return 400 if not sent an email in the body", async () => {
    const response = await request(app)
      .post("/api/newsletter/signup")
      .send({})
      .expect(httpStatus.BAD_REQUEST);

    expect(response.body.message).toBe("email is required!");
  });
});
