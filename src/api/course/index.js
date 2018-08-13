import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import { master, token } from "../../services/passport";
import { create, index, show, update, destroy, process } from "./controller";
import { schema } from "./model";
export Course, { schema } from "./model";

const router = new Router();
const { term, crn, subject, number, section, title } = schema.tree;

/**
 * @api {post} /courses Create course
 * @apiName CreateCourse
 * @apiGroup Course
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam term Course's term.
 * @apiParam crn Course's crn.
 * @apiParam subject Course's subject.
 * @apiParam number Course's number.
 * @apiParam section Course's section.
 * @apiParam title Course's title.
 * @apiSuccess {Object} course Course's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Course not found.
 * @apiError 401 user access only.
 */
router.post(
  "/",
  token({ required: true }),
  body({ term, crn, subject, number, section, title }),
  create
);

/**
 * @api {get} /courses Retrieve courses
 * @apiName RetrieveCourses
 * @apiGroup Course
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} courses List of courses.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get(
  "/",
  token({ required: true }),
  query({ term, crn: { type: RegExp } }),
  index
);

/**
 * @api {get} /coursese/process Process courses
 * @apiName ProcessCourses
 * @apiGroup Course
 * @apiPermission public
 * @apiUse listParams
 * @apiSuccess (Success 204) 204 No Content.
 */
router.get("/process", query(), process);

/**
 * @api {get} /courses/:id Retrieve course
 * @apiName RetrieveCourse
 * @apiGroup Course
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} course Course's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Course not found.
 * @apiError 401 user access only.
 */
router.get("/:id", token({ required: true }), show);

/**
 * @api {put} /courses/:id Update course
 * @apiName UpdateCourse
 * @apiGroup Course
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam term Course's term.
 * @apiParam crn Course's crn.
 * @apiParam subject Course's subject.
 * @apiParam number Course's number.
 * @apiParam section Course's section.
 * @apiParam title Course's title.
 * @apiSuccess {Object} course Course's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Course not found.
 * @apiError 401 master access only.
 */
router.put(
  "/:id",
  master(),
  body({ term, crn, subject, number, section, title }),
  update
);

/**
 * @api {delete} /courses/:id Delete course
 * @apiName DeleteCourse
 * @apiGroup Course
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Course not found.
 * @apiError 401 master access only.
 */
router.delete("/:id", master(), destroy);

export default router;
