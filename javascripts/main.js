$(document).ready(function(){

  // enable tooltips
  $("[data-toggle='tooltip']").tooltip();

  // welcome
  console.log("Hi, there. Stop sniffin that code!");

  // links
  $("a").attr('target', '_blank');

  // tweet
  $.ajax({
    url: "http://www.yum.de/twitter-feed/index.php",
    dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)

    success:function(data){
      var latest_tweet = data[0];
      var text = latest_tweet.text;
      autolinked_text = twttr.txt.autoLink(text);
      var created_at = latest_tweet.created_at;
      created_at = moment(created_at).format("MMM Do");

      var $tweet_text = $("#tweet .tweet-text");
      var $tweet_date = $("#tweet .tweet-created-at small");

      $tweet_text.html(autolinked_text);
      $tweet_date.html(created_at);

      $("a").attr('target', '_blank');
    },
    error:function(msg){
      console.log(msg);
    }
  });

  // instagram

  next_url = "https://api.instagram.com/v1/users/25839218/media/recent?access_token=25839218.1fb234f.2a30fb530b2a46c9a62a733d6b8aa693";

  $.ajax({
    method: "GET",
    url: next_url,
    dataType: "jsonp",
    jsonp: "callback",
    jsonpCallback: "jsonpcallback",
    success: function(data) {
      recent = data.data[0];
      image = recent.images.standard_resolution.url;
      caption = recent.caption.text;
      likes = recent.likes.count;
      comments = recent.comments.count;

      console.log(likes);
      console.log(comments);

      // set the image
      $container = $("#instagram-recent-image");
      $instagraminfo = $("#instagram-recent-info");
      $container.attr("src", image);

      // set the anchor
      $(".instagram-recent-image").find("a").attr("href", recent.link);

      $("a").attr('target', '_blank');

      $caption = $("#instagram-recent-caption");
      $caption.html(caption);

      // add likes if there are more than 1
      $comments = '<span id="instagram-recent-comments" class="instagram-recent-comments"><i class="fa fa-comment"></i> ' + comments + '</span>';
      if(comments >= 1){
        $instagraminfo.append($comments);
      }
      
      // add likes if there are more than 5
      $likes = '<span id="instagram-recent-likes" class="instagram-recent-likes"><i class="fa fa-heart"></i> ' + likes + '</span>';
      if(likes >= 5){
        $instagraminfo.append($likes);
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        $("#log").val($("#log").val() + 'Error\n');
    }
  });
});
