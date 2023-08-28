const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "subscriptions",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      fechaAlta: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fechaBaja: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
};
