function createAppointmentFactory ({ appointmentRepository, logger }) {
  return async function execute ({ request }, callback) {
    try {
      const { payload } = request

      const {
        companyId,
        doctorId,
        doctorData,
        userId,
        userData,
        startTime,
        appointmentTime,
      } = JSON.parse(payload)

      const createdAppointment = await appointmentRepository.create({
        params: {
          company_id: companyId || null,
          doctor_id: Number(doctorId) || null,
          doctor_data: doctorData || null,
          user_id: userId || null,
          user_data: userData || null,
          start_time: startTime ? new Date(startTime) : new Date(),
          appointment_time: appointmentTime || new Date().toISOString(),
        },
      })
      console.log('🚀 ~ file: createAppointment.js:27 ~ execute ~ createdAppointment:', createdAppointment)

      logger.info({
        message: 'Appointment created',
        doctor_id: createdAppointment.doctor_id,
        appointment_id: createdAppointment.id,
      })

      return callback(null, {
        id: createdAppointment.id,
        payload: JSON.stringify(createdAppointment),
      })
    } catch (error) {
      console.error('Error in createAppointment:', error.message)
      return callback(null, {
        error: JSON.stringify({
          message: error.message || 'Failed to create appointment',
          code: 'INTERNAL_ERROR'
        }),
      })
    }
  }
}

export default createAppointmentFactory
