// Artist Info
var siteURL = 'https://api.discogs.com/database/search?q=*&token=GCMVyUOZMChKnIZpxFkFdewqVaaWtmGkwmhCCaPn';
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
    var proxy = "https://cors-anywhere.herokuapp.com/";
    url = `${proxy}https://api.discogs.com/database/search?q=*&token=GCMVyUOZMChKnIZpxFkFdewqVaaWtmGkwmhCCaPn`
  } else {
    url = `${proxy}https://api.discogs.com/database/search?q=*&token=GCMVyUOZMChKnIZpxFkFdewqVaaWtmGkwmhCCaPn` + '&genre=' + search
  }


  $.getJSON(url)
    .then(function(data) {
      var data = data.results;
      var count = 0;
      var currentCard = 0;
      var arrayOfNum = [];
      //console.log(arrayOfNum);
      while (count < 16) {
        var randNum = Math.floor(Math.random() * 50)
        if (arrayOfNum.indexOf(randNum) === -1) {
          if (data[randNum].id) {
            //console.log(data[randNum].id);
            arrayOfNum.push(randNum)
            count++
          }
        $.each(data, function(index, value) {
          const obj = value
        });
      }
    }
    for (var i = 0; i < arrayOfNum.length; i++) {
      var imageId = data[arrayOfNum[i]].cover_image;
      //console.log(imageId);
      //var songs = (data[arrayOfNum[i]].trackCount).toFixed(0)
      var artist_name = data[arrayOfNum[i]].title
      var artist_genre = data[arrayOfNum[i]].genre
      var release_year = data[arrayOfNum[i]].year
      if (imageId) {
        $(`#${i}`).empty()
        $(`#${i}`).append(`<div id="${i}div"></div>`)
        $(`#${i}div`).append(`
          <p class="hidden aN"> Artist: ${artist_name}</p>
          <p class="hidden ttl"> Genre: ${artist_genre}</p>
          <p class="hidden rls"> Relaesed: ${release_year}</p>`)
        var imageUrl = imageId
        getImage(i, imageUrl);
      }
    }
  })
}

function getImage(i, imageUrl) {
  $.get(imageUrl).then(function(image) {
    console.log(imageUrl);
    $(`#${i}`).append(`<img class="album_art" src="${data[arrayOfNum[i]].id}">`)
    //console.log(image)
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
