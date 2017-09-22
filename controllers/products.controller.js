/** Create new Product */
exports.createProduct = function (req, res) {
  // retrieve products or, if there are none init, to empty array
  state.products = state.products || [];

  // validate required data
  if (req.body.name === undefined || req.body.sku === undefined || req.body.totalTickets === undefined ||
    req.body.category_id === undefined || req.body.ticketPrice === undefined || req.body.maxTickets === undefined) {
    return res.json(400, { status: 'error', details: 'Missing product data' });
  }

  // add id to product before pushing to state
  if (state.products.length === 0) {
    req.body._id = 1;
  } else {
    req.body._id = state.products[state.products.length - 1]._id + 1;
  }

  state.products.push(req.body);

  return res.json({
    status: 'ok',
    data: req.body
  });
}

/** Return all Products */
exports.getProducts = function (req, res) {
  // retrieve products or, if there are none init, to empty array
  state.products = state.products || [];
  var products = _.cloneDeep(state.products);

  return res.json(products);
}

/** Return Products for Home page */
exports.getProductsForHome = function (req, res) {
  // retrieve products or, if there are none init, to empty array
  state.products = state.products || [];
  var products = _.cloneDeep(state.products);
  var homeProducts = {};

  var almostDrawProduct = {
    name: 'iPhone 7 Plus 128GB Red',
    sku: 'iphone-7-plus-128gb-red',
    shortDesc: 'iPhone 7 Plus 128GB Red',
    longDesc: '',
    price: 25190000,
    category_id: 1,
    status: 0,
    totalTickets: Number,
    joinedTickets: Number,
    isHotProduct: Boolean,
    isVoucherProduct: Boolean,
    isEventProduct: Boolean,
    brand_id: {type: Schema.ObjectId , ref: 'Brand' },
    supplier_id: {type: Schema.ObjectId , ref: 'Supplier' },
    region: Number,
    productImages: {
      mainImageUrl: String,
      thumbImages: Object,
    },
    createdAt: Date.now,
    updatedAt: Date.now
  }

  homeProducts.almostDraw = [
    {

    }
  ]

  return res.json(products);
}