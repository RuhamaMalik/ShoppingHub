
module.exports = async (sequelize, DataTypes, Model) => {
    // class Product extends Model {
    //     // static associate(models) {
    //     //     console.log(models);
    //     //     // Define associations here
    //     //     models.User.hasMany( models.Product);
    //     //     models.Product.belongsTo(models.User);

    //     // }
    // }
    class Products extends Model { }
    Products.init({
        productId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 4),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }

        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Products'
    });
    // Products.associate = (models) => {
    //     Products.belongsTo(models.User, {
    //         foreignKey: 'userId',
    //         as : 'user',
    //     });
    // };


    return Products;
}

