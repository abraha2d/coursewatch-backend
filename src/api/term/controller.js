import { success, notFound } from "../../services/response/";
import { Term } from ".";

export const create = ({ bodymen: { body } }, res, next) =>
  Term.create(body)
    .then(term => term.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Term.find(query, select, cursor)
    .populate("college")
    .then(terms => terms.map(term => term.view()))
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Term.findById(params.id)
    .populate("college")
    .then(notFound(res))
    .then(term => (term ? term.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Term.findById(params.id)
    .populate("college")
    .then(notFound(res))
    .then(term => (term ? Object.assign(term, body).save() : null))
    .then(term => (term ? term.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Term.findById(params.id)
    .then(notFound(res))
    .then(term => (term ? term.remove() : null))
    .then(success(res, 204))
    .catch(next);
