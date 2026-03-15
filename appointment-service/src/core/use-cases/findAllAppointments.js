function findAllAppointmentsFactory ({ appointmentRepository }) {
  return async function execute ({ request }, callback) {
    try {
      const { params } = request

      const { doctorId, startDate = null, endDate = null } = JSON.parse(params)

      const queryParams = {
        doctorId: Number(doctorId),
      }
      if (startDate) queryParams.startDate = Number(startDate)
      if (endDate) queryParams.endDate = Number(endDate)

      const appointments = await appointmentRepository.listByDoctorId({
        queryParams,
      })

      return callback(null, {
        appointments: appointments.map((appointment) => ({
          id: appointment.id,
          payload: JSON.stringify(appointment),
        })),
      })
    } catch (error) {
      throw new Error('todo')
    }
  }
}

export default findAllAppointmentsFactory
