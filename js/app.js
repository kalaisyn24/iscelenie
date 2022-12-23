/*  Theme Name: Dealarc | Responsive Bootstrap 4 Landing Template
    Author: Themesdesign
    Version: 2.0.0
    File Description: Main JS file of the template
*/

(function ($) {
  "use strict";

  // Add scroll class
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 50) {
      $(".sticky").addClass("nav-sticky");
    } else {
      $(".sticky").removeClass("nav-sticky");
    }

    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn();
    } else {
      $(".back-to-top").fadeOut();
    }
  });

  // Smooth scroll
  $(".navbar-nav a").on("click", function (event) {
    var $anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top - 0,
        },
        1500,
        "easeInOutExpo"
      );
    event.preventDefault();
  });

  //Owl Carousel
  $("#owl-demo-cs-testi").owlCarousel({
    autoPlay: 3000,
    navigation: false,
    slideSpeed: 300,
    paginationSpeed: 400,
    singleItem: true,
  });
  $(".slider-container").owlCarousel({
    items:1,
    autoWidth: true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    margin: 30,
    nav: true,
    navText: [
        '<button class="arrow-slide"><svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.42188 10.59L2.83188 6L7.42188 1.41L6.00188 1.84528e-06L0.00187614 6L6.00188 12L7.42188 10.59Z" fill="#ABABAB"/></svg></button>',
        '<button class="arrow-slide rotate-btn"><svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.42188 10.59L2.83188 6L7.42188 1.41L6.00188 1.84528e-06L0.00187614 6L6.00188 12L7.42188 10.59Z" fill="#ABABAB"/></svg></button>'
    ],
    responsive:{
      0:{
        autoWidth: false,
      },
      1000:{
        autoWidth: true,
      }
    }
  });

  //Scrollspy
  $(".navbar-nav").scrollspy({
    offset: 70,
  });

  //Contact Form
  $("#contact-form").submit(function () {
    var action = $(this).attr("action");

    $("#message").slideUp(750, function () {
      $("#message").hide();

      $("#submit")
        .before('<img src="images/ajax-loader.gif" class="contact-loader" />')
        .attr("disabled", "disabled");

      $.post(
        action,
        {
          name: $("#name").val(),
          email: $("#email").val(),
          comments: $("#comments").val(),
        },
        function (data) {
          document.getElementById("message").innerHTML = data;
          $("#message").slideDown("slow");
          $("#cform img.contact-loader").fadeOut("slow", function () {
            $(this).remove();
          });
          $("#submit").removeAttr("disabled");
          if (data.match("success") != null) $("#cform").slideUp("slow");
        }
      );
    });

    return false;
  });

  // Back to top
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1000);
    return false;
  });
})(jQuery);



$(document).ready(function() {
  //E-mail Ajax Send
  $("form").submit(function() { //Change
    console.log('click');
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "../mail.php", //Change
      data: th.serialize()
    }).done(function() {
      alert("Спасибо за заявку, мы свяжемся с вами в течение 15 минут.")
      setTimeout(function() {
        // Done Functions
        th.trigger("reset");
      }, 1000);
    });
    return false;
  });

});