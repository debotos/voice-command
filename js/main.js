var count = 0;

//get the current date and time
function getDate() {
  var date = new Date();
  var n = date.toDateString();
  var time = date.toLocaleTimeString();
  var final = n + ' ' + time;
  return final;
}

// generate the table row with info
function generatorMain() {
  var text = $('#text-box').val();
  console.log('i am in event listener and the value is "'+text+'"');
  if (text.length>0) {
    count++;
    var stringHTML = '<tr id="rowAll"><th scope="row">'+count+'</th><td id="'+count+'"><input type="checkbox" id="check_box"></td><td>'+text+'</td><td>'+getDate()+'</td></tr>';
    $('#add-here').append(stringHTML);
    $('#text-box').val("");
  }
}

function generatorMainWithVoice(voice) {
  var text = voice;
  console.log('i am in event listener and the value is "'+text+'"');
  if (text.length>0) {
    count++;
    var stringHTML = '<tr id="rowAll"><th scope="row">'+count+'</th><td id="'+count+'"><input type="checkbox" id="check_box"></td><td>'+text+'</td><td>'+getDate()+'</td></tr>';
    $('#add-here').append(stringHTML);
    $('#text-box').val("");
  }
}

//add the row with the info
$('#add-btn').on('click', function () {
  generatorMain();
})

//working still......
function updateSerial() {
  var rowCount = $('#myTable >tbody >tr').length;
  for (var i = 0; i < rowCount; i++) {
    $('#myTable >tbody >tr >th').text(i);
  }
}

function deleteAction() {
  $('input:checked').each(function() {
    $(this).closest('tr').remove();
  });
}

//delete the selected row
$('#delete-btn').on('click', function () {
  console.log("i am in the delete event ");
  deleteAction();
})

//handle the ENTER key press
$('#text-box').keypress(function(e) {
  if (e.which == '13') {
     e.preventDefault();
     generatorMain();
   }
})

function checkItem(number) {
  $('#'+number+'').each(function () {
    console.log("i an at the........");
    console.log($(this));
    $(this).find('input[type=checkbox]').prop('checked', true);
  });
}

function uncheckItem(number) {
  $('#'+number+'').each(function () {
    console.log("i an at the........");
    console.log($(this));
    $(this).find('input[type=checkbox]').prop('checked', false);
  });
}


if (annyang) {

  var commands = {
    'new item *val': function(val) {
      console.log("I got a command...");
      generatorMainWithVoice(val);
    },
    'select item *val':function(val){
      var number = parseInt(val);
      console.log(number);
      checkItem(number);
    },
    'remove item *val':function(val){
      var number = parseInt(val);
      console.log(number);
      uncheckItem(number);
    },
    'delete items':function () {
      deleteAction();
    }
  }

  // Add our commands to annyang
  annyang.addCommands(commands);

  annyang.debug();
  annyang.start();
}
