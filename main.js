$(document).ready(function() {
  var fbslide = 0;
  $(".fb-toggle-button").click(function() {
    //alert(fbslide);
    if (fbslide == 0) {
      $(".fb-iframe").animate({ left: "0px" }, 500);
      $(".fb-toggle-button").animate({ marginLeft: "340px" }, 500);
      fbslide = 1;
    } else {
      $(".fb-iframe").animate({ left: "-340px" }, 500);
      $(".fb-toggle-button").animate({ marginLeft: "0px" }, 500);
      fbslide = 0;
    }
  });
/*booking text forsvinder ved scroll*/
  $(window).scroll(function() {
    /*alert("hide");*/
    if ($(this).scrollTop()>0)
    {
      $(".booking").fadeOut(800);
    }
    else
      {
        $(".booking").fadeIn();
      }
    });

});
