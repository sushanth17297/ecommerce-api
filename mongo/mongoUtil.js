const { response } = require('express');
const eCart = require('./config/mongooseConfig');
var mainResponse = {};
function getAvailId(req){
    let min = 1;
    let ids = [];
    for (const key in req){
        ids.push(req[key]._id);
    }
    ids.sort();
    for (const k in ids){
        if (ids[k] == min){
            min++;
        }
        else{
            break;
        }
    }
    return min;
}



module.exports.getProducts = async (req, res) => {
    console.log("entered get Products");
    if (Object.getOwnPropertyNames(req.query).length === 0){
        const allProducts = await eCart.find();
        let outputRes = [];
        mainResponse.data = {};
        for (const key in allProducts) {
            outputRes.push({
                id: allProducts[key]._id,
                name: allProducts[key].name,
                quantity: allProducts[key].quantity,
            });
        }
        mainResponse.data.product = outputRes;
        res.send(mainResponse);
        console.log('All Products:', allProducts);
    }
    
}

module.exports.createProduct = async (req, res) => {
    try {
        const allProducts = await eCart.find();
        var parsedData = {};
        parsedData._id = getAvailId(allProducts);
        parsedData.name = req.body.product.name;
        parsedData.quantity = req.body.product.quantity;
        console.log("req data ", parsedData);
        let formData = new eCart(parsedData);
        await formData.save().then(savedProduct => {
            console.log('Product saved:', savedProduct);
            mainResponse.data = {};
            mainResponse.data.product = parsedData;
            res.send(mainResponse);
        })
        .catch(error => {
            console.error('Error saving product:', error);
        });
      } catch (error) {
        console.error('Error parsing JSON:', error);
        res.status(400).send('Invalid JSON data');
      }
    
}

module.exports.updateProduct = async (req, res) => {
    console.log("entered update Products");
    const filter = {_id: req.params.id};
    let updateProd = await eCart.findOne(filter);
    updateProd.quantity = updateProd.quantity + Number(req.query.number);
    delete updateProd._id;
    delete updateProd.__V;
    console.log("path param", updateProd._doc);
    const result = await eCart.updateOne(filter, updateProd);
    if (result.modifiedCount === 1) {
        console.log('Product updated successfully');
        mainResponse = {
            'data': {
                'product': {
                'id': updateProd._id,
                'name': updateProd.name,
                'quantity': updateProd.quantity
                },
                'message': 'updated successfully'
                }
        };
      } else {
        mainResponse = {
            'data': {
                'message': 'Product not found or no changes made'
            }
        }
        console.log('Product not found or no changes made');
      }
    res.send(mainResponse);
}

module.exports.deleteProduct = async (req, res) => {
    console.log("entered update Products");
    const condition = { _id: req.params.id };

    const result = await eCart.deleteOne(condition);
    if (result.deletedCount === 1) {
        mainResponse.data = {
            'message': 'product deleted'
        }
    } else {
      console.log('product not found or not deleted');
      mainResponse.data = {
        'message': 'product id not available'
    }
    }
    res.send(mainResponse);
}