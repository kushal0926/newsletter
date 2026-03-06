import request from "supertest";
import httpStatus from "http-status";
import { createServer } from "../../src/server";
import { describe, it } from "node:test";

describe("signup", () => {
  const app = createServer();

  it("should return 200 if it is up", () => {
    request(app).get("/health").send().expect("ok").expect(httpStatus.OK);
  });
});
