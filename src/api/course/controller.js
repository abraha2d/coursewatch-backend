import { success, notFound } from "../../services/response/";
import { Course } from ".";
import { processCourse, processCourses } from "../../services/ellucian";

export const create = ({ bodymen: { body } }, res, next) =>
  Course.create(body)
    .then(course => course.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Course.find(query, select, cursor)
    .populate({
      path: "term",
      populate: { path: "college" }
    })
    .then(courses => processCourses(courses))
    .then(courses => courses.map(course => course.view()))
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Course.findById(params.id)
    .populate({
      path: "term",
      populate: { path: "college" }
    })
    .then(notFound(res))
    .then(course => processCourse(course))
    .then(course => (course ? course.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Course.findById(params.id)
    .populate({
      path: "term",
      populate: { path: "college" }
    })
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
