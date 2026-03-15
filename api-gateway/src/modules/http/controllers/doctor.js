export default function doctorControllerFactory ({ DoctorService }) {
  async function affiliate ({ body: params }) {
    try {
      const affiliatedDoctor = await DoctorService
        .affiliateDoctor({ payload: JSON.stringify(params) })

      return {
        body: JSON.parse(affiliatedDoctor.payload),
        statusCode: 201,
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: {
          error: err.message || 'Failed to affiliate doctor',
        },
      }
    }
  }

  async function getDoctor ({ params }) {
    try {
      const doctor = await DoctorService.getDoctor({ id: String(params.id) })
      if (doctor.error) {
        const errObj = JSON.parse(doctor.error)
        return { statusCode: 404, body: { error: errObj.message || 'Doctor not found' } }
      }
      return { body: JSON.parse(doctor.payload), statusCode: 200 }
    } catch (err) {
      return { statusCode: 500, body: { error: err.message || 'Failed to get doctor' } }
    }
  }

  async function listDoctors () {
    try {
      const doctorResult = await DoctorService.listDoctors({})
      if (doctorResult.error) {
        const errObj = JSON.parse(doctorResult.error)
        return { statusCode: 500, body: { error: errObj.message || 'Failed to list doctors' } }
      }
      return { body: JSON.parse(doctorResult.payload || '[]'), statusCode: 200 }
    } catch (err) {
      return { statusCode: 500, body: { error: err.message || 'Failed to list doctors' } }
    }
  }

  return {
    affiliate,
    getDoctor,
    listDoctors,
  }
}
