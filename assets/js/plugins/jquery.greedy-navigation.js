/*
* Greedy Navigation
*
* http://codepen.io/lukejacksonn/pen/PwmwWV
*
*/

var $nav = $('#site-nav');
var $btn = $('#site-nav button');
var $hlinks = $('#site-nav .hidden-links');

function updateNav() {
  // Greedy navigation disabled to keep all menu items visible.
  $btn.addClass('hidden').removeClass('close');
  $hlinks.addClass('hidden');
}

$(window).on('resize', updateNav);
$btn.on('click', function() {
  // no-op; dropdown disabled
});

updateNav();