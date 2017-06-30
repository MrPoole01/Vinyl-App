var request = []
var artistPic = []
var artistName = []
var albumRelease = []
var albumTitle = []

var imageSrc = $(".album_art")
var name = $(".artist_name")
var title = $(".title")
var year = $(".release_year")
var genre = $(".main_genre")
var artist_link = $(".id")
var search = $("placeholder")
// console.log(request, artistName, albumRelease, albumTitle);



// Search function
var apiSearch = "http://api.musicgraph.com/api/v2/album/search";
var apiKey1 = "?api_key";
var keyId = "=42ae097ae723c841dd4ad0ab46cf1608";
var musicgraph = apiSearch + apiKey1 + keyId + search
// console.log(musicgraph);

// Artist Info
var siteURL = "https://cors-anywhere.herokuapp.com/http://coverartarchive.org/release-group/";

$(document).ready(function() {
  $.get('http://api.musicgraph.com/api/v2/album/search?api_key=42ae097ae723c841dd4ad0ab46cf1608&limit=100')
    .then(function(data) {
      for (var i = 0; i < data.data.length; i++) {
        var imageId = data.data[i].album_musicbrainz_id
        if (imageId) {
          var url = siteURL + imageId
          $.get(url).then(function (image) {
            for (var i = 0; i < image.images.length; i++) {
              imageSrc.attr("src", image.images[i].thumbnails.small);
              // console.log(imageSrc[0]);
            }
          })
        }
        artistName.push(data.data[i].artist_name)
        albumRelease.push(data.data[i].release_year)
        albumTitle.push(data.data[i].title)
        // console.log(data.data[i]);
      }
      // console.log(request);
      //  return Promise.all(request)

    })

    })
