const db = require("../models/config");
const { Op } = require("sequelize");
const Category = db.categories;
const Product = db.products;
const path = require("path");
const fs = require("fs");
const url = require("url");

const baseUrl = "http://localhost:5000";
const uploadUrl = url.resolve(baseUrl, "/uploads");

const uploadFolder = path.join(__dirname, "../uploads");

const addCategory = async (req, res) => {
  fs.readdir(uploadFolder, async (err, files) => {
    if (err) {
      console.error("Error reading upload folder:", err);
      return;
    }

    let image = req.file.filename;
    try {
      const { cname } = req.body;
      if (!cname) {
        return res.status(400).send("Category name is required");
      }

      // category exist
      const existingCategory = await Category.findOne({ where: { cname } });
      if (existingCategory) {
        return res.status(400).send("Category with this name already exists");
      }

      const category = await Category.create({ cname, image });

      res.status(201).json({ success: true, category });
    } catch (error) {
      console.error("Error adding category:", error);
      res.status(500).send("Internal server error");
    }
  });
};

// get all categories

const getAllCategories = async (req, res) => {
  try {
    const getCategories = await Category.findAll();

    const categoryPromises = getCategories.map(async (category) => {
      const products = await Product.findAll({
        where: {
          categoryId: category.id,
        },
      });

      return {
        ...category.toJSON(),
        imagePath: uploadUrl + "/" + category.image,
        products,
      };
    });

    const categories = await Promise.all(categoryPromises);

    res.status(200).json({ categories, success: true });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// search Category

const searchCategory = async (req, res) => {
  try {
    const searchKey = req.body.searchKey;
    const searchTerm = req.body.searchValue;

    if (!searchKey || !searchTerm) {
      return res
        .status(400)
        .json({ message: "Search key and search value are required" });
    }

    let categories;
    if (searchKey === "createdAt" || searchKey === "updatedAt") {
      // parse date
      const searchDate = new Date(searchTerm);

      categories = await Category.findAll({
        where: {
          [searchKey]: {
            [Op.between]: [
              searchDate,
              new Date(searchDate.getTime() + 86400000),
            ], // track fulll day
          },
        },
      });
    } else {
      categories = await Category.findAll({
        where: {
            [searchKey]: {
                [Op.like]: `%${searchTerm}%`
            }
        },
      });
    }

    if (categories.length === 0) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    const formattedCategories = categories.map((category) => ({
      ...category.toJSON(),
      imagePath: uploadUrl + "/" + category.image,
    }));

    res
      .status(200)
      .json({
        success: true,
        categories: formattedCategories,
        message: "Filtered Successfully",
      });
  } catch (error) {
    console.error("Error fetching search categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get category by id

const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ category, success: true });
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// if (!cname) {
//     return res.status(400).json({ message: 'Name field is required!' });
// }

// //  if another category with the same cname already exists

// const existingCategory = await Category.findOne({ where: { cname } });
// if (existingCategory && existingCategory.id !== categoryId) {
//     return res.status(400).json({ message: 'Another category with the same name already exists!' });
// }

// update category
// const updateCategoryById = async (req, res) => {
//     console.log(req.body, req.file);
//     // console.log(req.body.cname);
//     try {
//         const { cname } = req.body;
//         const categoryId = req.params.id;
//         const category = await Category.findByPk(categoryId);

//         if (!category) {
//             return res.status(404).json({ message: 'Category not found!' });
//         }

//             await Category.update({ cname }, { where: { id: categoryId } });

//         // console.log('Category updated successfully!');
//         res.status(200).send({ message: 'Category updated successfully!', success: true });
//     } catch (error) {
//         console.error('Error updating category:', error);
//         res.status(500).json({ message: 'Internal server error', success: false });
//     }
// };

const updateCategoryById = async (req, res) => {
  // console.log(req.body);
  try {
    const { cname } = req.body;
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found!" });
    }

    // const existingCategory = await Category.findOne({ where: { cname } });
    // if (existingCategory && existingCategory.id !== categoryId) {
    //     return res.status(400).json({ message: 'Another category with the same name already exists!' });
    // }

    //     update name
    await Category.update({ cname }, { where: { id: categoryId } });

    // update image
    if (req.file) {
      fs.readdir(uploadFolder, async (err, files) => {
        if (category.image) {
          const imagePath = path.join(
            __dirname,
            `../uploads/${category.image}`
          );
          fs.unlinkSync(imagePath);
        }
        if (err) {
          console.error("Error reading upload folder:", err);
          return;
        }

        let newImageName = req.file.filename;
        await Category.update(
          { image: newImageName },
          { where: { id: categoryId } }
        );
      });
    }

    return res
      .status(200)
      .json({ message: "Category updated successfully!", success: true });
  } catch (error) {
    console.error("Error updating category:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// delete category by id

const deleteCategoryById = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await Category.findByPk(categoryId);

    const products = await Product.findAll({
      where: { categoryId: categoryId },
    });

    // delete related products and  images
    for (const product of products) {
      const imagePath = path.join(__dirname, `../uploads/${product.pimage}`);
      fs.unlinkSync(imagePath);
      await product.destroy();
    }

    const imagePath = path.join(__dirname, `../uploads/${category.image}`);
    fs.unlinkSync(imagePath);

    const deletedCategory = await Category.destroy({
      where: { id: categoryId },
    });

    if (deletedCategory) {
      res
        .status(200)
        .json({
          message: "category and related products deleted successsfully",
          success: true,
        });
    } else {
      res.status(404).json({ message: "category not found", success: true });
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  searchCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
