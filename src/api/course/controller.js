import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Course } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Course.create({ ...body, user })
    .then((course) => course.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ user, querymen: { query, select, cursor } }, res, next) =>
  Course.find(query, select, cursor)
    .populate('user')
    .then((courses) => courses.map((course) => {
      const isAdmin = user.role === 'admin'
      const isAuthor = course['user'].equals(user.id)
      if (isAuthor || isAdmin) {
        return course.view()
      }
      return null
    }).filter((course) => course != null))
    .then(success(res))
    .catch(next)

export const show = ({ user, params }, res, next) =>
  Course.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((course) => course ? course.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Course.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((course) => course ? Object.assign(course, body).save() : null)
    .then((course) => course ? course.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Course.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((course) => course ? course.remove() : null)
    .then(success(res, 204))
    .catch(next)
