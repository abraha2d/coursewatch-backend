import { success, notFound, authorOrAdmin } from "../../services/response/";
import {
  processSubscription,
  processSubscriptions
} from "../../services/ellucian";
import { Subscription } from ".";

export const create = ({ user, bodymen: { body } }, res, next) =>
  Subscription.create({ ...body, user })
    .then(subscription => subscription.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ user, querymen: { query, select } }, res, next) =>
  Subscription.find(query, select)
    .populate("user")
    .populate({
      path: "course",
      populate: { path: "term", populate: { path: "college" } }
    })
    .then(subscriptions =>
      subscriptions.reduce((subscriptions, subscription) => {
        if (subscription["user"].equals(user.id) || user.role === "admin") {
          subscriptions.push(subscription.view());
        }
        return subscriptions;
      }, [])
    )
    .then(subscriptions =>
      subscriptions.sort((a, b) => a.course.crn - b.course.crn)
    )
    .then(success(res))
    .catch(next);

export const show = ({ user, params }, res, next) =>
  Subscription.findById(params.id)
    .populate("user")
    .populate({
      path: "course",
      populate: { path: "term", populate: { path: "college" } }
    })
    .then(notFound(res))
    .then(authorOrAdmin(res, user, "user"))
    .then(subscription => processSubscription(subscription))
    .then(subscription => (subscription ? subscription.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Subscription.findById(params.id)
    .populate("user")
    .populate({
      path: "course",
      populate: { path: "term", populate: { path: "college" } }
    })
    .then(notFound(res))
    .then(authorOrAdmin(res, user, "user"))
    .then(
      subscription =>
        subscription ? Object.assign(subscription, body).save() : null
    )
    .then(subscription => (subscription ? subscription.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ user, params }, res, next) =>
  Subscription.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, "user"))
    .then(subscription => (subscription ? subscription.remove() : null))
    .then(success(res, 204))
    .catch(next);

export const process = ({ user, querymen: { query, select } }, res, next) =>
  Subscription.find(query, select)
    .populate("user")
    .populate({
      path: "course",
      populate: { path: "term", populate: { path: "college" } }
    })
    .then(subscriptions => processSubscriptions(subscriptions))
    .then(success(res, 204))
    .catch(next);
