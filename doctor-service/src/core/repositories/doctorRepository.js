function doctorRepositoryFactory ({ postgresDatabase }) {
  const { Doctors } = postgresDatabase.sequelize.models

  async function create ({ params }) {
    try {
      return await Doctors.create(params)
    } catch (error) {
      throw new Error(error.message || 'Failed to create doctor')
    }
  }

  async function findOneById ({ id }) {
    try {
      return await Doctors.findOne({
        where: {
          id,
        },
      })
    } catch (error) {
      throw new Error(error.message || 'Failed to find doctor by ID')
    }
  }

  async function findOneByEmail ({ email }) {
    try {
      return await Doctors.findOne({
        where: {
          email,
        },
      })
    } catch (error) {
      throw new Error(error.message || 'Failed to find doctor by email')
    }
  }

  async function list () {
    try {
      return await Doctors.findAll({ order: [['id', 'ASC']] })
    } catch (error) {
      throw new Error(error.message || 'Failed to list doctors')
    }
  }

  return {
    create,
    findOneById,
    findOneByEmail,
    list,
  }
}

export default doctorRepositoryFactory
