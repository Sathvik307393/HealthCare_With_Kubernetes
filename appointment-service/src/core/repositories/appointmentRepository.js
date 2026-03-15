import { Op } from 'sequelize'

const buildQuery = (startDate, endDate, doctorId) => {
  const conditions = {
    doctor_id: doctorId,
  }

  if (startDate && endDate) {
    conditions.start_time = {
      [Op.gte]: new Date(Number(startDate)),
      [Op.lte]: new Date(Number(endDate)),
    }
  } else if (startDate) {
    conditions.start_time = {
      [Op.gte]: new Date(Number(startDate)),
    }
  } else if (endDate) {
    conditions.start_time = {
      [Op.lte]: new Date(Number(endDate)),
    }
  }

  return {
    raw: true,
    where: conditions,
  }
}

function AppointmentRepositoryFactory ({ postgresDatabase }) {
  const { Appointments } = postgresDatabase.sequelize.models

  async function create ({ params }) {
    try {
      return await Appointments.create(params)
    } catch (error) {
      throw new Error('todo')
    }
  }

  async function listByDoctorId ({ queryParams }) {
    try {
      const { startDate, endDate, doctorId } = queryParams

      const query = buildQuery(startDate, endDate, doctorId)
      return await Appointments.findAll(query, { raw: true })
    } catch (error) {
      throw new Error('todo')
    }
  }

  async function update ({ params, appointmentId }) {
    try {
      const query = {
        where: {
          id: appointmentId,
        },
      }

      return await Appointments.findAll(params, query)
    } catch (error) {
      throw new Error('todo')
    }
  }

  return {
    create,
    listByDoctorId,
    update,
  }
}

export default AppointmentRepositoryFactory
