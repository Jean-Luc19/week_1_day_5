  

  var state = {

    tasks: [ { task: 'apple', completed: false },
             { task: 'oranges', completed: false },
             { task: 'milk', completed: true } 
            ],

    removeTask: function(task) {

    },

    renderList: function(tasks) {
      var shoppingList = $('.shopping-list');
      var listItem = '<li>';
      tasks.forEach(function(current) {
        listItem += '<span class="shopping-item">' + current.task + '</span>' + listItemEnd;

      });
      shoppingList.append(listItem);

    }


  }


  $('#js-shopping-list-form').on('click', 'button', function(e) {
    e.preventDefault();
    var userInput = $('#shopping-list-entry').val();
  });




  var listItemEnd = '<div class="shopping-item-controls">' +
          '<button class="shopping-item-toggle">' +
            '<span class="button-label">check</span>' +
          '</button>' +
          '<button class="shopping-item-delete">' +
            '<span class="button-label">delete</span>' +
          '</button>' +
        '</div>' +
      '</li>';









$(function() {
  state.renderList(state.tasks);



});