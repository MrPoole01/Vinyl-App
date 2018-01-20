// Artist Info
var siteURL = "https://cors-anywhere.herokuapp.com/http://coverartarchive.org/release-group/";

$(document).ready(function() {

    // cache
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
      timeouts[id] = setTimeout(() => {
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

    $("#submit").click((event) => {
      event.preventDefault();
      var $search = $("#searchField").val()
      getInfo($search);
    })
  })

  getInfo();

var form = $("form")
  form.hide();
  $("html").mousemove((event) => {
  form.show();
  myStopFunction();
  myFunction();
});

function getInfo(search) {
  if (search === undefined) {
    url = 'https://cors-anywhere.herokuapp.com/http://api.musicgraph.com/api/v2/album/search?api_key=c4254c96fcc92d18368b7cbfe0c74641&limit=100'
  } else {
    url = 'https://cors-anywhere.herokuapp.com/http://api.musicgraph.com/api/v2/album/search?api_key=c4254c96fcc92d18368b7cbfe0c74641&limit=100' + '&genre=' + search
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
        var popularity = (data.data[arrayOfNum[i]].popularity * 100).toFixed(0)
        var artist_name = data.data[arrayOfNum[i]].artist_name
        var title = data.data[arrayOfNum[i]].title
        var release_year = data.data[arrayOfNum[i]].release_year
        if (imageId) {
          $(`#${i}`).empty()
          $(`#${i}`).append(`<div id="${i}div"></div>`)
          $(`#${i}div`).append(`
            <p class="hidden aN"> Artist: ${artist_name}</p>
            <p class="hidden ttl"> Title: ${title}</p>
            <p class="hidden rls"> Relaesed: ${release_year}</p>
            <p class="hidden pop"> popularity: ${popularity}%</p>`)
          var imageUrl = siteURL + imageId
          getImage(i, imageUrl);
        }
      }
    })
  }

    function getImage(i, imageUrl) {
      $.get(imageUrl).then(function (image) {
        $(`#${i}`).append(`<img class="album_art" src="${image.images[0].thumbnails.small}">`)
      })
    }

function myFunction() {
  myVar = setTimeout(() => {
    $("form").fadeOut();
  }, 15000);
}

function myStopFunction() {
  if (typeof myVar != 'undefined') {
    clearTimeout(myVar);
  }
}
$(".cardShow").click(function() {
  var modalAppear = $('#bubbleImage')
  var modalContent = this.innerHTML;
  modalAppear.html(modalContent);
  $('#bubbleImage p.hidden').removeClass('hidden');
  $('#myModal').modal('show')
})
