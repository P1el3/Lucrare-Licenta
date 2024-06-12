module.exports = (sequelize, DataTypes) => {
    const Ghizi = sequelize.define('Ghizi', {
        ghidid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numeghid: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false,
        tableName: 'ghizi'
    });
    return Ghizi;
}

