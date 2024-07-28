const { Sequelize, DataTypes, Model } = require("sequelize");

// configure database
const sequelize = new Sequelize("shopping-hub", "root", "", {
  host: "localhost",
  logging: false,
  dialect: "mysql",
});

// check db connection
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel")(sequelize, DataTypes, Model);
db.categories = require("./categoryModel")(sequelize, DataTypes, Model);
db.products = require("./ItemsModel")(sequelize, DataTypes, Model);

// db.products = require('./productModel')(sequelize, DataTypes, Model)

// const User = require('./userModel')(sequelize, DataTypes, Model);
// // const Products = require('./productModel')(sequelize, DataTypes, Model);
// const Category = require('./categoryModel')(sequelize, DataTypes, Model);
// const Item = require('./ItemsModel')(sequelize, DataTypes, Model);

// Define associations
// User.hasMany(db.products);
// Product.belongsTo(Product);

// db.users.hasOne(db.products, { foreignKey: 'userId' , as : 'user', allowNull: false })
// db.products.belongsTo(db.users)

// db.categories.hasOne(db.products, { foreignKey: 'categoryId', allowNull: false })
// db.products.belongsTo(db.categories)

db.sequelize.sync({ force: false });
module.exports = db;
