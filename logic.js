var gifTopics = ["dog", "cat", "mouse"];

var apiKey = "niiHkjt2mdfROnKMw3E2WuJnGiA1CcU8"

// Function for dumping the JSON content for each button into the div
function displayGifs() {
    event.preventDefault();
    var newTopic = $(this).attr("data-name")
    console.log(newTopic)
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newTopic + "&api_key="+ apiKey + "&limit=10";

    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        console.log(queryURL)
        console.log(response)

        var results = response.data;
        console.log(results)

        for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");

        var topicImage = $("<img>");
        topicImage.attr("class", "gif");
        topicImage.attr("src", results[i].images.fixed_height_still.url);
        topicImage.attr("data-still", results[i].images.fixed_height_still.url);
        topicImage.attr("data-animate", results[i].images.fixed_height.url);
        topicImage.attr("data-state", "still");

        var rating = $("<div>").text("rating: "+results[i].rating).addClass("rating")
        gifDiv.append(rating);

        gifDiv.prepend(topicImage);
        $("#gif-view").prepend( gifDiv);
        }
        var title = $("<h3>")
        title.attr("class", "gif");
        title.text(newTopic)
        $("#gif-view").prepend(title);
    })
}

function gifActivate(){
    var state = $(this).attr("data-state")
    var still = $(this).attr("data-still")
    var animate = $(this).attr("data-animate")

    if (state === "still"){
      $(this).attr("data-state", "animate")
      $(this).attr("src", animate)
    }
    if (state === "animate"){
      $(this).attr("data-state", "still")
      $(this).attr("src", still)
    }
}

function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < gifTopics.length; i++) {
        var a = $("<button>");
        a.addClass("topic");
        a.attr("data-name", gifTopics[i]);
        a.text(gifTopics[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-gif").on("click", function(event) {
    event.preventDefault();

    var newTopic = $("#gif-input").val().trim();

    gifTopics.push(newTopic);
    console.log(gifTopics)

    renderButtons();
    $("#gif-input").val("")

});

// Generic function for displaying the GifInfo
$(document).on("click", ".topic", displayGifs);

//function to pause/unpause gif
$(document).on("click", ".gif", gifActivate);

// Calling the renderButtons function to display the intial buttons
renderButtons();