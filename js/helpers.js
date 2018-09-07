        //top

        onload = function () {
            if (!document.createElement('SVG').getAttributeNS) {
                reject();
            }
        };
        var contextPath = '';
        var eventId = '';
        var CkeditorSourceModeLabel = 'Tryb HTML';
        //Owl carousel

        $(document).ready(function(){
            $('.owl-carousel').owlCarousel({
                loop:true,
                margin:10,
                responsiveClass:true,
                responsive:{
                    0:{
                        items:1,
                        nav:true
                    },
                    920:{
                        items:2,
                        nav:false
                    },
                    1300:{
                        items:3,
                        nav:true,
                        loop:false
                    },
                    1700:{
                        items:4,
                        nav:true,
                        loop:false
                    }
                }
            })           
            
          });



          















    