module.exports = (sequelize, DataTypes) => {
    const Agentii = sequelize.define('Agentii', {
        agentieid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userid: {
            type: DataTypes.INTEGER
        },
        numeagentie: {
            type: DataTypes.STRING
        },
        nrtelagentie: {
            type: DataTypes.STRING
        },
        nrmasini: {
            type: DataTypes.STRING
        },
        nratv: {
            type: DataTypes.STRING
        },
        nrmotociclete: {
            type: DataTypes.STRING
        },
        localitate: {
            type: DataTypes.STRING
        },
        adresa: {
            type: DataTypes.STRING
        },
        ghidid: {
            type: DataTypes.INTEGER,
            references: {
                model: 'ghizi',
                key: 'ghidid'
            }
        }
    }, {
        timestamps: false,
        tableName: 'agentii'
    });
    return Agentii;
}

