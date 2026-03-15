export default function appointmentControllerFactory ({ AppointmentService }) {
  async function create ({ params, body }) {
    try {
      const { id: doctorId } = params

      const appointmentDate = body.appointment_date || body.start_time || new Date().toISOString()
      const appointmentTime = body.appointment_time || body.appointment_time || '00:00'

      const createdAppointment = await AppointmentService.createAppointment({
        payload: JSON.stringify({
          doctorId,
          startTime: appointmentDate,
          appointmentTime,
          doctorData: {
            id: Number(doctorId),
            name: body.doctor_name || null,
            specialty: body.doctor_specialty || null,
          },
          userData: {
            age: body.age,
            reason_for_visit: body.reason_for_visit,
            chief_complaint: body.chief_complaint,
            known_allergies: body.known_allergies,
            patient_name: body.patient_name,
          },
        }),
      })

      return {
        body: JSON.parse(createdAppointment.payload),
        statusCode: 201,
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: {
          error: err.message || 'Failed to create appointment',
        },
      }
    }
  }

  async function list ({ params, query }) {
    try {
      const { id: doctorId } = params

      const payloadParams = {
        doctorId,
      }
      if (query.startDate) payloadParams.startDate = Number(query.startDate)
      if (query.endDate) payloadParams.endDate = Number(query.endDate)

      const { appointments } = await AppointmentService.findAllAppointments({
        params: JSON.stringify(payloadParams),
      })

      return {
        body: appointments.map(({ payload }) => ({ ...JSON.parse(payload) })),
        statusCode: 200,
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: {
          error: err.message || 'Failed to list appointments',
        },
      }
    }
  }

  async function findAvailable ({ params, query }) {
    try {
      const { id: doctorId } = params

      const { appointments } = await AppointmentService.findAvailableAppointments({
        params: JSON.stringify({
          doctorId,
          ...query,
        }),
      })

      return {
        body: appointments.map(({ payload }) => ({ ...JSON.parse(payload) })),
        statusCode: 200,
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: {
          error: err.message || 'Failed to find available appointments',
        },
      }
    }
  }

  return {
    create,
    list,
    findAvailable,
  }
}
