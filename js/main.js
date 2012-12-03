(function( $, win, doc ) {
    "use strict";

    var
        // CONSTANT Declarations
        ALT                 =   'alt',
        AUTO                =   'auto',
        BOLD                =   'b',
        COLONSPACE          =   ': ',
        CONTACT             =   'contact',
        DIV                 =   'div',
        FIGURE              =   'figure',
        FIGCAPTION          =   'figcaption',
        HASH                =   '#',
        HEIGHT              =   'height',
        HIDE                =   'hide',
        HREF                =   'href',
        HTWO                =   'h2',
        IMG                 =   'img',
        ID                  =   'id',
        LISTITEM            =   'li',
        OFFSETTOP           =   'offset-top',
        OFFSETBOTTOM        =   'offset-bottom',
        PIXEL               =   'px',
        PROJECT             =   'project',
        SHOW                =   'show',
        STAY                =   'stay',
        UNORDERED           =   'ul',

        TRACKEVENT          =   '_trackEvent',
        GASCROLL            =   'Scroll to section',
        ZACH                =   'Zach Stubenvoll',
        
        // Variable Declarations
        wndw                =   $(win),
        html                =   $('html'),
        body                =   $('body'),
        htmlbody            =   html.add(body),
        nav                 =   $('nav'),
        mainNav             =   $('#main-nav'),
        mainNavList         =   mainNav.find('ul'),
        logo                =   $('#logo'),
        mainNavItems        =   mainNavList.find('li'),
        main                =   $('#main'),
        mainHeader          =   main.find('#main-header'),
        mainTitle           =   mainHeader.find('h2 b'),
        mainSubnav          =   mainHeader.find('h2 ul'),
        mainSubnavLinks     =   mainSubnav.find('li'),
        mainSubTitle        =   mainHeader.find('h2 strong'),
        mainContact         =   $('#contact-me'),
        mobileLogo          =   mainHeader.find('h1'),
        mobileNav           =   mainHeader.find('h2 i'),
        mobileContact       =   mainContact.find('i'),
        sections            =   main.find('ol li'),
        sectionHeader       =   sections.find('h2'),
        sectionImages       =   sections.find('img'),
        footer              =   $('#contact'),
        footerNav           =   footer.find('#contact-nav'),
        footerNavItems      =   footerNav.find('li'),
        footerLogo          =   footer.find('#footer-header'),
        footerCopy          =   footer.find('p'),
        navItems            =   nav.find('li'),
        windowHeight        =   win.innerHeight,
        wndwThird           =   windowHeight / 3,
        mainHeight,
        mainHeaderOffset,

        scrollDistance      =    0;

    function setSectionPositions() {

        mainHeight          =   Math.floor(main.offset().top + main.outerHeight(true));
        main.data(OFFSETBOTTOM, mainHeight);

        mainHeaderOffset    =   Math.floor(main.offset().top);
        mainHeader.data(OFFSETTOP, mainHeaderOffset);

        sections.each(function(index) {
            var
                section                 =   $(this),
                sectionID               =   section.attr(ID),
                sectionFigure           =   section.find(FIGURE);

            section.data(OFFSETTOP, Math.floor(section.offset().top) - 42);
            section.data(OFFSETBOTTOM, section.data(OFFSETTOP) + section.outerHeight(true));

            sectionFigure.each(function() {
                var
                    figure          =   $(this),
                    figureImg       =   figure.find(IMG);
                
                figure.data(OFFSETTOP, Math.floor(figure.offset().top) - 62);
                figure.data(OFFSETBOTTOM, figure.data(OFFSETTOP) + figure.outerHeight(true));

                figureImg.each(function() {
                    var
                        COLON               =   '',

                        image               =   $(this),
                        imageAlt            =   image.attr(ALT),
                        imageCreditText,
                        imageContainer,
                        imageCredit;

                    if ( imageAlt === undefined || imageAlt === '' ) {
                        imageAlt = '';
                    } else {
                        imageAlt            =   imageAlt.split(COLONSPACE);
                        imageContainer      =   image.closest(DIV);
                        imageCredit         =   imageContainer.find(BOLD);

                        if ( imageAlt[1] === undefined ) {
                            imageAlt[1] = '';
                        } else {
                            COLON = COLONSPACE;
                        }

                        imageCreditText     =   '<b>' + imageAlt[0] + COLON + '<i>' + imageAlt[1] + '</i></b>';

                        if ( !imageCredit.length ) {
                            image.wrap('<div />').after(imageCreditText);
                        }
                    }
                });
            });
        });
    }

    function scrollEffects() {
        scrollDistance  =   wndw.scrollTop();
        scrollDistance  =   scrollDistance ? scrollDistance : 0;

        if ( (scrollDistance >= mainHeader.data(OFFSETTOP))  && ( main.data(OFFSETBOTTOM) >= scrollDistance) ) {
            mainHeader.addClass(STAY);
        } else {
            mainHeader.removeClass(STAY);
        }

        sections.each(function() {
            var
                section             =   $(this),
                figures             =   section.find(FIGURE),
                sectionHeader       =   section.find(HTWO),
                sectionTop          =   section.data(OFFSETTOP),
                sectionBottom       =   section.data(OFFSETBOTTOM);

            if ( (scrollDistance >= sectionTop)  && ( sectionBottom >= scrollDistance) ) {
                mainTitle.text(sectionHeader.text());

                figures.each(function() {
                    var
                        f               =   $(this),
                        figureTop       =   f.data(OFFSETTOP),
                        figureCaption   =   f.find(FIGCAPTION);

                    if ( (scrollDistance >= figureTop) ) {
                        mainSubTitle.text(figureCaption.text());
                    }
                });
            }
        });
    }

    function setup( h ) {
        var
            w               =   wndw.innerWidth(),
            mainNavItems    =   mainNavList.find('li'),
            subnavItems     =   mainSubnav.find('li'),
            mainLogo        =   '<li id="logo" data-project="contact"><a href="#contact" title="Zach Stubenvoll"><u>Zach Stubenvoll</u></a></li>';

        if ( (mainNavItems.length <= 0) && (subnavItems.length <= 0) ) {

            sections.each(function(index) {
                var
                    section                 =   $(this),
                    sectionID               =   section.attr(ID),
                    sectionFigure           =   section.find(FIGURE),
                    sectionHeader           =   section.find(HTWO),
                    sectionHeaderNavTitle   =   sectionHeader.data('nav-title'),
                    navItemText             =   sectionHeaderNavTitle !== undefined ? sectionHeaderNavTitle : sectionHeader.text();

                section.data(OFFSETTOP, Math.floor(section.offset().top) - 42);
                section.data(OFFSETBOTTOM, section.data(OFFSETTOP) + section.outerHeight(true));

                mainNavList.append('<li data-project="' + sectionID + '"><a href="#' + sectionID + '" title="' + navItemText + '">' + navItemText + '</a></li>');
                mainSubnav.append('<li data-project="' + sectionID + '"><a href="#' + sectionID + '" title="' + navItemText + '">' + navItemText + '</a></li>');

            });

            mainNavList.find('li').eq(4).before(mainLogo);
        }

        if ( w > 767 ) {

            mainNavList.find(LISTITEM).css({
                'height' : h + PIXEL
            });

            footerNavItems.css({
                'height' : h + PIXEL
            });
            
            footerLogo.css(HEIGHT, h + PIXEL);
            footerCopy.css(HEIGHT, h + PIXEL);

            mainNav.addClass(SHOW);
            footerNav.addClass(SHOW);
            main.removeClass(HIDE);
            footer.removeClass(HIDE);

        } else {
            navItems.css(HEIGHT, AUTO);
            footerLogo.css(HEIGHT, AUTO);
            footerCopy.css(HEIGHT, AUTO);
        }
    }

    function scrollToSection( target ) {
        var
            scrollDistance          =   scrollDistance,
            s                       =   $(HASH + target),
            elementDistanceFromTop  =   s.offset().top;

        htmlbody.animate({scrollTop: elementDistanceFromTop}, 600);
        scrollEffects();

        // Send a google analytic event to see what sections people are clicking on
        try {
            win._gaq.push([TRACKEVENT, ZACH, GASCROLL, target.attr(ID)]);
        } catch(e) {}
    }

    mobileContact.click(function(e){
        e.preventDefault();
        scrollToSection(CONTACT);
    });

    mobileNav.click(function(e){
        e.preventDefault();
        $(this).parent().find(UNORDERED).toggleClass(SHOW);
    });

    mobileLogo.click(function(e){
        e.preventDefault();
        htmlbody.animate({scrollTop: 0}, 600);
    });

    logo.on('click', LISTITEM, function(e){
        e.preventDefault();
        scrollToSection(CONTACT);
    });

    mainContact.click(function(e){
        e.preventDefault();
        scrollToSection(CONTACT);
    });

    mainSubnav.on('click', LISTITEM, function(e) {
        var t = $(this);
        e.preventDefault();
        t.closest(UNORDERED).toggleClass(SHOW);
        scrollToSection(t.data(PROJECT));
    });

    mainNav.on('click', LISTITEM, function(e) {
        var t = $(this);
        e.preventDefault();
        scrollToSection(t.data(PROJECT));
    });

    sectionHeader.click(function() {
        var
            t           =   $(this),
            figures     =   t.closest(LISTITEM).find(FIGURE);

            t.toggleClass(SHOW);

            figures.each(function() {
                var figure = $(this);

                figure.toggleClass(SHOW);
            });

    });

    wndw.resize(function() {
        windowHeight     =   ($(this).innerHeight() / 3);
        scrollEffects();
        setSectionPositions();
        setup(windowHeight);
    });

    wndw.scroll(function() {
        scrollEffects();
    });

    sectionImages.on('load', function() {
        setSectionPositions();
    });

    setup(wndwThird);

})(jQuery, window, document);