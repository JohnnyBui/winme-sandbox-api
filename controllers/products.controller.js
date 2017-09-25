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

  // add created date to product
  req.body.createdAt = (new Date()).toJSON();
  req.body.updatedAt = (new Date()).toJSON();

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
    _id: 1,
    name: 'iPhone 7 Plus 128GB Red',
    sku: 'iphone-7-plus-128gb-red',
    shortDesc: 'iPhone 7 Plus 128GB Red',
    longDesc: '',
    price: 25190000,
    category_id: 1,
    status: 0,
    totalTickets: 100,
    joinedTickets: 98,
    ticketPrice: 10000,
    maxTickets: 5,
    isHotProduct: true,
    isVoucherProduct: false,
    isEventProduct: false,
    brand_id: 1,
    supplier_id: 1,
    region: 10,
    productImages: [
      {
        bigImageUrl: "https://static.winme.vn/images/products/47_1VYC21QB.jpg",
        thumbUrl: "https://static.winme.vn/images/products/47_1VYC21QB.jpg"
      }
    ],
    productThumbUrl: "https://static.winme.vn/images/products/47_1VYC21QB.jpg",
    createdAt: (new Date()).toJSON(),
    updatedAt: (new Date()).toJSON()
  }

  homeProducts.almostDrawProducts = [];
  for (var i = 0; i < 8; i++) {
    homeProducts.almostDrawProducts.push(almostDrawProduct);
  }

  homeProducts.hotProducts = _.filter(products, {
    'isHotProduct': true
  });

  homeProducts.newProducts = products;

  return res.json(homeProducts);
}