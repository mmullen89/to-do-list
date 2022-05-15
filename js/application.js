var updateTaskList = function (element) {
  $('#toDoList').empty();
  taskArray = element["tasks"];

  console.log(taskArray);

  var sortedTasks = taskArray.sort(function (a, b) {
    return a['id'] - b['id'];
  });

  sortedTasks.forEach(function(item) {
    newTask = item["content"];
    newID = item["id"];
    console.log(item);
    if (item["completed"]) {
      $('#toDoList').append('<div class="listItem" data-id='+newID+'> <i class="fa-regular fa-circle-dot markComplete"></i> <span class="taskText completed">'+ newTask + '</span><i class="fa-solid fa-circle-minus removeButton"></i> </div>');
    }
    else {
      $('#toDoList').append('<div class="listItem" data-id='+newID+'> <i class="fa-regular fa-circle markComplete"></i> <span class="taskText">'+ newTask + '</span><i class="fa-solid fa-circle-minus removeButton"></i> </div>');
    }

  });
}

var updateTasks = function () {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=356',
    dataType: 'json',
    success: function (response, textStatus) {
      // response is a parsed JavaScript object instead of raw JSON
      updateTaskList(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var submitTask = function () {

  newTask = $('.newTaskInput').val();
  console.log(newTask);

  $.ajax({
    type: 'POST',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=356',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: newTask
      }
    }),
    success: function (response, textStatus) {
      console.log(response);
      updateTasks();
      $('.newTaskInput').val("");
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var deleteTask = function(id) {
  $.ajax({
    type: 'DELETE',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/'+id+'?api_key=356',
    success: function (response, textStatus) {
      console.log(response);
      updateTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var markComplete = function(id) {
  $.ajax({
    type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com//tasks/'+id+'/mark_complete?api_key=356',
    contentType: 'application/json',
    dataType: 'json',
    success: function (response, textStatus) {
      console.log(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var markActive = function(id) {
  $.ajax({
    type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com//tasks/'+id+'/mark_active?api_key=356',
    contentType: 'application/json',
    dataType: 'json',
    success: function (response, textStatus) {
      console.log(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var showActive = function () {
  var list = $('#toDoList').children('div');
  

  list.each(function (i, ele) {
    if ($(ele).children('span').hasClass('completed')) {
      console.log(ele);
      $(ele).hide();
    }
    else {
      $(ele).show();
    }
  });
}

var showCompleted = function () {
  var list = $('#toDoList').children('div');
  console.log(list);

  list.each(function (i, ele) {
    if (!($(ele).children('span').hasClass('completed'))) {
      console.log(ele);
      $(ele).hide();
    }
    else {
      $(ele).show();
    }
  });
}

var showAll = function () {
  var list = $('#toDoList').children('div');
  console.log(list);

  list.each(function (i, ele) {
      $(ele).show();
  });
}

$(document).ready(function () {

  updateTasks();
  
  $('.newEntry').on('submit', function (event) {
    event.preventDefault();
    submitTask();
  });

  $(document).on('click','.removeButton', function() {
    dataID = $(this).parent().attr('data-id');
    deleteTask(dataID);
  })

  $(document).on('click','.markComplete', function() {
    dataID = $(this).parent().attr('data-id');
    
    if ($(this).next().hasClass("completed")) {
      markActive(dataID);
      $(this).next().removeClass("completed");
      $(this).removeClass("fa-circle-dot");
      $(this).addClass("fa-circle");
    }
    else {
      markComplete(dataID);
      $(this).next().addClass("completed");
      $(this).removeClass("fa-circle");
      $(this).addClass("fa-circle-dot");
    }
  });

  $('#showActive').on('click', function(event) {
    showActive();
  });

  $('#showCompleted').on('click', function(event) {
    showCompleted();
  });

  $('#showAll').on('click', function(event) {
    showAll();
  });

});


