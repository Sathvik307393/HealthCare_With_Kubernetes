export default function getDoctorFactory ({ doctorRepository }) {
  return async function execute ({
    request,
  }, callback) {
    try {
      const {
        id,
      } = request

      const doctor = await doctorRepository.findOneById({
        id: Number(id),
      })
      console.log('🚀 ~ file: getDoctor.js:13 ~ getDoctorFactory ~ doctor:', doctor)

      if (!doctor) {
        return callback(null, {
          error: JSON.stringify({ message: 'Doctor not found', code: 'NOT_FOUND' }),
        })
      }

      return callback(null, {
        id: doctor.id,
        payload: JSON.stringify(doctor),
      })
    } catch (error) {
      console.error('Error in getDoctor:', error.message)
      return callback(null, {
        error: JSON.stringify({ message: error.message || 'Failed to get doctor', code: 'INTERNAL_ERROR' }),
      })
    }
  }
}
