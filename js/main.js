(function( $, win, doc ) {
    "use strict";

    var
        // CONSTANT Declarations
        ABOUT               =   'about',
        ALT                 =   'alt',
        ANIMATE             =   'animate',
        AUTO                =   'auto',
        BOLD                =   'b',
        CENTERED            =   'centered',
        CONTACT             =   'contact',
        DIV                 =   'div',
        FIGURE              =   'figure',
        FIGCAPTION          =   'figcaption',
        FIXED               =   'fixed',
        HASH                =   '#',
        HEIGHT              =   'height',
        HIDE                =   'hide',
        HREF                =   'href',
        HTWO                =   'h2',
        IMG                 =   'img',
        ID                  =   'id',
        LISTITEM            =   'li',
        OFFSETTOP           =   'data-offset-top',
        OFFSETBOTTOM        =   'data-offset-bottom',
        PIXEL               =   'px',
        PROJECT             =   'data-project',
        SHOW                =   'show',
        STAY                =   'stay',
        TOP                 =   'top',
        UNORDERED           =   'ul',

        TRACKEVENT          =   '_trackEvent',
        GASCROLL            =   'Scroll to section',
        ZACH                =   'Zach Stubenvoll',
        
        // Variable Declarations
        noop            =   function() {},
        console         =    win.console || {"log": noop, "warn": noop, "error": noop},

        wndw                =   $(win),
        html                =   $('html'),
        body                =   $('body'),
        htmlbody            =   html.add(body),
        nav                 =   $('nav'),
        mainNav             =   $('#main-nav'),
        mainNavList         =   mainNav.find('ul'),
        logo                =   $('#zach'),
        mainNavItems        =   mainNavList.find('li'),
        main                =   $('#main'),
        mainHeader          =   main.find('#main-header'),
        mainTitle           =   mainHeader.find('h2 b'),
        mainSubTitle        =   mainHeader.find('h2 strong'),
        mainSubnav          =   mainHeader.find('h2 ul'),
        mainSubnavLinks     =   mainSubnav.find('li'),
        mainContact         =   $('#contact-me'),
        mobileLogo          =   mainHeader.find('h1'),
        mobileNav           =   mainHeader.find('h2 i'),
        mobileContact       =   mainContact.find('i'),
        sections            =   main.find('ol li'),
        sectionHeader       =   sections.find('h2'),
        sectionImages       =   sections.find('img'),
        sectionArticles     =   sections.find('article'),
        currentSection      =   '',
        currentSubSection   =   '',
        footer              =   $('#contact'),
        footerNav           =   footer.find('#contact-nav'),
        footerNavItems      =   footerNav.find('li'),
        footerLogo          =   footer.find('#footer-header'),
        footerCopy          =   footer.find('p'),
        credits             =   footer.find('#credits'),
        partyMode           =   credits.find('i'),
        modalLink           =   $('.modal'),
        navItems            =   nav.find('li'),
        windowHeight        =   win.innerHeight,
        wndwThird           =   windowHeight / 3,
        mainHeight,
        mainHeaderOffset,
        modal,
        modalImage,
        partyOverlay,

        scrollDistance      =    0;

    function setSectionPositions() {

        var zindex  =   300;

        main.css(TOP, windowHeight);
        footer.css(TOP, windowHeight);
        mainHeight          =   Math.floor((main.offset().top + main.outerHeight(true)) - 100);
        main.attr(OFFSETBOTTOM, mainHeight);

        mainHeaderOffset    =   Math.floor(main.offset().top);
        mainHeader.attr(OFFSETTOP, mainHeaderOffset);

        sections.each(function(index) {
            var
                section                 =   $(this),
                sectionID               =   section.attr(ID),
                sectionFigure           =   section.find(FIGURE);

            section.css('z-index', zindex++);
            section.attr(OFFSETTOP, Math.floor(section.offset().top) - 42);
            section.attr(OFFSETBOTTOM, parseInt(section.attr(OFFSETTOP),10) + parseInt(section.outerHeight(true), 10));

            sectionFigure.each(function() {
                var
                    figure          =   $(this),
                    figureImg       =   figure.find(IMG);
                
                figure.attr(OFFSETTOP, Math.floor(figure.offset().top) - 62);
                figure.attr(OFFSETBOTTOM, parseInt(figure.attr(OFFSETTOP),10) + parseInt(figure.outerHeight(true),10));

            });
        });
    }

    function scrollEffects() {
        scrollDistance  =   wndw.scrollTop();
        scrollDistance  =   scrollDistance ? scrollDistance : 0;

        if ( (scrollDistance >= mainHeader.attr(OFFSETTOP))  && ( main.attr(OFFSETBOTTOM) >= scrollDistance) ) {
            mainHeader.addClass(STAY).removeClass(ABOUT);
            mainNav.removeClass(SHOW);
        } else if ( (scrollDistance >= mainHeader.attr(OFFSETTOP))  && ( main.attr(OFFSETBOTTOM) <= scrollDistance) ) {
            mainHeader.addClass(STAY).addClass(ABOUT);
            mainNav.removeClass(SHOW);
        } else {
            mainHeader.removeClass(ABOUT).removeClass(STAY);
            mainNav.addClass(SHOW);
        }

        sections.each(function() {
            var
                section             =   $(this),
                figures             =   section.find(FIGURE),
                sectionHeader       =   section.find(HTWO),
                sectionText         =   sectionHeader.text(),
                sectionTop          =   section.attr(OFFSETTOP),
                sectionBottom       =   section.attr(OFFSETBOTTOM),
                subSectionText      =   figures.eq(0).text();
            
            if ( currentSection !==  sectionText ) {

                if ( (scrollDistance >= sectionTop)  && ( sectionBottom >= scrollDistance ) ) {

                    currentSection = sectionText;
                    currentSubSection =  subSectionText;

                    mainTitle.text(sectionText);
                    mainSubTitle.text(subSectionText);

                    return false;

                }
                
            } else {

                figures.each(function() {
                    var
                        f               =   $(this),
                        figureTop       =   f.attr(OFFSETTOP),
                        figureBottom    =   f.attr(OFFSETBOTTOM),
                        figureCaption   =   f.find(FIGCAPTION),
                        figureText      =   figureCaption.text();

                    if ( currentSubSection !==  figureText ) {

                        if ( (scrollDistance >= figureTop) && ( figureBottom >= scrollDistance ) ) {
                            currentSubSection =  figureText;

                            mainSubTitle.text(figureText).addClass(ANIMATE);
                            setTimeout(function() {
                                mainSubTitle.removeClass(ANIMATE);
                            }, 500);

                            return false;
                        }

                    }

                });
            }
            
        });
    }

    function setup( h ) {
        var
            w               =   wndw.innerWidth(),
            mainNavItems    =   mainNavList.find(LISTITEM),
            subnavItems     =   mainSubnav.find(LISTITEM),
            mainLogo        =   '<li id="logo" data-project="contact"><a href="#contact" title="Zach Stubenvoll" id="zach">Zach Stubenvoll</a><a href="mailto:zachstubenvoll@me.com" title="For Hire" id="for-hire"><b>For Hire</b></a></li>';

        if ( (mainNavItems.length <= 0) && (subnavItems.length <= 0) ) {

            sections.each(function(index) {
                var
                    section                 =   $(this),
                    sectionID               =   section.attr(ID),
                    sectionFigure           =   section.find(FIGURE),
                    sectionHeader           =   section.find(HTWO),
                    sectionText             =   sectionHeader.text(),
                    sectionHeaderNavTitle   =   sectionHeader.attr('nav-title'),
                    navItemText             =   sectionHeaderNavTitle !== undefined ? sectionHeaderNavTitle : sectionHeader.text();

                section.attr(OFFSETTOP, Math.floor(section.offset().top) - 42);
                section.attr(OFFSETBOTTOM, section.attr(OFFSETTOP) + section.outerHeight(true));

                mainNavList.append('<li data-project="' + sectionID + '"><a href="#' + sectionID + '" title="' + navItemText + '">' + sectionText + '</a></li>');
                mainSubnav.append('<li data-project="' + sectionID + '"><a href="#' + sectionID + '" title="' + navItemText + '">' + navItemText + '</a></li>');

            });

            mainNavList.find(LISTITEM).eq(4).before(mainLogo);
        }

        if ( w > 767 ) {

            mainNavList.find(LISTITEM).css({
                'height' : h + PIXEL
            });

            footerNavItems.css({
                'height' : (h - (h/3)) + PIXEL
            });
            
            footerLogo.css(HEIGHT, ((h - (h/3)) + 50) + PIXEL);
            footerCopy.css(HEIGHT, (h - 50) + PIXEL);

            mainNav.addClass(SHOW);
            footerNav.addClass(SHOW);
            main.removeClass(HIDE);
            footer.removeClass(HIDE);


            sectionArticles.each(function() {
                var s = $(this);
                if ( !s.find('b').length ) {
                    s.append('<b>close</b>');
                }
            });

        } else {
            navItems.css(HEIGHT, AUTO);
            footerLogo.css(HEIGHT, AUTO);
            footerCopy.css(HEIGHT, AUTO);
        }
    }

    function scrollToSection( target ) {

        var
            s                       =   $(HASH + target),
            elementDistanceFromTop  =   s.offset().top;

        htmlbody.animate({scrollTop: elementDistanceFromTop}, 300);
        scrollEffects();

        // Send a google analytic event to see what sections people are clicking on
        try {
            win._gaq.push([TRACKEVENT, ZACH, GASCROLL, target.attr(ID)]);
        } catch(e) {}
    }

    function createModal(url) {
        body.append('<div id="modal"><a class="close" href="#" title="Close">Close</a></div>');
        modal = $('#modal');

        var img = new win.Image();
            img.onload = function() {
                modal.prepend(img);
                modalImage = modal.find(IMG);
                
                repositionModalImage();
                
                modalImage.click(function(e){
                    e.stopPropagation();
                });
                modal.addClass(SHOW);
            };

        img.src = url;

        html.addClass(FIXED);

        modal.find('.close').click(function(e) {
            e.preventDefault();
        });
        
        modal.click(function() {
            dismissModal();
        });
    }

    function repositionModalImage() {
        if (!modalImage) {
            modalImage = modal.find(IMG);
        }
        if (modalImage.height() < wndw.height()) {
            modalImage.addClass(CENTERED);
            modalImage.css({
                marginTop : '-' + (modalImage.height() / 2) + PIXEL,
                marginLeft : '-' + (modalImage.width() / 2) + PIXEL
            });
        } else {
            modalImage.removeClass(CENTERED);
            modalImage.css({
                marginTop : '0px',
                marginLeft : 'auto'
            });
        }
    }
    
    function dismissModal() {
        if (modal.length > 0) {

            html.removeClass(FIXED);
            modal.removeClass(SHOW).addClass(HIDE);

            setTimeout(function() {
                modal.remove();
            }, 200);
            
            wndw.off('resize', repositionModalImage);
        }
    }

    modalLink.on('click', function(e) {
        e.preventDefault();
        createModal($(this).attr('data-image'));
    });

    $(doc.documentElement).keyup(function (event) {
        if (event.keyCode === 27) {
            dismissModal();
        }
    });

    partyMode.click(function() {
        html.addClass(FIXED);
        body.append('<div id="party-mode"><b></b></div>');
        partyOverlay = $('#party-mode');
        partyOverlay.addClass(SHOW);

        partyOverlay.on('click', function() {
            $(this).removeClass(SHOW);
            html.removeClass(FIXED);
        });
    });
    
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

    mainContact.click(function(e){
        e.preventDefault();
        scrollToSection(CONTACT);
    });

    mainSubnav.on('click', LISTITEM, function(e) {
        var t = $(this);
        e.preventDefault();
        t.closest(UNORDERED).toggleClass(SHOW);
        scrollToSection(t.attr(PROJECT));
    });

    mainNav.on('click', 'a', function(e) {
        var t = $(this);
        if ( t.attr(ID) !== 'for-hire' ) {
            e.preventDefault();
            scrollToSection(t.closest(LISTITEM).attr(PROJECT));
        }
    });

    logo.on('click', LISTITEM, function(e){
        e.preventDefault();
        scrollToSection(CONTACT);
    });

    sectionArticles.on('click', 'b', function() {
        $(this).closest('article').removeClass(SHOW);
    });

    sectionImages.click(function() {
        $(this).find('+ article').addClass(SHOW);
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
        windowHeight        =   $(this).innerHeight();
        wndwThird           =   windowHeight / 3;
        main.css(TOP, windowHeight);
        footer.css(TOP, windowHeight);
        setSectionPositions();
        repositionModalImage();
        setup(wndwThird);
    });

    wndw.scroll(function() {
        scrollEffects();
    });

    sectionImages.on('load', function() {
        setSectionPositions();
    });

    setup(wndwThird);

})(jQuery, window, document);