/** Return all Users */
exports.getUsers = function (req, res) {
  // retrieve users or, if there are none init, to empty array
  state.users = state.users || [];

  return res.json(state.users);
}

/** Return User by id */
exports.getUserById = function (req, res) {
  // retrieve users or, if there are none, init to empty array
  state.users = state.users || [];

  var _id = req.params.id;

  // use lodash to find the user in the array
  var user = _.find(state.users, {
    '_id': parseInt(_id, 10)
  });

  return res.json(user);
}

/** Create new User */
exports.createUser = function (req, res) {
  // retrieve users or, if there are none, init to empty array
  state.users = state.users || [];

  // validate required data
  if (req.body.fullName === undefined || req.body.role === undefined || req.body.email === undefined ||
    req.body.password === undefined) {
    return res.json(400, { status: 'error', details: 'Missing fullName, role, email, or password' });
  }

  // add id to user before pushing to state
  if (state.users.length === 0) {
    req.body._id = 1;
  } else {
    req.body._id = state.users[state.users.length - 1]._id + 1;
  }

  state.users.push(req.body);

  return res.json({
    status: 'ok',
    data: req.body
  });
}