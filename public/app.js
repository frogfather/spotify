var albums = null;

var createTableHeadings = function(){
  var albumDiv = document.querySelector("#albums");
  var table = document.createElement("table");
  albumDiv.appendChild(table);
}

var addTableRow = function(albumArray){
  var table = document.querySelector("table");
  var tableRow = document.createElement("tr");
  table.appendChild(tableRow);
  for (var i=0; i<3; i++){
  var tableData = document.createElement("td");
  tableRow.appendChild(tableData);
  }
}

var addAlbumDetails = function(albumArray){
// adds a row of 3 albums
addTableRow();
var table = document.querySelector("table");
var lastRow = table.rows.length-1;
for (var i = 0; i< albumArray.length; i++){
  var image = document.createElement("img");
  image.src = albumArray[i].images[0].url;
  table.rows[lastRow].cells[i].innerText = albumArray[i].artists[0].name;
  table.rows[lastRow].cells[i].appendChild(image);

  }
};

var listAlbums = function(albums){
  var albumArray = [];
  albums.forEach(function(album){
  albumArray.push(album);  
  console.log(album.images[0].url);
  if (albumArray.length == 3){
    addAlbumDetails(albumArray);
    albumArray.length = 0;
    }
  });
  }


var makeRequest = function(url,callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
};


var requestComplete = function(){
  // do stuff
  if (this.status !==200) return;
  var jsonString = this.responseText;
  albums = JSON.parse(jsonString);
  createTableHeadings();
  listAlbums(albums.albums.items);

};

var app = function(){
  var url = "https://api.spotify.com/v1/search?q=christmas&type=album"; 
  makeRequest(url,requestComplete);
};

window.onload = app;