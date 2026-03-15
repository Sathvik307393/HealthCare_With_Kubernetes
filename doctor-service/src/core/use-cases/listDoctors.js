export default function listDoctorsFactory ({ doctorRepository }) {
  return async function execute ({ request }, callback) {
    try {
      const doctors = await doctorRepository.list()
      if (!doctors) {
        return callback(null, { id: '0', payload: JSON.stringify([]) })
      }
      return callback(null, {
        id: '0',
        payload: JSON.stringify(doctors),
      })
    } catch (error) {
      console.error('Error in listDoctors:', error.message)
      return callback(null, {
        error: JSON.stringify({ message: error.message || 'Failed to list doctors', code: 'INTERNAL_ERROR' }),
      })
    }
  }
}
