var UserController = require('./controllers/users.controller');
var ProjectController = require('./controllers/projects.controller');
var WorkLogsController = require('./controllers/workLogs.controller');

/** Home route respond */
Sandbox.define('/', 'GET', function(req, res){
    res.type('text/html');
    res.status(200);
    res.send('<h1>It works1!</h1>');
})

/** Utility */
Sandbox.define('/clearTimesheets', 'GET', function (req, res) {
  delete state.timesheets;
  res.send('ok');
});

/** Users Routes */
Sandbox.define('/users', 'GET', UserController.getUsers);
Sandbox.define('/users/:id', 'GET', UserController.getUserById);
Sandbox.define('/users', 'POST', UserController.createUser);

/** Projects Routes */
Sandbox.define('/projects', 'POST', ProjectController.createProject);
Sandbox.define('/projects', 'GET', ProjectController.getProjects);
Sandbox.define('/projects/:id', 'GET', ProjectController.getProjectById);
Sandbox.define('/projects/:id/add-member', 'POST', ProjectController.addMember);
Sandbox.define('/projects/:id/add-task', 'POST', ProjectController.addTask);

/** WorkLog Routes  */
Sandbox.define('/projects/:projectId/members/:memberId/add-manual-time', 'POST', WorkLogsController.addManualTime);
Sandbox.define('/projects/:projectId/members/:memberId/timesheets', 'GET', WorkLogsController.getTimesheets);