var request = []
var artistPic = []
var artistName = []
var albumRelease = []
var albumTitle = []


var name = $(".artist_name")
var title = $(".title")
var year = $(".release_year")
var genre = $(".main_genre")
var artist_link = $(".id")
// console.log(request, artistName, albumRelease, albumTitle);



// Search function
var apiSearch = "https://cors-anywhere.herokuapp.com/http://api.musicgraph.com/api/v2/album/search";
var apiKey1 = "?api_key";
var keyId = "=42ae097ae723c841dd4ad0ab46cf1608";
var genre = '&genre=';
var musicgraph = apiSearch + apiKey1 + keyId + genre
// console.log(musicgraph);

// Artist Info
var siteURL = "https://cors-anywhere.herokuapp.com/http://coverartarchive.org/release-group/";

$(document).ready(function() {

  // (function() {

    // cache vars
    var cards = document.querySelectorAll(".card.effect__random");
    var timeMin = 1;
    var timeMax = 3;
    var timeouts = [];

    // loop through cards
    for (var i = 0, len = cards.length; i < len; i++) {
      var card = cards[i];
      var cardID = card.getAttribute("data-id");
      var id = "timeoutID" + cardID;
      var time = randomNum(timeMin, timeMax) * 10000;
      cardsTimeout(id, time, card);
    }

    // timeout listener
    function cardsTimeout(id, time, card) {
      if (id in timeouts) {
        clearTimeout(timeouts[id]);
      }
      timeouts[id] = setTimeout(function() {
        var c = card.classList;
        var newTime = randomNum(timeMin, timeMax) * 15000;
        c.contains("flipped") === true ? c.remove("flipped") : c.add("flipped");
        cardsTimeout(id, newTime, card);
      }, time);
    }


    // random number generator given min and max
    function randomNum(min, max) {
      return Math.random() * (max - min) + min;
    }

    getInfo();

    $("#submit").click(function (event) {
      event.preventDefault();
      var $search = $("#searchField").val()
      getInfo($search);
    })
  })



$("form").hide();

$("html").mousemove(function(event) {
  $("form").show();

  myStopFunction();
  myFunction();
});

function getInfo(search) {
  if (search === undefined) {
    url = 'https://cors-anywhere.herokuapp.com/http://api.musicgraph.com/api/v2/album/search?api_key=42ae097ae723c841dd4ad0ab46cf1608&limit=100'
  } else {
    url = 'https://cors-anywhere.herokuapp.com/http://api.musicgraph.com/api/v2/album/search?api_key=42ae097ae723c841dd4ad0ab46cf1608&limit=100' + '&genre=' + search
  }

  $.get(url)
    .then(function(data) {
      var count = 0;
      var currentCard = 0;
      var arrayOfNum = [];
      while (count < 16) {
        var randNum = Math.floor(Math.random() * 100)
        if(arrayOfNum.indexOf(randNum) === -1){
          if(data.data[randNum].album_musicbrainz_id){
            arrayOfNum.push(randNum)
            count++
          }
        }
      }
      for (var i = 0; i < arrayOfNum.length; i++) {
        var imageId = data.data[arrayOfNum[i]].album_musicbrainz_id
        if (imageId) {
          $(`#${i}`).empty()
          $(`#${i}`).append(`<div id="${i}div"></div>`)
          $(`#${i}div`).append(`
            <p class="hidden aN"> Artist: ${data.data[arrayOfNum[i]].artist_name}</p>
            <p class="hidden ttl"> Title: ${data.data[arrayOfNum[i]].title}</p>
            <p class="hidden rls"> Relaesed: ${data.data[arrayOfNum[i]].release_year}</p>
            <p class="hidden pop"> popularity: ${data.data[arrayOfNum[i]].popularity}</p>`)
          var imageUrl = siteURL + imageId
          getImage(i, imageUrl);
        }
          artistName.push(data.data[i].artist_name)
          albumRelease.push(data.data[i].release_year)
          albumTitle.push(data.data[i].title)
        }
      })
    }

    function getImage(i, imageUrl) {
      $.get(imageUrl).then(function (image) {
        $(`#${i}`).append(`<img class="album_art" src="${image.images[0].thumbnails.small}">`)
      })
    }

function myFunction() {
  myVar = setTimeout(function() {
    $("form").fadeOut();
  }, 15000);
}

function myStopFunction() {
  if (typeof myVar != 'undefined') {
    clearTimeout(myVar);
  }
}
$(".cardShow").click(function() {
  var modalContent = this.innerHTML;
  $('#bubbleImage').html(modalContent);
  $('#bubbleImage p.hidden').removeClass('hidden');
  $('#myModal').modal('show')

})
