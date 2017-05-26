  var currentIndex = 0;
  var widget = SC.Widget('soundcloud-widget');

  function playTrack(index){
    widget.load(
      "https://api.soundcloud.com/tracks/" + trackIds[index],
      {
        auto_play: false,
        show_artwork: false,
        liking: false,
        sharing: false

        // Check out https://developers.soundcloud.com/docs/api/html5-widget#params
        // to see more parameters you can pass here...
      }
    );
    trackPlayCount ++;
    currentIndex = index;
  }

  function playNext(){
    var nextIndex = currentIndex + 1;
    if(nextIndex >= trackIds.length){
      nextIndex = 0;
    }
    playTrack(nextIndex);
  }

  function playPrev(){
    var nextIndex = currentIndex - 1;
    if(nextIndex < 0){
      nextIndex = trackIds.length - 1;
    }
    playTrack(nextIndex);
  }

  function playToggle(){
    widget.toggle();
  }

  function onTrackFinished() {
    playNext();
  }

  // Bind our functions to events ___________________________________

  // Event: widget finished song
  widget.bind(SC.Widget.Events.FINISH, onTrackFinished);

  // Event: clicked on #play-toggle
  $('#play-toggle').on('click', playToggle);

  $('#prev').on('click', playPrev);

  $('#next').on('click', playNext);




  // And, by default we load the first song...


});
