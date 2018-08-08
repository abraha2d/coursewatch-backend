import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import { master, token } from "../../services/passport";
import { create, index, show, update, destroy } from "./controller";
import { schema } from "./model";
export College, { schema } from "./model";

const router = new Router();
const { code, name, url } = schema.tree;

/**
 * @api {post} /colleges Create college
 * @apiName CreateCollege
 * @apiGroup College
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam code College's code.
 * @apiParam name College's name.
 * @apiParam url College's url.
 * @apiSuccess {Object} college College's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 College not found.
 * @apiError 401 master access only.
 */
router.post("/", master(), body({ code, name, url }), create);

/**
 * @api {get} /colleges Retrieve colleges
 * @apiName RetrieveColleges
 * @apiGroup College
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} colleges List of colleges.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get("/", token({ required: true }), query(), index);

/**
 * @api {get} /colleges/:id Retrieve college
 * @apiName RetrieveCollege
 * @apiGroup College
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} college College's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 College not found.
 * @apiError 401 user access only.
 */
router.get("/:id", token({ required: true }), show);

/**
 * @api {put} /colleges/:id Update college
 * @apiName UpdateCollege
 * @apiGroup College
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam code College's code.
 * @apiParam name College's name.
 * @apiParam url College's url.
 * @apiSuccess {Object} college College's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 College not found.
 * @apiError 401 master access only.
 */
router.put("/:id", master(), body({ code, name, url }), update);

/**
 * @api {delete} /colleges/:id Delete college
 * @apiName DeleteCollege
 * @apiGroup College
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 College not found.
 * @apiError 401 master access only.
 */
router.delete("/:id", master(), destroy);

export default router;
