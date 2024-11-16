module.exports =  (sequelize, DataTypes,Model) => {
    class Category extends Model { }
    Category.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cname: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        // modelName: 'Category'
        modelName: 'category'
    });
    Category.associate = (models) => {
        Category.hasMany(models.Item, {  foreignKey: 'categoryId' });
    };

    return Category;
};
