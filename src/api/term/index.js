import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import { master, token } from "../../services/passport";
import { create, index, show, update, destroy } from "./controller";
import { schema } from "./model";
export Term, { schema } from "./model";

const router = new Router();
const { college, yyyymm, name } = schema.tree;

/**
 * @api {post} /terms Create term
 * @apiName CreateTerm
 * @apiGroup Term
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam college Term's college.
 * @apiParam yyyymm Term's yyyymm.
 * @apiParam name Term's name.
 * @apiSuccess {Object} term Term's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Term not found.
 * @apiError 401 master access only.
 */
router.post("/", master(), body({ college, yyyymm, name }), create);

/**
 * @api {get} /terms Retrieve terms
 * @apiName RetrieveTerms
 * @apiGroup Term
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} terms List of terms.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get("/", token({ required: true }), query({ college }), index);

/**
 * @api {get} /terms/:id Retrieve term
 * @apiName RetrieveTerm
 * @apiGroup Term
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} term Term's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Term not found.
 * @apiError 401 user access only.
 */
router.get("/:id", token({ required: true }), show);

/**
 * @api {put} /terms/:id Update term
 * @apiName UpdateTerm
 * @apiGroup Term
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam college Term's college.
 * @apiParam yyyymm Term's yyyymm.
 * @apiParam name Term's name.
 * @apiSuccess {Object} term Term's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Term not found.
 * @apiError 401 master access only.
 */
router.put("/:id", master(), body({ college, yyyymm, name }), update);

/**
 * @api {delete} /terms/:id Delete term
 * @apiName DeleteTerm
 * @apiGroup Term
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Term not found.
 * @apiError 401 master access only.
 */
router.delete("/:id", master(), destroy);

export default router;
