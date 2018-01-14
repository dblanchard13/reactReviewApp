
'use strict'

module.exports = function(sequelize, DataTypes) {

  const Conversation = sequelize.define("Conversation", {

    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING
    }

  }, {

    // explicitly tell sequelize what the name of the table will be
    tableName: 'conversations'

  })

  Conversation.associate = function (models) {
    Conversation.hasMany(models.Message)
    Conversation.belongsToMany(models.User, {
      through: 'UserConversation'
    })
  }

  return Conversation

}
