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

    tasks: [
    ],

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
        state.renderTaskCount();
    },

    deleteAllCompletedTasks: function() {
      state.tasks.forEach(function(task, index) {
        if (task.completed) {
          state.tasks.splice(index, 1);
        }
      });
    },

    checkAllTasks: function() {
      state.tasks.forEach(function(task) {
        if (!task.completed) {
          task.completed = true;
        }
      });
    },

    deleteAllTasks: function() {
      state.tasks.length = 0;
    },

    renderTaskCount: function() {
      $('.container h3 span').text(state.taskCount());
    },

    taskCount: function() {
      return state.tasks.length
    },
}

function initializeEventHandelers() {
  
  $('#js-shopping-list-form').on('click', 'button[type="submit"]', function (e) {
      e.preventDefault();
      var userInput = $('#shopping-list-entry').val();
      state.addTask(userInput);
      $('#shopping-list-entry').val("");
  });

  $('#js-shopping-list-form').on('click', '.delete-all-items', function (e) {
      e.preventDefault();
      state.deleteAllTasks();
      state.renderList(state);
  });

  $('footer').on('click', '.delete-completed-items', function (e) {
      e.preventDefault();
      state.deleteAllCompletedTasks();
      state.renderList(state);
  });

  $('footer').on('click', '.check-all-items', function (e) {
      e.preventDefault();
      state.checkAllTasks();
      state.renderList(state);
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

$(function() {
    state.renderList(state);
    initializeEventHandelers();
});
