var myApp = new Framework7({
  animateNavBackIcon:true
});

var $$ = Dom7;

var mainView = myApp.addView('.view-main', {
  dynamicNavbar: true,
  domCache: true
});

myApp.onPageInit('about', function (page) {
  console.log('init')
});
