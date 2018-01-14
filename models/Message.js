
'use strict'

module.exports = function(sequelize, DataTypes) {

  const Message = sequelize.define('Message', {

    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    body: {
      type: DataTypes.TEXT
    }

  }, {

    // explicitly tell sequelize what the name of the table will be
    tableName: 'messages'

  })

  Message.associate = function (models) {
    Message.belongsTo(models.Conversation)
    Message.belongsTo(models.User)
  }

  return Message

}
