/*facebook knap slide ind*/
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
/*header shrink*/
$(function(){
 var shrinkHeader = 50;
  $(window).scroll(function() {
    var scroll = getCurrentScroll();
      if ( scroll >= shrinkHeader ) {
           $('.imgdean').fadeOut(1500);
        }
        else {
            $('.imgdean').fadeIn();
        }
  });
function getCurrentScroll() {
    return window.pageYOffset || document.documentElement.scrollTop;
    }
});

/*booking text forsvinder ved scroll*/
  $(window).scroll(function() {
    /*alert("hide");*/
    if ($(this).scrollTop()>0)
    {
      $(".booking").fadeOut(1200);
    }
    else
      {
        $(".booking").fadeIn();
      }
    });

  /*Zoom on mouseover 3 ord - .h2first*/
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

/*Zoom on mouseover 3 ord - .h2second*/
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

/*Zoom on mouseover 3 ord - .h2third*/
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
/*video player start*/
// Video
var VideoPlayer = {
  init: function() {
    video.volume = .0;
    // Buttons
    var playButton = document.getElementById("play-pause");
    var muteButton = document.getElementById("mute");
    var fullScreenButton = document.getElementById("full-screen");
    video = document.getElementById("video");
    // Sliders
    var seekBar = document.getElementById("seek-bar");
    var volumeBar = document.getElementById("volume-bar");
    volumeBar.value = video.volume;
    // Controls
    videoControls = document.getElementById("video__controls");
    playCenterButton = document.getElementById("video__play__centerButton");
    caption = document.getElementById("video__caption");
    // Event listener for the play/pause button
    VideoPlayer.hideControls();
    //display control on mousemove
    document.getElementById("video__container").addEventListener("mousemove", function() {
      VideoPlayer.showControls();
    });
    videoControls.addEventListener("mouseover", function() {
      VideoPlayer.showControls();
      clearTimeout(hideControl);
    });
    playButton.addEventListener("click", function() {
      playVideo();
    });
    playCenterButton.addEventListener("click", function() {
      playVideo();
    });
    function playVideo(){
      if (video.paused == true) {
        // Play the video
        video.play();
        // Update the button text to 'Pause'
        playButton.classList.toggle("fa-play");
        playButton.classList.toggle("fa-pause");
        playCenterButton.classList.toggle("fa-play-circle-o");
        playCenterButton.classList.toggle("fa-pause");
        playCenterButton.style.opacity = 0;
      } else {
        // Pause the video
        video.pause();
        // Update the button text to 'Play'
        playButton.classList.toggle("fa-play");
        playButton.classList.toggle("fa-pause");
        playCenterButton.classList.toggle("fa-play-circle-o");
        playCenterButton.classList.toggle("fa-pause");
        playCenterButton.style.opacity = .8;
      }
    };

    // Event listener for the mute button
    muteButton.addEventListener("click", function() {
      if (video.muted == false) {
        // Mute the video
        video.muted = true;
        // Update the volume Bar
        volumeBar.value = 0;
      } else {
        // Unmute the video
        video.muted = false;
        // Update the volume Bar
        volumeBar.value = video.volume;
      }
    });

    // Checks if the document is currently in fullscreen mode
    var isFullScreen = function() {
      return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
    }

    // Fullscreen
    fullScreenButton.addEventListener("click", function() {
      // If fullscreen mode is active...
      if (isFullScreen()) {
         // ...exit fullscreen mode
        // (Note: this can only be called on document)
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
      } else {
        if (video.requestFullscreen) video.requestFullscreen();
        else if (video.mozRequestFullScreen) video.mozRequestFullScreen();
        else if (video.webkitRequestFullScreen) {
          video.webkitRequestFullScreen();
        } else if (video.msRequestFullscreen) video.msRequestFullscreen();
        VideoPlayer.hideControls();
      }
    });

    // Event listener for the seek bar
    var seekBarActive = false;
    seekBar.addEventListener("mousedown", function() {
      seekBarActive = true;
      clearTimeout(hideControl);
    });
    seekBar.addEventListener("mouseup", function() {
      seekBarActive = false;
      VideoPlayer.hideControls();
    });
    seekBar.addEventListener("mousemove", function() {
      if (seekBarActive == true){
        // Calculate the new time
        var time = video.duration * (seekBar.value / 100);
        // Update the video time
        video.currentTime = time;
        clearTimeout(hideControl);
      }
    });

    // Update the seek bar as the video plays
    video.addEventListener("timeupdate", function() {
      // Calculate the slider value
      var value = (100 / video.duration) * video.currentTime;
      // Update the slider value
      seekBar.value = value;
    });

    // Event listener for the volume bar
    var volumeBarActive = false;
    volumeBar.addEventListener("mousedown", function() {
      volumeBarActive = true;
      clearTimeout(hideControl);
    });
    volumeBar.addEventListener("mouseup", function() {
      volumeBarActive = false;

    });
    volumeBar.addEventListener("mousemove", function() {
      if (volumeBarActive == true){
        video.volume = volumeBar.value;
        clearTimeout(hideControl);
      }
    });
  },
  hideControls: function(){
    hideControl = setTimeout(function(){
      videoControls.style.opacity = .0;
      playCenterButton.style.opacity = .0;
      caption.style.opacity = .0;
      [].forEach.call(document.getElementsByClassName("controls"), function(el) {
        el.style.visibility = "hidden";
      });
    }, 2000);
  },
  showControls: function(){
    //Hide Display Control Bar
    videoControls.style.opacity = .8;
    playCenterButton.style.opacity = .8;
    caption.style.opacity = .8;
    [].forEach.call(document.getElementsByClassName("controls"), function(el) {
      el.style.visibility = "visible";
    });
    clearTimeout(hideControl);
    VideoPlayer.hideControls();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  VideoPlayer.init();
});
/*video player slut*/
}); /*ready luk*/
