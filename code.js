
var board = document.getElementById('boardInner');
var turn = -1;
var situ = []
var inputlock = false;
var root = document.documentElement;
var newx = Math.round((Math.min(window.innerWidth,window.innerHeight) * 0.8) / 7);

$(window).resize(function() {
  updatesq();
});

for (var x =0; x < 7; x++){
  situ.push([0,0,0,0,0,0])
}

const renderBoard = () =>{
  for (var i = 5; i >= 0; --i){
    var row = document.createElement('DIV');
    row.className = 'row';
    for (var j = 0; j < 7; ++j){
      var square = document.createElement('DIV');
      square.className = 'square';
      square.id = 'sq' + String(j) + String(i);
      square.style.left = String(j*newx) + 'px';
      square.style.top = String((5-i)*newx)+'px';

      row.appendChild(square);
    }
    board.appendChild(row);
  }   

  for (var i = 0; i < 7; ++i){
    var button = document.createElement('button');
    button.className = 'buttons';
    button.id = 'col' + String(i);
    board.appendChild(button);
    
  }
  updatesq();
 
}

renderBoard();

document.querySelectorAll('button').forEach(function(element){
  
  element.addEventListener('click',function(){
    if (!(inputlock)){
      console.log(element.id);
      turn ++;
      inputlock = true;
      place(parseInt(element.id.substr(3),10));
    }
  })
  
})

function place(col){
  var row = -1;
  for (var index=0; index<6; index++){
    if (situ[col][index] === 0){
      situ[col][index] = turn%2+1;
      row = index;
      break;
    }
  }
  if (row === -1){
    turn --;
    inputlock = false;
  }else{
    ani(col,5,row,turn);
  }
  
}



function ani(col,row,trow,color){
  console.log(turn);
  if (trow === row){
    if (color%2 === 0) document.getElementById('sq' + String(col) + String(row)).style.backgroundImage = "url('red.png')";
    else document.getElementById('sq' + String(col) + String(row)).style.backgroundImage = "url('blue.png')";
    inputlock = false;
    return false;
  }

  console.log(document.getElementById('sq' + String(col) + String(row)).style.backgroundImage);
  if (document.getElementById('sq' + String(col) + String(row)).style.backgroundImage === 'url("blue.png")' || document.getElementById('sq' + String(col) + String(row)).style.backgroundImage === 'url("red.png")'){
    console.log('mt detect');
    document.getElementById('sq' + String(col) + String(row)).style.backgroundImage = 'url("empty.png")';
    ani(col,row-1,trow,color);
    return false;
  }
  console.log('no detect');
  if (color%2 === 0){
    document.getElementById('sq' + String(col) + String(row)).style.backgroundImage = "url('red.png')";
  }else{
    document.getElementById('sq' + String(col) + String(row)).style.backgroundImage = "url('blue.png')";
  }
  setTimeout(function(){
    ani(col,row,trow,color);
  }, 100);
  
}

function updatesq(){
  newx = Math.round((Math.min(window.innerWidth,window.innerHeight) * 0.8) / 7);
  console.log(newx);
  root.style.setProperty('--x', String(newx) + 'px');
  root.style.setProperty('--y', String(newx*6) + 'px');
  root.style.setProperty('--y2', String(newx*7) + 'px');
  for (var i = 5; i >= 0; --i){
    for (var j = 0; j < 7; ++j){
      square = document.getElementById('sq' + String(j) + String(i));
      square.style.left = String(j*newx) + 'px';
      square.style.top = String((5-i)*newx)+'px';
    }
  }   

}