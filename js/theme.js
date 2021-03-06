function mapBox() {
  "use strict";
  var $lat = jQuery("#mapBox").data("lat");
  var $lon = jQuery("#mapBox").data("lon");
  var $zoom = jQuery("#mapBox").data("zoom");
  var $marker = jQuery("#mapBox").data("marker");
  var mapCanvas = document.getElementById("mapBox");
  var mapOptions = { center: new google.maps.LatLng($lat, $lon), zoom: $zoom };
  var map = new google.maps.Map(mapCanvas, mapOptions);
  if (typeof $marker === "undefined") {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng($lat, $lon),
      map: map,
    });
  } else {
    var marker = new google.maps.Marker({
      icon: $marker,
      position: new google.maps.LatLng($lat, $lon),
      map: map,
    });
  }
}
function doAnimations(elems) {
  "use strict";
  var animEndEv = "webkitAnimationEnd animationend";
  elems.each(function () {
    var $this = jQuery(this),
      $animationType = $this.data("animation");
    $this.addClass($animationType).one(animEndEv, function () {
      $this.removeClass($animationType);
    });
  });
}
jQuery(document).ready(function ($) {
  "use strict";
  if (jQuery("#countDown").length) {
    var dateStr = jQuery("#countDown").data("end-date");
    var a = dateStr.split(" ");
    var d = a[0].split("-");
    var t = a[1].split(":");
    var date1 = new Date(d[0], d[1] - 1, d[2], t[0], t[1], t[2]);
    jQuery("#countDown").countdown({
      until: date1,
      labels: [
        "Years",
        "Months",
        "Weeks",
        "Days",
        "Hours",
        "Minutes",
        "Seconds",
      ],
      labels1: ["Year", "Month", "Week", "Day", "Hour", "Minute", "Second"],
      timezone: 0,
      layout: jQuery("#countDown").html(),
    });
  }
  if (jQuery("nav#menu-left").length > 0) {
    jQuery("nav#menu-left").mmenu(
      {
        offCanvas: { position: "right" },
        navbars: { add: true, title: "Menu" },
        classes: "mm-dark",
        slidingSubmenus: false,
      },
      { selected: "current-menu-item" }
    );
  }
  if (screen.width > 700) {
    jQuery("ul.nav")
      .on("mouseover", "li.dropdown", function () {
        jQuery(this)
          .find(".dropdown-menu")
          .stop(true, true)
          .delay(100)
          .fadeIn(300);
      })
      .on("mouseout", "li.dropdown", function () {
        jQuery(this)
          .find(".dropdown-menu")
          .stop(true, true)
          .delay(100)
          .fadeOut(300);
      });
  }
  jQuery("#testimonials").carousel({ interval: 3000, cycle: true });
  jQuery("#list").on("click", function (event) {
    event.preventDefault();
    $("#products .courses").addClass("list-group-item");
    $("#list").addClass("active");
    $("#grid").removeClass("active");
  });
  jQuery("#grid").on("click", function (event) {
    event.preventDefault();
    $("#products .courses").removeClass("list-group-item");
    $("#grid").addClass("active");
    $("#list").removeClass("active");
    jQuery("#products .courses").addClass("grid-group-item");
  });
  if (jQuery().flexslider) {
    jQuery(".flexslider").flexslider({
      animation: "fade",
      before: function (slider) {
        var $animatingElems = $(slider).find("[data-animation ^= 'animated']");
        doAnimations($animatingElems);
      },
      start: function (slider) {
        $("body").removeClass("loading");
      },
    });
    var $myCarousel = $(".flexslider"),
      $firstAnimatingElems = $myCarousel
        .find(".flex-active-slide")
        .find("[data-animation ^= 'animated']");
    doAnimations($firstAnimatingElems);
  }
  if ($("#cform").length) {
    jQuery.validator.addMethod(
      "answercheck",
      function (value, element) {
        return this.optional(element) || /^\bcat\b$/.test(value);
      },
      "type the correct answer -_-"
    );
    $("#cform").validate({
      rules: {
        name: { required: true, minlength: 2 },
        email: { required: true, email: true },
        subject: { required: true, minlength: 10 },
        phone: { required: false },
        message: { required: true, minlength: 20 },
      },
      messages: {
        name: {
          required: "come on, you have a name don't you?",
          minlength: "your name must consist of at least 2 characters",
        },
        email: { required: "no email, no message" },
        subject: { required: "please indicate a subject" },
        message: {
          required: "um...yea, you have to write something to send this form.",
          minlength: "thats all? really?",
        },
      },
      submitHandler: function (form) {
        $(form).ajaxSubmit({
          type: "POST",
          data: $(form).serialize(),
          url: "contact_process.php",
          success: function () {
            $("#contactForm :input").attr("disabled", "disabled");
            $("#contactForm").fadeTo("slow", 0.15, function () {
              $(this).find(":input").attr("disabled", "disabled");
              $(this).find("label").css("cursor", "default");
              $("#success").fadeIn();
            });
          },
          error: function () {
            $("#contactForm").fadeTo("slow", 0.15, function () {
              $("#error").fadeIn();
            });
          },
        });
      },
    });
  }
});
