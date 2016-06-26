function clickEvent(){
  checkTimeAndSetTimeout();
  cordova.plugins.backgroundMode.enable();
}

function checkTimeForm () {
  var dateTimeField = document.getElementById('date');
  return convertDateFormValueToAdjustedDate(dateTimeField.value)
}

function convertDateFormValueToCurrentTimeZoneDate (d) {
  console.log("timezoning", d)
  return new Date(d.replace(/-/g,'/').replace('T',' '))
}

function floorDateDownToThePreviousMinute (d) {
  console.log("flooring", d)
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes())
}

function convertDateFormValueToAdjustedDate (d) {
  console.log("converting", d)
  var timeZoneDate = convertDateFormValueToCurrentTimeZoneDate(d)
  return floorDateDownToThePreviousMinute(timeZoneDate)
}

function timeUntilDate (d) {
  return d - new Date()
}

function checkTimeAndSetTimeout () {
  var formTime = checkTimeForm()
  var timeLeft = timeUntilDate(formTime)
  console.log("time left", timeLeft)
  createPlayer(timeLeft)
  // setTimeout(createPlayer, 0)
  // ^ this doesn't work, I think the player needs to be created
  // in the same execution step as some human input
}

var clicked = 0;

function createPlayer (timeLeft) {
  clicked++;
  var inputField = document.getElementById('url');
  var urlToPlay = 'https://soundcloud.com/' + inputField.value + '/likes';
  console.log('creating a player for ' + urlToPlay);

  if (clicked <= 1) {
    $('.sc-player-container').append("<a class='sc-player' href=" + urlToPlay + ">player</a>");
    $('a.sc-player, div.sc-player').scPlayer();
    setTimeout(findThePlayButtonAndClickOnIt, 10000 + timeLeft)
  } else {
    $('.sc-player').replaceWith("<a class='sc-player' href=" + urlToPlay + ">player</a>");
    $('a.sc-player, div.sc-player').scPlayer();
    setTimeout(findThePlayButtonAndClickOnIt, 10000 + timeLeft)
  }
}

function findThePlayButtonAndClickOnIt () {
  $('li.active').trigger('click')
}
