const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

exports.getProductById = (req, res, next, id) => {

    Product.findById(id).populate('category').exec((err, product) => {
        if (err) {
            return res.status(400).json({
                error: "Product Not Found in DB"
            });
        }

        req.product = product;
        next();
    });
};

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Problem With Image"
            });
        }

        // Destructure The Fields
        const { price, name, description, category, stock } = fields;

        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({
                error: "Please Include All Fields"
            });
        }

        let product = new Product(fields);

        // Handle File Here
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File Size Should be Less Than 2.8 MB"
                });
            }

            product.photo.data = fs.readFileSync(file.photo.filepath);
            product.photo.contentType = file.photo.mimetype;
        }

        // Save To The DB
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Saving Product in DB Failed"
                });
            }

            return res.json(product);
        });
    });

};

exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

// Middleware
exports.photo = (req, res, next) => {
    if(req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        res.send(req.product.photo.data);
    }

    next();
}

exports.deleteProduct = (req, res) => {
    let product = req.product;

    product.remove((err, deletedProduct) => {
        if(err) {
            return res.status(400).json({
                error: `Failed To Delete Product ${product.name}`
            });
        }

        return res.json({
            message: "Deletion was a Success",
            deletedProduct
        });

    })

}

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Problem With Image"
            });
        }

        // Updation Code
        let product = req.product;
        product = _.extend(product, fields);

        // Handle File Here
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File Size Should be Less Than 2.8 MB"
                });
            }

            product.photo.data = fs.readFileSync(file.photo.filepath);
            product.photo.contentType = file.photo.mimetype;
        }

        // Save To The DB
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Updation of Product in DB Failed"
                });
            }

            return res.json(product);
        });
    });

}

// Product Listing
exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';

    Product.find()
    .select("-photo")
    .populate('category')
    .sort([[sortBy, 'ascending']])
    .limit(limit)
    .exec((err, products) => {
        if(err) {
            return res.status(400).json({
                error: "NO Products Found"
            });
        }

        return res.json(products);
    })
}

exports.updateStock = (req, res, next) => {

    let myOperations = req.body.order.products.map(product => {
        return {
            updateOne: {
                filter: {_id: product._id},
                update: {$inc: {stock: -product.count, sold: +product.count}}
            }
        }
    });

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if(err) {
            return res.status(400).json({
                error: "Bulk Operation Failed"
            });
        }

        next();
    });

}

exports.getAllUniqueCategories = (req, res) => {
    
    Product.distinct('category', {}, (err, category) => {
        if(err) {
            return res.status(400).json({
                error: "No Category Found"
            });
        }

        return res.json(category);
    });

}