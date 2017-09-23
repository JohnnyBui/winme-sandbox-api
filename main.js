var UsersController = require('./controllers/users.controller');
var ProductsController = require('./controllers/products.controller');

/** Home route respond */
Sandbox.define('/', 'GET', function(req, res){
    res.type('text/html');
    res.status(200);
    res.send('<h1>It works!</h1>');
})

/** Users Routes */
Sandbox.define('/users', 'GET', UsersController.getUsers);
Sandbox.define('/users/:id', 'GET', UsersController.getUserById);
Sandbox.define('/users', 'POST', UsersController.createUser);

/** Product Routes */
Sandbox.define('/products', 'POST', ProductsController.createProduct);
Sandbox.define('/products', 'GET', ProductsController.getProducts);
Sandbox.define('/products/home-products', 'GET', ProductsController.getProductsForHome);
