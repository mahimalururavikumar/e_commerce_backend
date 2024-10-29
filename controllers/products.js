const productModel = require('../models/products-model');
const ownerModel = require('../models/owner-model'); 

module.exports.createProduct = async (req, res) => {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    let image = req.file ? req.file.filename : null;
    
    try {
        let createdProduct = await productModel.create({
            name,
            price,
            image,
            discount,
            bgcolor,   
            panelcolor,
            textcolor
        });

        const id = req.owner;
        let owner = await ownerModel.findOne({_id:id}); 
        
        if (owner) {
            owner.products.push(createdProduct._id);
            await owner.save(); 
            req.flash('success', 'Successfully created a product');
            res.redirect('/owner/addproduct');
        } else {
            req.flash('error', 'Owner not found');
            res.redirect('/owner/addproduct');
        }
    } catch (error) {
        console.error(error);
        req.flash('error', 'Something went wrong while creating a product');
        res.redirect('/owner/addproduct');
    }
};

module.exports.discountedProduct =  async (req, res) => {
    try {
      let products = await productModel
        .find({ discount: { $gt: 0 } })
        .sort({ discount: -1 })
        .limit(10);
  
      if (products.length === 0) {
        req.flash("error", "Sorry no products with dicount right now");
        console.log("Sorry no products with dicount right now");
        res.redirect("/shop");
      }
  
      res.render("Topdicountedproducts", { products });
    } catch (error) {
      req.flash("error", "Failed to load discounted products");
      console.log("Error Fecthing the products");
      res.redirect("/shop");
    }
}


module.exports.filteredProducts = async (req, res) => {
    try {
      const { availability, discount } = req.query;
  
      let filter = {};
  
      if (availability) {
        filter.stock = availability === "true";
        console.log(filter.stock);
      }
  
      if (discount) {
        const discountValue = parseInt(discount);
        if (discountValue > 0) {
          filter.discount = { $gte: discountValue };
          console.log(filter.discount);
        }
      }
  
      console.log(filter);
      const products = await productModel.find(filter);
      res.render("filtered-items", { products });
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      req.flash("error", "Failed to load filtered products");
      res.redirect("/shop");
    }
}


module.exports.orderByPrice =  async (req, res) => {
    try {
      let sortBy = req.query.sortby;
      let products;
  
      console.log(sortBy);
  
      if (sortBy === "price_low_high") {
        products = await productModel.find().sort({ price: 1 });
      } else if (sortBy === "price_high_low") {
        products = await productModel.find().sort({ price: -1 });
      } else {
        products = await productModel.find();
      }
  
      res.render("filtered-items", { products });
    } catch (error) {
      console.log("Error fetching the products", error);
      res.redirect("/shop");
    }
}

module.exports.outOfStock =  async (req, res) => {
    try {
        await productModel.findByIdAndUpdate(req.params.id, { stock: false });
        res.redirect('/owner/admin'); 
    } catch (error) {
        console.error('Error updating stock status:', error);
        res.redirect('/owner/admin'); 
    }
}

module.exports.addToStock =  async (req, res) => {
    try {
        await productModel.findByIdAndUpdate(req.params.id, { stock: true });
        res.redirect('/owner/admin'); 
    } catch (error) {
        console.error('Error updating stock status:', error);
        res.redirect('/owner/admin'); 
    }
}

module.exports.deleteProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id);
        res.redirect('/owner/admin'); 
    } catch (error) {
        console.error('Error deleting product:', error);
        res.redirect('/owner/admin'); 
    }
  }