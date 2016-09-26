import TaskActions from '../action/TaskActions';
import $ from 'jquery';
import moment from 'moment';

const WebAPIUtils = {
  getUserTasks() {
    let monthId = '' + moment().year() + moment().month();
    $.ajax({
      url: '/api/usertasks/'+monthId,
      type: 'GET'
    })
      .done(function(data) {
        TaskActions.updateTasks(data);
      })
  },

  getUserTasksByMonthId(monthId) {
    let self = this;
    $.ajax({
      url: '/api/usertasks/'+monthId,
      type: 'GET'
    })
      .done(function(data) {
        TaskActions.updateTasks(data);
      })
  },

  addNewTask(task) {
    let self = this;
    console.log(task)
    $.ajax({
      url: '/api/addnewtask',
      type: 'POST',
      data: {
        task
      }
    })
    .done(function(data) {
      if (data.message === 'SAVED') {
        self.getUserTasks();
      }
    })
  },

  changeTaskStatus(index, status, id, monthId) {
    let self = this;
    $.ajax({
      url: '/api/taskstatus/'+id,
      type: 'PUT',
      data: {
        index,
        status
      }
    })
    .done(function(data) {
      if (data.message === 'SAVED') {
        self.getUserTasksByMonthId(monthId);
      }
    })
  },

  saveTask(oldtask, newtask) {
    let self = this;
    $.ajax({
      url: '/api/editTask',
      type: 'POST',
      data: {
        oldtask,
        newtask
      }
    })
    .done((res) => {
      if (res === 'SAVED') {
        console.log('SAVED');
        self.getUserTasks();
      }
    })
  },

  deleteTask(id) {
    let self = this;
    $.ajax({
      url: '/api/deleteTask',
      type: 'DELETE',
      data: {
        id
      }
    })
    .done(res => {
      if (res === 'SAVED') {
        self.getUserTasks();
      }
    })
  },

  finishTask(id) {
    let self = this;
    $.ajax({
      url: '/api/finishTask',
      type: 'PUT',
      data: {
        id
      }
    })
    .done (res => {
      if (res === 'SAVED') {
        self.getUserTasks();
        self.getFinishedTask;
      }
    })
  },

  getFinishedTask() {
    let self = this;
    $.ajax({
      url: '/api/getFinishedTasks',
      type: 'GET',
    })
    .done ( tasks => {
      console.log(tasks,'finished')
      TaskActions.updateFinishedTasks(tasks);
    })
  },

  manageGetPendingTasks() {
    console.log('pending')
    $.ajax({
      url: '/api/manageGetPendingTasks',
      type: 'GET'
    })
    .done((data) => {
      console.log(data);
    })
  },
}

export default WebAPIUtils;