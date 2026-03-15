import modules from '../modules/index.js'
import doctorRepositoryFactory from './repositories/doctorRepository.js'
import affiliateDoctorFactory from './use-cases/affiliateDoctor.js'
import getDoctorFactory from './use-cases/getDoctor.js'
import listDoctorsFactory from './use-cases/listDoctors.js'
import seedDefaultDoctorsFactory from './seedDefaultDoctors.js'

const { postgresDatabase, logger } = modules

const doctorRepository = doctorRepositoryFactory({ postgresDatabase })

const affiliateDoctor = affiliateDoctorFactory({ doctorRepository })
const getDoctor = getDoctorFactory({ doctorRepository })
const listDoctors = listDoctorsFactory({ doctorRepository })
const seedDefaultDoctors = seedDefaultDoctorsFactory({ doctorRepository, logger })

export default {
  affiliateDoctor,
  getDoctor,
  listDoctors,
  seedDefaultDoctors,
}
