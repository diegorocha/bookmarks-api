module.exports = (sequelize, DataType) => {
    const Bookmarks = sequelize.define("Bookmarks", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        url: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
    },
    {
        classMethods: {
            associate: (models) => {
                Bookmarks.belongsTo(models.Users);
            }
        }
    });
    return Bookmarks;
};
