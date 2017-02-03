var listItemEnd = '<div class="shopping-item-controls">' +
    '<button class="shopping-item-toggle">' +
    '<span class="button-label">check</span>' +
    '</button>' +
    '<button class="shopping-item-delete">' +
    '<span class="button-label">delete</span>' +
    '</button>' +
    '</div>' +
    '</li>';

var state = {

    tasks: [{taskText: "Ostracize my friends.", completed: true},{taskText: "Learn to code.", completed: false},{taskText: "????", completed: false}, {taskText: "Profit.", completed: false}],

    addTask: function(taskToAdd){
        this.tasks.push({taskText: taskToAdd, completed: false});
        this.renderList(state);
    },

    checkTask: function (string) {
      this.tasks.forEach(function(currentTask) {
        if (string === currentTask.taskText) {
          if (currentTask.completed) {
            currentTask.completed = false;
          } else {
            currentTask.completed = true;
          }
        }
      });
    },

    deleteTask: function (string) {
      this.tasks.forEach(function(currentTask, index) {
        if (string === currentTask.taskText) {
          state.tasks.splice(index, 1);
        }
      });
    },

    buildList: function (tasks) {
        var builtTasks = [];

        tasks.forEach(function (currentTask) {
            if (currentTask.completed) {
                builtTasks.push(`<span class="shopping-item shopping-item__checked">${currentTask.taskText}</span>`);
            } else {
                builtTasks.push(`<span class="shopping-item">${currentTask.taskText}</span>`);
            }
        });
        return builtTasks;
    },

    renderList: function (state) {
        var tasksHTML = this.buildList(state.tasks);
        var shoppingList = $('.shopping-list');
        shoppingList.empty();
        tasksHTML.forEach(function(currentTask){
            shoppingList.append(`<li>${currentTask}${listItemEnd}`);
        });
    },

    deleteAllCompletedTasks: function() {

    }
}

function initializeEventHandelers() {
  $('#js-shopping-list-form').on('click', 'button', function (e) {
      e.preventDefault();
      var userInput = $('#shopping-list-entry').val();
      state.addTask(userInput);
      $('#shopping-list-entry').val("");
  });

  $('ul').on('click', '.shopping-item-toggle', function (e) {
      state.checkTask($(this).parent().prev().text());
      state.renderList(state);

  });

  $('ul').on('click', '.shopping-item-delete', function (e) {
      state.deleteTask($(this).parent().prev().text());
      state.renderList(state);

  });
}

// delete all completed tasks
// delete all tasks
// check all tasks
// 

$(function() {
    state.renderList(state);
    initializeEventHandelers();
});
