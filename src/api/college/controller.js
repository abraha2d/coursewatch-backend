import { success, notFound } from "../../services/response/";
import { College } from ".";

export const create = ({ bodymen: { body } }, res, next) =>
  College.create(body)
    .then(college => college.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  College.find(query, select, cursor)
    .then(colleges => colleges.map(college => college.view()))
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  College.findById(params.id)
    .then(notFound(res))
    .then(college => (college ? college.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  College.findById(params.id)
    .then(notFound(res))
    .then(college => (college ? Object.assign(college, body).save() : null))
    .then(college => (college ? college.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  College.findById(params.id)
    .then(notFound(res))
    .then(college => (college ? college.remove() : null))
    .then(success(res, 204))
    .catch(next);
