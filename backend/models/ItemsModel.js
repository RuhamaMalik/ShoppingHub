module.exports = (sequelize, DataTypes, Model) => {
    class Item extends Model { }

    Item.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pprice: {
            type: DataTypes.DECIMAL(10, 4),
            allowNull: false
        },
        pdescription: {
            type: DataTypes.TEXT
        },
        pimage: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }

        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Categories',
                key: 'id'
            }

        }
    }, {
        sequelize,
        modelName: 'Item'
    });
    Item.associate = (models) => {
        Item.belongsTo(models.Category, {
            foreignKey: 'categoryId',
            as: 'category',
        });
        Item.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
    };

 
    return Item;
}
