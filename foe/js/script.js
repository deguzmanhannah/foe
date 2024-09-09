
$("main, section").hide(); 

// ! SPLASH SCREEN

// display splash screen
$("#splash").show();

// animate on the splash screen on app load
gsap.from("#splash", {
    delay: 0.25,
    opacity: 0,
    duration: 0.5
});


gsap.from("#splash img", {
    delay: 1,
    scale: 0,
    duration: 0.75,
    ease: "power3.inOut"
});

gsap.to("#splash", {
    
    delay: 4,
    opacity: 0,
    duration: 0.5,
    
    onComplete: loadLanding
});

function loadLanding(){
   
    $("main, section").hide().css({opacity: 1});

    // ************************ SHOW ************************
    // display landing screen
    $("#landing").show();

    //  animate on the landing screen
    gsap.from("#landing", {
        delay: 0.25,
        opacity: 0,
        duration: 0.5,
    });

    gsap.from("#logo1", {
        delay: 1,
        opacity: 0,
        duration: 0.5,
        ease: "back.out"
    });

    gsap.from("#logo2", {
        delay: 1.25,
        opacity: 0,
        duration: 0.5,
        ease: "back.out"
    });

    gsap.from("#logo3", {
        delay: 1.5,
        opacity: 0,
        duration: 0.5,
        ease: "back.out"
    });

    gsap.from("#logo1txt", {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            delay: 1
    });

    gsap.from("#logo2txt", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 1.25
});

    gsap.from("#logo3txt", {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    delay: 1.5
});
}

// ! WHEN LOGO IS CLICKED...

$("#logo1").click(function() {

    gsap.to("#landing", {
        opacity: 0,
        duration: 0.5,
        onComplete: loadRest,
        onCompleteParams: ["#rest1", "#D8E1DC"]
    });
});


$("#logo2").click(function() {

    gsap.to("#landing", {
        opacity: 0,
        duration: 0.5,
        onComplete: loadRest,
        onCompleteParams: ["#rest2", "#D8E1DC"]
    });

});

$("#logo3").click(function() {

    gsap.to("#landing", {
        opacity: 0,
        duration: 0.5,
        onComplete: loadRest,
        onCompleteParams: ["#rest3", "#D8E1DC"]
    });
});



function loadRest(restID, highlightColour){

    // Hide landing screen
    $("#landing").hide();

    // Display selected restaurant screen
    $(restID).show();

    // animate on the restaurant
    gsap.from(restID + " header", {
        delay:0.5,
        y: -$(restID + " header").outerHeight(),
        duration: 0.5,
        ease: "power4.out"
    });

    gsap.from(restID + " footer", {
        delay:0.25,
        y: $(restID + " footer").outerHeight(),
        duration: 0.5,
        ease: "sin.out"
    });

    // ! LOAD HOMESCREEN
    $(restID + " .home").show();

    // animate on home section 
    gsap.from(restID + " .home", {
        delay: 0.80,
        opacity: 0,
        duration: 0.5,
        ease: "circ.inOut"
    });

    // Animate on home sction

    $(restID + " .home .reveal").each(function(i) {

        gsap.from(this, {
            delay: 1.25 + i * 0.15,
            opacity: 0,
            y: -20,
            duration: 1,
            ease: "back.inOut" 
        });

    
    });

    //! create var to target icons from selected restaurant
   var iconsTarget = restID + " .homeIcon,"  + restID + " .specialsIcon," + restID + " .reservationsIcon";
    
   //!  remove highlight and active class from all icons
   $(iconsTarget).css({background: "none"}).removeClass("active");

   //* Same as old
   //  highlight home icon and add class to load restaurant page
   $(restID + " .homeIcon").css({background: highlightColour}).addClass("active");

   //! set up section nav - highlight and load section
   $(iconsTarget).click(function() {

       // Check if selected button has active class....it is doesn't run this code
       if(!$(this).hasClass("active")) {

           // renive highlight and active class from all icons
           $(iconsTarget).css({background: "none"}).removeClass("active");

           // add highlight and active class to selected icon based on highlight colour
           $(this).css({background: highlightColour}).addClass("active");

           //! MAKE SURE YOU WRITE THE FUNCTION load selected section - send current section and section to load
           // ! MAKE SURE YOU PUT A SPACE IN THE QUOTES
           loadSection(restID + " section", restID + " " + $(this).attr("data-section"));
       }
   });

}

//! function for loading internal restaurant sections

function loadSection(prevSection, nextSection) {

    // fade out previous section
    gsap.to(prevSection, {
        opacity: 0,
        duration: 0.5,
        onComplete: function() {
            // hide and reset previous section
            $(prevSection).hide().css({opacity: 1});
            // display next section
            $(nextSection).show().scrollTop(0);
        }
    });

    // animate on next section
    gsap.from(nextSection, {
        delay: 0.5,
        opacity: 0,
        duration: 0.5
    });

    // loop through and reveal all elements on the next screen with reveal class applied
    $(nextSection + " .reveal").each(function(i) {

        gsap.from(this, {
            delay: 1 + i * 0.15,
            opacity: 0,
            y: -10,
            duration: 1,
            ease: "elastic.out" // change easing to something other than elastic
        })
    });
    
}


//! set up reservations submit button
$(".reserve").click(function(e) {
    // stops default processsing for form
    e.preventDefault();

    alert("Reservations Have been made"); // replace with reveal of actual content
});

//! 2. set up hamburger menu to reveal main menu
$(".hamburger").click(function() {

         // check state of the button
     if($(this).attr("src") == "img/menu2.gif") {
 
    
        // console.log("Close to Hamburger");

       
         $(this).attr("src", "img/menu2.gif");

        // //   display menu screen
        $("#menu").show();

        // animate current restaurant over to reveal menu
        gsap.to(".rest", {
            x: 310,
            duration: 0.5,
            ease: "back.out"
        });

    } else {
        // console.log("Hamburger to Close");
       
         $(this).attr("src", "img/menu2.gif");

         // animate restaurant back and hide menu
        gsap.to(".rest", {
            x: 0,
            duration: 0.5,
            ease: "sine.out",
            onComplete: function() {
                // hide menu
                $("#menu").hide();
            }
        });
         

    }

});

// set up main menu links
// go back to landing screen
$("#backToLanding").click(function() {

    // change button image source to hamburger image
    $(".hamburger").attr("src", "img/menu2.gif");

    // animate restaurant back, fade out and load landing screen
    gsap.to(".rest", {
        x: 0,
        duration: 0.5,
        ease: "sine.out",
        onComplete: function() {
            // hide menu
            $("#menu").hide();
            
            // fade out and go to landing screen
            gsap.to("main", {
                opacity: 0,
                duration: 0.5,
                onComplete: loadLanding
            });
        }
    });
});

// reveal FoE about info      
$("#about").click(function() {
    alert("About Family of Eateries"); 
});
// reveal FoE contact info      
$("#contact").click(function() {
    alert("Scroll to bottom to see contact info"); 
});