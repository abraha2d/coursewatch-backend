import { success, notFound } from "../../services/response/";
import { Course } from ".";

export const create = ({ bodymen: { body } }, res, next) =>
  Course.create(body)
    .then(course => course.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Course.find(query, select, cursor)
    .then(courses => courses.map(course => course.view()))
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Course.findById(params.id)
    .then(notFound(res))
    .then(course => (course ? course.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Course.findById(params.id)
    .then(notFound(res))
    .then(course => (course ? Object.assign(course, body).save() : null))
    .then(course => (course ? course.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Course.findById(params.id)
    .then(notFound(res))
    .then(course => (course ? course.remove() : null))
    .then(success(res, 204))
    .catch(next);
