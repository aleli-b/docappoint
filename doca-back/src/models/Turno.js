const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'turno',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            date: {
                type: DataTypes.STRING,
                allowNull: false
            },
            type: {
                type: DataTypes.ENUM('doctor', 'lab',),
                defaultValue: 'doctor',
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,                
                defaultValue: DataTypes.UUIDV4,
            },
            doctorId: {
                type: DataTypes.UUID,
                allowNull: true,                
            },
            labId: {
                type: DataTypes.UUID,
                allowNull: true,                
            },
        },
        {
            timestamps: false
        }
    );
};
