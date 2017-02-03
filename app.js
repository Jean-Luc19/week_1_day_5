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

    removeTask: function (task) {

    },

    renderList: function (state) {
        var tasksHTML = this.buildList(state.tasks);
        var shoppingList = $('.shopping-list');
        shoppingList.empty();
        tasksHTML.forEach(function(currentTask){
            shoppingList.append(`<li>${currentTask}${listItemEnd}`);
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
    }
}


$('#js-shopping-list-form').on('click', 'button', function (e) {
    e.preventDefault();
    var userInput = $('#shopping-list-entry').val();
    state.addTask(userInput);
    $('#shopping-list-entry').val("");
});

$('ul').on('click', '.shopping-item-toggle', function (e) {
    console.log($(this).parent().prev().text());
});

$(function() {
    state.renderList(state);
});
