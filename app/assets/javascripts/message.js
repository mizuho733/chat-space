$(function(){
  $("#new_message").on('submit', function(e){
    e.preventDefault();
    console.log(this)
    var message = new FormData(this);
  })
});
