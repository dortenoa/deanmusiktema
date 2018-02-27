/*sørger for html loades før jq*/
$(document).ready(function() {
  /*mouseover logoer*/
/*alert("fbslide")*/

/*facebook knap slide ind*/
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
      $(".booking").fadeOut(5000);
    }
    else
      {
        $(".booking").fadeIn();
      }
    });

  /*header forsvinder ved scroll*/
  $(window).scroll(function() {
    /*alert("hide");*/
    if ($(this).scrollTop()>0)
    {
      $(".imgdean").fadeOut(1500);
    }
    else
      {
        $(".imgdean").fadeIn();
      }
    });

        /*lp-plade album text forsvinder ved scroll*/
          $(window).scroll(function() {
            /*alert("hide");*/
            if ($(this).scrollTop()>0)
            {
              $(".album").fadeIn(7000);
            }
            else
              {
                $(".album").fadeOut(500);
              }
            });

            /*Zoom on mouseover 3 ord*/
              var oldSize = parseFloat($(".h2first").css('font-size'));
              var newSize = oldSize  * 2;
              $(".h2first").hover(
                function() {
                 $(".h2first").animate({ fontSize: newSize}, 1500);
                },
                function() {
                $(".h2first").animate({ fontSize: oldSize}, 1500);
               }
             );


            /*3 ord second zoom ud*/
            var oldSize = parseFloat($(".h2second").css('font-size'));
            var newSize = oldSize  * 2;
            $(".h2second").hover(
            function() {
             $(".h2second").animate({ fontSize: newSize}, 1500);
            },
            function() {
            $(".h2second").animate({ fontSize: oldSize}, 1500);
            }
            );


            /*3 ord third zoom ud*/
            var oldSize = parseFloat($(".h2third").css('font-size'));
            var newSize = oldSize  * 2;
            $(".h2third").hover(
            function() {
             $(".h2third").animate({ fontSize: newSize}, 1500);
            },
            function() {
            $(".h2third").animate({ fontSize: oldSize}, 1500);
            }
            );

            /*zoom million ud*/
            var oldSize = parseFloat($(".h2third").css('font-size'));
            var newSize = oldSize  * 1.5;
            $(".h1million").hover(
            function() {
             $(".h1million").animate({ fontSize: newSize}, 1500);
            },
            function() {
            $(".h1million").animate({ fontSize: oldSize}, 1500);
            }
            );

            /*zoom hundred ud*/
            var oldSize = parseFloat($(".h2third").css('font-size'));
            var newSize = oldSize  * 1.5;
            $(".h1hundred").hover(
            function() {
             $(".h1hundred").animate({ fontSize: newSize}, 1500);
            },
            function() {
            $(".h1hundred").animate({ fontSize: oldSize}, 1500);
            }
            );

            /*zoom hundred ud*/
            var oldSize = parseFloat($(".h2third").css('font-size'));
            var newSize = oldSize  * 0.3;
            $(".some").hover(
            function() {
             $(".some").animate({ fontSize: newSize}, 1500);
            },
            function() {
            $(".some").animate({ fontSize: oldSize}, 1500);
            }
            );

/*audio player*/
        var player = $('.player'),
            audio = player.find('audio'),
            duration = $('.duration'),
            currentTime = $('.current-time'),
            progressBar = $('.progress span'),
            mouseDown = false,
            rewind, showCurrentTime;

        function secsToMins(time) {
          var int = Math.floor(time),
              mins = Math.floor(int / 60),
              secs = int % 60,
              newTime = mins + ':' + ('0' + secs).slice(-2);

          return newTime;
        }

        function getCurrentTime() {
          var currentTimeFormatted = secsToMins(audio[0].currentTime),
              currentTimePercentage = audio[0].currentTime / audio[0].duration * 100;

          currentTime.text(currentTimeFormatted);
          progressBar.css('width', currentTimePercentage + '%');

          if (player.hasClass('playing')) {
            showCurrentTime = requestAnimationFrame(getCurrentTime);
          } else {
            cancelAnimationFrame(showCurrentTime);
          }
        }

        audio.on('loadedmetadata', function() {
          var durationFormatted = secsToMins(audio[0].duration);
          duration.text(durationFormatted);
        }).on('ended', function() {
          if ($('.repeat').hasClass('active')) {
            audio[0].currentTime = 0;
            audio[0].play();
          } else {
            player.removeClass('playing').addClass('paused');
            audio[0].currentTime = 0;
          }
        });

        $('button').on('click', function() {
          var self = $(this);

          if (self.hasClass('play-pause') && player.hasClass('paused')) {
            player.removeClass('paused').addClass('playing');
            audio[0].play();
            getCurrentTime();
          } else if (self.hasClass('play-pause') && player.hasClass('playing')) {
            player.removeClass('playing').addClass('paused');
            audio[0].pause();
          }

          if (self.hasClass('shuffle') || self.hasClass('repeat')) {
            self.toggleClass('active');
          }
        }).on('mousedown', function() {
          var self = $(this);

          if (self.hasClass('ff')) {
            player.addClass('ffing');
            audio[0].playbackRate = 2;
          }

          if (self.hasClass('rw')) {
            player.addClass('rwing');
            rewind = setInterval(function() { audio[0].currentTime -= .3; }, 100);
          }
        }).on('mouseup', function() {
          var self = $(this);

          if (self.hasClass('ff')) {
            player.removeClass('ffing');
            audio[0].playbackRate = 1;
          }

          if (self.hasClass('rw')) {
            player.removeClass('rwing');
            clearInterval(rewind);
          }
        });

        player.on('mousedown mouseup', function() {
          mouseDown = !mouseDown;
        });

        progressBar.parent().on('click mousemove', function(e) {
          var self = $(this),
              totalWidth = self.width(),
              offsetX = e.offsetX,
              offsetPercentage = offsetX / totalWidth;

          if (mouseDown || e.type === 'click') {
            audio[0].currentTime = audio[0].duration * offsetPercentage;
            if (player.hasClass('paused')) {
              progressBar.css('width', offsetPercentage * 100 + '%');
            }
          }
        });






}); /*ready luk*/
