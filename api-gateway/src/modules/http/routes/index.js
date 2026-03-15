import { Router } from 'express'
import wrapAction from '../wrapAction.js'

export default function routerFactory ({ controllers, middlewares }) {
  const router = Router()

  const { doctorController, appointmentController, userController } = controllers
  const { validateSession } = middlewares

  router.post(
    '/users',
    wrapAction(userController.create),
  )

  router.post(
    '/users/authenticate',
    wrapAction(userController.authenticate),
  )

  router.post(
    '/doctors',
    validateSession,
    wrapAction(doctorController.affiliate),
  )

  router.get(
    '/doctors',
    validateSession,
    wrapAction(doctorController.listDoctors),
  )

  router.get(
    '/doctors/:id',
    validateSession,
    wrapAction(doctorController.getDoctor),
  )

  router.post(
    '/doctors/:id/appointments',
    validateSession,
    wrapAction(appointmentController.create),
  )

  router.get(
    '/doctors/:id/appointments',
    validateSession,
    wrapAction(appointmentController.list),
  )

  router.get(
    '/doctors/:id/appointments/available',
    validateSession,
    wrapAction(appointmentController.findAvailable),
  )

  return router
}
