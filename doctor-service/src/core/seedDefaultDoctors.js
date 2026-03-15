function seedDefaultDoctorsFactory ({ doctorRepository, logger }) {
  return async function execute () {
    try {
      const defaults = [
        { name: 'Dr. Nisha Sharma', specialty: 'General Physician', medical_license: 'LIC-101', license_type: 'General', week_schedule: { mon: ['09:00', '13:00'], wed: ['09:00', '13:00'], fri: ['09:00', '13:00'] }, field: 'General Medicine', email: 'nisha@clinic.com' },
        { name: 'Dr. Amit Verma', specialty: 'Cardiologist', medical_license: 'LIC-102', license_type: 'Specialist', week_schedule: { tue: ['10:00', '14:00'], thu: ['10:00', '14:00'] }, field: 'Cardiology', email: 'amit@clinic.com' },
        { name: 'Dr. Priya Rao', specialty: 'Gastroenterologist', medical_license: 'LIC-103', license_type: 'Specialist', week_schedule: { mon: ['11:00', '15:00'], thu: ['11:00', '15:00'] }, field: 'Gastroenterology', email: 'priya@clinic.com' },
        { name: 'Dr. Rina Patel', specialty: 'Pharmacist', medical_license: 'LIC-104', license_type: 'General', week_schedule: { mon: ['09:00', '12:00'], wed: ['14:00', '17:00'] }, field: 'Pharmacy', email: 'rina@clinic.com' },
      ]

      for (const doc of defaults) {
        try {
          const existing = await doctorRepository.findOneByEmail({ email: doc.email })
          if (existing) continue
          await doctorRepository.create({ params: doc })
        } catch (err) {
          logger.warn({ message: 'Skipping seeding default doctor due existing record', doctor: doc.name, error: err.message })
        }
      }

      logger.info({ message: 'Default doctors seeding complete' })
    } catch (error) {
      logger.error({ message: 'Could not seed default doctors', error: error.message })
      throw error
    }
  }
}

export default seedDefaultDoctorsFactory
