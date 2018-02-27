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
      $(".booking").fadeOut(800);
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
          $(".imgdean").fadeOut(800);
        }
        else
          {
            $(".imgdean").fadeIn();
          }
        });

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
