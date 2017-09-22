/** Add Manual Time to Timesheet */
exports.addManualTime = function (req, res) {
  var projectId = req.params.projectId;
  var memberId = req.params.memberId;
  var taskId = req.query.taskId;

  // find project & member
  var project = _.find(state.projects, {
    'id': parseInt(projectId, 10)
  });
  if (!project) {
    return res.json(404, { status: 'error', details: 'Project not found' });
  }

  var member = _.find(project.members, {
    'id': parseInt(memberId, 10)
  });
  if (!member) {
    return res.json(404, { status: 'error', details: 'Member not found' });
  }

  // check task id
  if (!taskId || taskId === '') {
    return res.json(400, { status: 'error', details: 'Missing taskId (query)' });
  }
  var task = _.find(project.tasks, {
    'id': parseInt(taskId, 10)
  });
  if (!task) {
    return res.json(404, { status: 'error', details: 'Task not found' });
  }

  // validate required data
  if (req.body.date === undefined || req.body.timeLogged === undefined) {
    return res.json(400, { status: 'error', details: 'Missing task log data' });
  }

  // retrieve timesheet or, if there are none init, to empty array
  member.timesheets = member.timesheets || [];

  req.body.createdAt = moment().unix();
  req.body.modifiedAt = moment().unix();

  // check if this task has timesheet or not
  var timesheet = _.find(member.timesheets, {
    'taskId': parseInt(taskId, 10)
  });
  if (timesheet) { // push new taskLog in the exist timesheet
    timesheet.taskLogs = timesheet.taskLogs || [];
    timesheet.taskLogs.push(req.body);
  } else { // else create new timesheet
    timesheet = {
      taskId: parseInt(taskId, 10),
      taskLogs: [req.body]
    };
    member.timesheets.push(timesheet);
  }

  return res.json({
    status: 'ok',
    data: timesheet
  });
}

/** Get Member's Timesheet */
exports.getTimesheets = function (req, res) {
  var projectId = req.params.projectId;
  var memberId = req.params.memberId;

  // find project & member
  state.projects = state.projects || [];
  var projects = _.cloneDeep(state.projects);
  var project = _.find(projects, {
    'id': parseInt(projectId, 10)
  });
  if (!project) {
    return res.json(404, { status: 'error', details: 'Project not found' });
  }
  var member = _.find(project.members, {
    'id': parseInt(memberId, 10)
  });
  if (!member) {
    return res.json(404, { status: 'error', details: 'Member not found' });
  }

  // retrieve timesheets or, if there are none init, to empty array
  member.timesheets = member.timesheets || [];

  exports.expandTimesheets(member, project);

  return res.json(member.timesheets);
}

/** Shared functions */
exports.expandTimesheets = function (member, project) {
  // calculate totals & expand task objects
  _.forEach(member.timesheets, function (timesheet) {
    timesheet.totalTime = _.sumBy(timesheet.taskLogs, function (taskLog) {
      return taskLog.timeLogged;
    });

    // total cost
    timesheet.totalCost = _.round(timesheet.totalTime * member.rate / 3600, 2);

    // expand task object
    timesheet.task = _.find(project.tasks, {
      'id': parseInt(timesheet.taskId, 10)
    });
  });
}