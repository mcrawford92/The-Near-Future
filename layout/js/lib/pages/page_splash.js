	//Splash Page
	var Page_Splash = function(args) {
		Page.apply(this, arguments);

		this.settings = {
			animationSpeed : .5
		};

		$.extend(this.settings, args);
		
		var $el = this.$el;
		var _ = this;

		//Make this page listen for scrolling
		this.Events.addObserver_Scroll(this);

		var scrollOnce = false;

		//Build Page Elements
		var splashLogo = new Splash_SplashLogo({}, $('.splash_header>figure img'));
			this.Events.addObserver_MouseMove(splashLogo);

		this.handleEvent = function(e) {
			switch (e.type) {
				case 'scroll':
					_.e_Scroll(e);
			}
		};

		this.e_Scroll = function (e) {

			var scrollDelay = 150;

			if (scrollOnce == false) {
				if (window.pageYOffset < $el.height()&&window.pageYOffset>scrollDelay) {
					disableScroll();
					splashLogo.animateTransitionToTopLeft(_.settings.animationSpeed);
					TweenLite.to(window, _.settings.animationSpeed, 
						{ 
							scrollTo: { y : $el.height()},
							ease: Power2.easeOut,
							onComplete : function() {
								enableScroll();
								if (pageMap) { pageMap.allowScrollwheel(); }
								$el.css({"position" : "absolute", "width" : "auto", "height" : "auto"});
							}

						});
					scrollOnce = true;
				}
				else if (window.pageYOffset<scrollDelay) {
					TweenLite.to(window, 1, 
						{ 
							scrollTo: { y : 0},
							ease: Power2.easeOut,
							overwrite : "all"
						});
				}
			}

		};



	};
		Page_Splash.prototype = Object.create(Page.prototype);
		Page_Splash.prototype.constructor = Page_Splash;