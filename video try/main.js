$(function() {
  //return a DOM object
  //var video = document.getElementById('videoID'); //or
  //var video = $('#videoID').get(0); //or
  //var video = $('#videoID')[0];

  //return a jQuery object
  var video = $('#myVideo');

  //Play/Pause control clicked
  /*$('.btnPlay').on('click', function() {
      if(video[0].paused) {
          video[0].play();
      }
      else {
          video[0].pause();
      }
      return false;
  });*/

    $('.btnPlay').on('click', function() {
      video[0].play();
      $(this).hide();
      $('.btnPause').show();
});

    $('.btnPause').on('click', function() {
      video[0].pause();
      $(this).hide();
      $('.btnPlay').show();
});
});
