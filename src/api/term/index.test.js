import request from "supertest";
import { masterKey, apiRoot } from "../../config";
import express from "../../services/express";
import routes, { Term } from ".";

const app = () => express(apiRoot, routes);

let term;

beforeEach(async () => {
  term = await Term.create({});
});

test("POST /terms 201 (master)", async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({
      access_token: masterKey,
      college: "test",
      yyyymm: "test",
      name: "test"
    });
  expect(status).toBe(201);
  expect(typeof body).toEqual("object");
  expect(body.college).toEqual("test");
  expect(body.yyyymm).toEqual("test");
  expect(body.name).toEqual("test");
});

test("POST /terms 401", async () => {
  const { status } = await request(app()).post(`${apiRoot}`);
  expect(status).toBe(401);
});

test("GET /terms 200 (master)", async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey });
  expect(status).toBe(200);
  expect(Array.isArray(body)).toBe(true);
});

test("GET /terms 401", async () => {
  const { status } = await request(app()).get(`${apiRoot}`);
  expect(status).toBe(401);
});

test("GET /terms/:id 200 (master)", async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${term.id}`)
    .query({ access_token: masterKey });
  expect(status).toBe(200);
  expect(typeof body).toEqual("object");
  expect(body.id).toEqual(term.id);
});

test("GET /terms/:id 401", async () => {
  const { status } = await request(app()).get(`${apiRoot}/${term.id}`);
  expect(status).toBe(401);
});

test("GET /terms/:id 404 (master)", async () => {
  const { status } = await request(app())
    .get(apiRoot + "/123456789098765432123456")
    .query({ access_token: masterKey });
  expect(status).toBe(404);
});

test("PUT /terms/:id 200 (master)", async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${term.id}`)
    .send({
      access_token: masterKey,
      college: "test",
      yyyymm: "test",
      name: "test"
    });
  expect(status).toBe(200);
  expect(typeof body).toEqual("object");
  expect(body.id).toEqual(term.id);
  expect(body.college).toEqual("test");
  expect(body.yyyymm).toEqual("test");
  expect(body.name).toEqual("test");
});

test("PUT /terms/:id 401", async () => {
  const { status } = await request(app()).put(`${apiRoot}/${term.id}`);
  expect(status).toBe(401);
});

test("PUT /terms/:id 404 (master)", async () => {
  const { status } = await request(app())
    .put(apiRoot + "/123456789098765432123456")
    .send({
      access_token: masterKey,
      college: "test",
      yyyymm: "test",
      name: "test"
    });
  expect(status).toBe(404);
});

test("DELETE /terms/:id 204 (master)", async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${term.id}`)
    .query({ access_token: masterKey });
  expect(status).toBe(204);
});

test("DELETE /terms/:id 401", async () => {
  const { status } = await request(app()).delete(`${apiRoot}/${term.id}`);
  expect(status).toBe(401);
});

test("DELETE /terms/:id 404 (master)", async () => {
  const { status } = await request(app())
    .delete(apiRoot + "/123456789098765432123456")
    .query({ access_token: masterKey });
  expect(status).toBe(404);
});
