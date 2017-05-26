window.CLIENT_ID = '4d2526333de7872dbd870ebe98115a5c'

function showAlert (text) {
  var alertBox = document.getElementById('alerts')
  alertBox.innerHTML = text
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
  var newDate = new Date();
  return d - newDate
}

function checkTimeAndSetTimeout () {
  var formTime = checkTimeForm()
  var timeLeft = timeUntilDate(formTime)
  console.log("time left", timeLeft)
  console.log("form time", formTime)

  if (timeLeft < 0) {
    showAlert('Your time is in the past...');
  }
  else if (isNaN(timeLeft) == true) {
    showAlert('Invalid time...');
  }
  else {
    setTimeout(createPlayer, timeLeft)
    showAlert('Your alarm is set for ' + formTime.toLocaleString() + '. Playing likes by ');
  }
}

function checkUsernameValidity () {
  var inputField = document.getElementById('url')
  var username = inputField.value

  $.get('http://api.soundcloud.com/resolve?url=http://soundcloud.com/' + username + '&client_id=' + CLIENT_ID,
    function (user) {
      var userID = user.id

      document.getElementById(''+ userID + '');
    }
  )
}

// create player when the user clicks submit
function createPlayer (timeLeft, dateTimeFieldValue) {
  var inputField = document.getElementById('url')
  var username = inputField.value

  $.get('http://api.soundcloud.com/resolve?url=http://soundcloud.com/' + username + '&client_id=' + CLIENT_ID,
    function (user) {
      var userID = user.id

      document.getElementById('putTheSoundCloudPlayerRightHerePlease').innerHTML = '<iframe width="100%" height="350" scrolling="no" frameborder="no" id="sc-widget" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/' + userID + '/favorites&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true;buying=false"></iframe>';
    }
  )
}
