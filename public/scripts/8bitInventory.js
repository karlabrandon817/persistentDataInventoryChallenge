// properties by which searches can be done
var sizes = [ 'small', 'medium', 'large' ];
var colors = [ 'red', 'orange', 'yellow', 'green', 'mermaid treasure', 'blue', 'purple' ];

var items = [];//global array of items in the inventory

$(document).ready(function(){

  var addObject = function(){
    console.log( 'in addObject' );
    // assemble object from new fields
    var newItem = {
      name: $('#addObject').val(),
      color: $('#addColor').val(),
      size: $('#addSize').val()
    }; // end newItem
    console.log( 'adding:', newItem );
    $.ajax({
      type: 'POST',
      url: '/addItem',
      data: newItem,
        success: function(response){
          console.log('back from POST call:', response);
        },//end success function
        error: function(){
          console.log('error with addItem ajax call...');
        }//end error function
    });//end ajax call in addObject
    getObjects();
  }; // end addObject function

  var findObject = function(array){
    console.log( 'in findObject. Looking for:', $('#searchColor').val(), $('#searchSize').val() );
    // array of matches
    var matches = [];
    for ( var i = 0; i < array[0].length; i++ ) {
      if(array[0][i].color == $('#searchColor').val() && array[0][i].size == $('#searchSize').val()){
        // match, add to array
        matches.push(array[0][i]);
      } // end if
    } // end for
    console.log( 'matches:', matches );
    ////// TODO: display matches
  }; // end findObject function

  var getObjects = function(){
    console.log( 'in getObjects');
    $.ajax({
      type: 'GET',
      url: '/getInventory',
      success: function(response){
        console.log('added to items array:', response);
        items.push(response);
      }//end success function
    });//end getObjects ajax
  }; // end getObjects function


  $('#addItemButton').on('click', function(){
      addObject();
      $('#addObject').val('');
      $('#addColor').val('none');
      $('#addSize').val('none');
  });//end addItemButton on click function

  $('#searchButton').on('click',function(){
    findObject(items);
    console.log('searching...');
  });//end searchButton onClick function

  // get objects when doc is ready
  getObjects();
  findObject( 'blue', 'small' );
  findObject( 'blue', 'large' );
}); // end doc ready
