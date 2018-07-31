import request from "supertest";
import { apiRoot } from "../../config";
import { signSync } from "../../services/jwt";
import express from "../../services/express";
import { User } from "../user";
import routes, { Subscription } from ".";

const app = () => express(apiRoot, routes);

let userSession, anotherSession, subscription;

beforeEach(async () => {
  const user = await User.create({ email: "a@a.com", password: "123456" });
  const anotherUser = await User.create({
    email: "b@b.com",
    password: "123456"
  });
  userSession = signSync(user.id);
  anotherSession = signSync(anotherUser.id);
  subscription = await Subscription.create({ user });
});

test("POST /subscriptions 201 (user)", async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, course: "test" });
  expect(status).toBe(201);
  expect(typeof body).toEqual("object");
  expect(body.course).toEqual("test");
  expect(typeof body.user).toEqual("object");
});

test("POST /subscriptions 401", async () => {
  const { status } = await request(app()).post(`${apiRoot}`);
  expect(status).toBe(401);
});

test("GET /subscriptions 200 (user)", async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession });
  expect(status).toBe(200);
  expect(Array.isArray(body)).toBe(true);
  expect(typeof body[0].user).toEqual("object");
});

test("GET /subscriptions 401", async () => {
  const { status } = await request(app()).get(`${apiRoot}`);
  expect(status).toBe(401);
});

test("GET /subscriptions/:id 200 (user)", async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${subscription.id}`)
    .query({ access_token: userSession });
  expect(status).toBe(200);
  expect(typeof body).toEqual("object");
  expect(body.id).toEqual(subscription.id);
  expect(typeof body.user).toEqual("object");
});

test("GET /subscriptions/:id 401", async () => {
  const { status } = await request(app()).get(`${apiRoot}/${subscription.id}`);
  expect(status).toBe(401);
});

test("GET /subscriptions/:id 404 (user)", async () => {
  const { status } = await request(app())
    .get(apiRoot + "/123456789098765432123456")
    .query({ access_token: userSession });
  expect(status).toBe(404);
});

test("PUT /subscriptions/:id 200 (user)", async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${subscription.id}`)
    .send({ access_token: userSession, course: "test" });
  expect(status).toBe(200);
  expect(typeof body).toEqual("object");
  expect(body.id).toEqual(subscription.id);
  expect(body.course).toEqual("test");
  expect(typeof body.user).toEqual("object");
});

test("PUT /subscriptions/:id 401 (user) - another user", async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${subscription.id}`)
    .send({ access_token: anotherSession, course: "test" });
  expect(status).toBe(401);
});

test("PUT /subscriptions/:id 401", async () => {
  const { status } = await request(app()).put(`${apiRoot}/${subscription.id}`);
  expect(status).toBe(401);
});

test("PUT /subscriptions/:id 404 (user)", async () => {
  const { status } = await request(app())
    .put(apiRoot + "/123456789098765432123456")
    .send({ access_token: anotherSession, course: "test" });
  expect(status).toBe(404);
});

test("DELETE /subscriptions/:id 204 (user)", async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${subscription.id}`)
    .query({ access_token: userSession });
  expect(status).toBe(204);
});

test("DELETE /subscriptions/:id 401 (user) - another user", async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${subscription.id}`)
    .send({ access_token: anotherSession });
  expect(status).toBe(401);
});

test("DELETE /subscriptions/:id 401", async () => {
  const { status } = await request(app()).delete(
    `${apiRoot}/${subscription.id}`
  );
  expect(status).toBe(401);
});

test("DELETE /subscriptions/:id 404 (user)", async () => {
  const { status } = await request(app())
    .delete(apiRoot + "/123456789098765432123456")
    .query({ access_token: anotherSession });
  expect(status).toBe(404);
});
