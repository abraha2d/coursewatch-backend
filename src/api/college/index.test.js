import request from "supertest";
import { masterKey, apiRoot } from "../../config";
import express from "../../services/express";
import routes, { College } from ".";

const app = () => express(apiRoot, routes);

let college;

beforeEach(async () => {
  college = await College.create({});
});

test("POST /colleges 201 (master)", async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({
      access_token: masterKey,
      code: "test",
      name: "test",
      url: "test"
    });
  expect(status).toBe(201);
  expect(typeof body).toEqual("object");
  expect(body.code).toEqual("test");
  expect(body.name).toEqual("test");
  expect(body.url).toEqual("test");
});

test("POST /colleges 401", async () => {
  const { status } = await request(app()).post(`${apiRoot}`);
  expect(status).toBe(401);
});

test("GET /colleges 200 (master)", async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey });
  expect(status).toBe(200);
  expect(Array.isArray(body)).toBe(true);
});

test("GET /colleges 401", async () => {
  const { status } = await request(app()).get(`${apiRoot}`);
  expect(status).toBe(401);
});

test("GET /colleges/:id 200 (master)", async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${college.id}`)
    .query({ access_token: masterKey });
  expect(status).toBe(200);
  expect(typeof body).toEqual("object");
  expect(body.id).toEqual(college.id);
});

test("GET /colleges/:id 401", async () => {
  const { status } = await request(app()).get(`${apiRoot}/${college.id}`);
  expect(status).toBe(401);
});

test("GET /colleges/:id 404 (master)", async () => {
  const { status } = await request(app())
    .get(apiRoot + "/123456789098765432123456")
    .query({ access_token: masterKey });
  expect(status).toBe(404);
});

test("PUT /colleges/:id 200 (master)", async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${college.id}`)
    .send({
      access_token: masterKey,
      code: "test",
      name: "test",
      url: "test"
    });
  expect(status).toBe(200);
  expect(typeof body).toEqual("object");
  expect(body.id).toEqual(college.id);
  expect(body.code).toEqual("test");
  expect(body.name).toEqual("test");
  expect(body.url).toEqual("test");
});

test("PUT /colleges/:id 401", async () => {
  const { status } = await request(app()).put(`${apiRoot}/${college.id}`);
  expect(status).toBe(401);
});

test("PUT /colleges/:id 404 (master)", async () => {
  const { status } = await request(app())
    .put(apiRoot + "/123456789098765432123456")
    .send({
      access_token: masterKey,
      code: "test",
      name: "test",
      url: "test"
    });
  expect(status).toBe(404);
});

test("DELETE /colleges/:id 204 (master)", async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${college.id}`)
    .query({ access_token: masterKey });
  expect(status).toBe(204);
});

test("DELETE /colleges/:id 401", async () => {
  const { status } = await request(app()).delete(`${apiRoot}/${college.id}`);
  expect(status).toBe(401);
});

test("DELETE /colleges/:id 404 (master)", async () => {
  const { status } = await request(app())
    .delete(apiRoot + "/123456789098765432123456")
    .query({ access_token: masterKey });
  expect(status).toBe(404);
});
