/*
 * scripts.js
 *
 * auto-concatenated jquery, symbolset and custom alternate files
 *
 */

//@codekit-prepend "libs/jquery-1.7.1.min.js","libs/waypoints.js","libs/lazyload.js",;



var   win             = $(window),
      doc             = $(document),
      body            = $('body'),
      self            = $(this),
      windowHeight    = win.height(),
      current         = 1,
      welcomeIterate;


function viewportScale(){
  if ( win.innerWidth() > 767 ) {
    $('.main').css('top', windowHeight);
  } else {
    $('.main').css('top',0);
  }
}

$(document).ready(function() {
  viewportScale();

  win.resize(function(){
    viewportScale();
  });

  welcomeIterate = setInterval(function () {
    $('header li.step-' + current).addClass('fade');
    current++;
    $('header').addClass('fade').delay(850).queue(function(next){
        $('header').removeClass().addClass('step-' + current);
        next();
    });
    if (current === 4){
      clearInterval(welcomeIterate);
      $('.step-4').delay(4000).queue(function(next){
          $(this).addClass('alt');
          next();
      });
      $('.step-4 a').delay(7000).queue(function(next){
          $(this).addClass('waiting');
          next();
      });
    }
  }, 3000);

  win.scroll(function() {
      if ($(window).scrollTop() > 200) {
          $('.step-4 a').addClass('halt').removeClass('waiting');
      }
  });

  $('.work img').lazyload({
    effect : "fadeIn",
    threshold : 0
  });

  // $('.expander').click(function(e){
  //   e.preventDefault();
  //   $('.expand').slideDown().addClass('active');
  //   $('.condenser').addClass('active');
  // });


  // $('.condenser').click(function(e){
  //   e.preventDefault();
  //   $('.expand').slideUp().removeClass('active');
  //   $('.condenser').removeClass('active');
  // });

  // hide condenser when field strat is shown
  // $('.field-strategies').waypoint(function(e) {
  //   console.log('field');
  //   $('.condenser').removeClass('active');
  // });

  // show condenser when field strat is shown
  // $('.vii').waypoint(function(e) {
  //   console.log('vii');
  //   if ( $('.expand').hasClass('active') ){
  //     $('.condenser').addClass('active');
  //   }
  // });

  $('.top').click(function(e){
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });

}); // docready


/*  Google Analytics  */
var googleAnalyticsID = 'UA-41917433-1';

var _gaq = _gaq || [];
_gaq.push(['_setAccount', googleAnalyticsID]);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();