$(document).ready(function(){
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
    },
    error:function(msg){
      console.log(msg);
    }
  });
});
