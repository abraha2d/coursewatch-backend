import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import { token } from "../../services/passport";
import { create, index, show, update, destroy, process } from "./controller";
import { schema } from "./model";
export Subscription, { schema } from "./model";

const router = new Router();
const { course } = schema.tree;

/**
 * @api {post} /subscriptions Create subscription
 * @apiName CreateSubscription
 * @apiGroup Subscription
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam course Subscription's course.
 * @apiSuccess {Object} subscription Subscription's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Subscription not found.
 * @apiError 401 user access only.
 */
router.post("/", token({ required: true }), body({ course }), create);

/**
 * @api {get} /subscriptions Retrieve subscriptions
 * @apiName RetrieveSubscriptions
 * @apiGroup Subscription
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} subscriptions List of subscriptions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get("/", token({ required: true }), query(), index);

/**
 * @api {get} /subscriptions/process Process subscriptions
 * @apiName ProcessSubscriptions
 * @apiGroup Subscription
 * @apiPermission public
 * @apiUse listParams
 * @apiSuccess (Success 204) 204 No Content.
 */
router.get("/process", query(), process);

/**
 * @api {get} /subscriptions/:id Retrieve subscription
 * @apiName RetrieveSubscription
 * @apiGroup Subscription
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} subscription Subscription's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Subscription not found.
 * @apiError 401 user access only.
 */
router.get("/:id", token({ required: true }), show);

/**
 * @api {put} /subscriptions/:id Update subscription
 * @apiName UpdateSubscription
 * @apiGroup Subscription
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam course Subscription's course.
 * @apiSuccess {Object} subscription Subscription's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Subscription not found.
 * @apiError 401 user access only.
 */
router.put("/:id", token({ required: true }), body({ course }), update);

/**
 * @api {delete} /subscriptions/:id Delete subscription
 * @apiName DeleteSubscription
 * @apiGroup Subscription
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Subscription not found.
 * @apiError 401 user access only.
 */
router.delete("/:id", token({ required: true }), destroy);

export default router;
