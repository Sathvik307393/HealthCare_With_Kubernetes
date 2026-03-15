const tableName = 'Doctors'

module.exports = {
  up(queryInterface, DataTypes) {
    return Promise.all([
      queryInterface.addColumn(tableName, 'email', {
        type: DataTypes.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn(tableName, 'field', {
        type: DataTypes.STRING,
        allowNull: true,
      }),
    ])
  },

  down(queryInterface) {
    return Promise.all([
      queryInterface.removeColumn(tableName, 'email'),
      queryInterface.removeColumn(tableName, 'field'),
    ])
  },
}
