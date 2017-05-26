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
  return d - new Date()
}

function checkTimeAndSetTimeout () {
  var formTime = checkTimeForm()
  var timeLeft = timeUntilDate(formTime)
  console.log("time left", timeLeft)
  setTimeout(createPlayer, timeLeft)
  showAlert('Alarm set! Playing at ' + checkTimeForm.DateTimeFieldValue + ' hours');
  // setTimeout(createPlayer, 0)
  // ^ this doesn't work, I think the player needs to be created
  // in the same execution step as some human input
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
