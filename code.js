
var board = document.getElementById('boardInner');

const renderBoard1 = () =>{
  for (var i = 0; i < 6; ++i){
    var row = document.createElement('DIV');
    row.className = 'row';
    for (var j = 0; j < 7; ++j){
      var square = document.createElement('DIV');
      square.className = 'square';
      square.style.left = String(j*50) + 'px';
      square.style.top = String(i*50)+'px';

      row.appendChild(square);
    }
    board.appendChild(row);
  }   

  for (var i = 0; i < 7; ++i){
    var button = document.createElement('button');
    button.className = 'buttons';
    button.id = 'row' + String(i+1);
    board.appendChild(button);
    
  }

 
}

renderBoard1();

document.querySelectorAll('button').forEach(function(element){
  if (document.querySelector(element.id) !== null){
    document.querySelector(element.id).onclick() = function(){
      console.log(element);
    }
  }
})
