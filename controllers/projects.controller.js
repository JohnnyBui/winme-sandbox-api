var WorkLogsController = require('./workLogs.controller');

/** Create new Project */
exports.createProject = function (req, res) {
  // retrieve projects or, if there are none init, to empty array
  state.projects = state.projects || [];

  // validate required data
  if (req.body.name === undefined || req.body.budget === undefined || req.body.budgetType === undefined) {
    return res.json(400, { status: 'error', details: 'Missing project data' });
  }

  // add id to project before pushing to state
  if (state.projects.length === 0) {
    req.body.id = 1;
  } else {
    req.body.id = state.projects[state.projects.length - 1].id + 1;
  }

  state.projects.push(req.body);

  return res.json({
    status: 'ok',
    data: req.body
  });
}

/** Return all Projects */
exports.getProjects = function (req, res) {
  // retrieve projects or, if there are none init, to empty array
  state.projects = state.projects || [];
  var projects = _.cloneDeep(state.projects);

  // remove timesheets before returning
  _.forEach(projects, function (project) {
    _.forEach(project.members, function (member) {
      delete member.timesheets;
    });
  });

  return res.json(projects);
}

/** Return Project by id */
exports.getProjectById = function (req, res) {
  // retrieve projects or, if there are none init, to empty array
  state.projects = state.projects || [];
  var projects = _.cloneDeep(state.projects);

  var id = req.params.id;

  // use lodash to find the project in the array
  var project = _.find(state.projects, {
    'id': parseInt(id, 10)
  });

  // include user object in each member object
  _.forEach(project.members, function (member) {
    member.user = _.find(state.users, {
      'id': parseInt(member.userId, 10)
    });

    WorkLogsController.expandTimesheets(member, project);
  });

  return res.json(project);
}

/** Add Member to Project */
exports.addMember = function (req, res) {
  var projectId = req.params.id;

  // find project
  var project = _.find(state.projects, {
    'id': parseInt(projectId, 10)
  });
  if (!project) {
    return res.json(404, { status: 'error', details: 'Project not found' });
  }

  // validate required data
  if (req.body.userId === undefined || req.body.role === undefined || req.body.rate === undefined) {
    return res.json(400, { status: 'error', details: 'Missing member data' });
  }

  // retrieve members or, if there are none init, to empty array
  project.members = project.members || [];

  // add id to member before pushing to state
  if (project.members.length === 0) {
    req.body.id = 1;
  } else {
    req.body.id = project.members[project.members.length - 1].id + 1;
  }

  project.members.push(req.body);

  return res.json({
    status: 'ok',
    data: req.body
  });
}

/** Add Task to Project */
exports.addTask = function (req, res) {
  var projectId = req.params.id;

  // find project
  var project = _.find(state.projects, {
    'id': parseInt(projectId, 10)
  });
  if (!project) {
    return res.json(404, { status: 'error', details: 'Project not found' });
  }

  // validate required data
  if (req.body.title === undefined || req.body.text === undefined) {
    return res.json(400, { status: 'error', details: 'Missing task data' });
  }

  // retrieve tasks or, if there are none init, to empty array
  project.tasks = project.tasks || [];

  // add id to task before pushing to state
  if (project.tasks.length === 0) {
    req.body.id = 1;
  } else {
    req.body.id = project.tasks[project.tasks.length - 1].id + 1;
  }

  project.tasks.push(req.body);

  return res.json({
    status: 'ok',
    data: req.body
  });
}