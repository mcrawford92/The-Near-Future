	//Animation Modules
	var Splash_SplashLogo = function (args) {
		Animation.apply(this, arguments);
		var settings = {
			animationDistance: 100,
			allowMouseFollow : false,
			adjustYPoint : "middle",
			adjustXPoint : "center",
			mouseFollow : {
				reactAmount : 0.1,
				layerDivide : 1.3,
				reactSpeed : 0.1
			},
			states : {
				startState : {
					"margin-left" : "-100px",
					"opacity" : 0
				},
				staticState : {
					"margin-left" : 0,
					"opacity" : 1
				},
				topCenterState : {
					"top" : 0,
					"width" : "15%",
					easing : Power2.easeInOut
				},
				topLeftState : {
					"top" : 0,
					"left" : 0,
					"-webkit-transform" : "none",
    				"-moz-transform" : "none",
    				"-ms-transform": "none",
    				"-o-transform": "none",
    				"transform": "none",
					"width" : "15%",
					easing : Power2.easeInOut
				},
				middleCenterState : {
					"top" : "30%",
					"width" : "40%"
				},
			}
		};
		$.extend(this.settings, settings);
	
		var $el = this.$el;
		var _ = this;
	
		//Trigger entire animation for the splash intro
		this.animate = function () {
	
			//Loop through all of the layers of the logo
			//and set a delay for the animations
			for (var i = 0; i < $el.length; i++) {
				_.delayAnimation(i);
			}
		}
	
		//Animate a single piece to a certain place
		this.animatePiece = function($piece, animationData, animationSpeed) {
			//use animation data
			TweenLite.to($piece[0], animationSpeed, animationData);
		};
	
		//Delay the animation for the different layers
		this.delayAnimation = function(i) {
			var delay = this.settings.delay;
			setTimeout(function() {
				_.animatePiece($el.eq(i), _.settings.states.staticState, _.settings.animationSpeed);
				if (i==($el.length-1)) {
					//after animation is over let the mouse follow begin
					_.settings.allowMouseFollow = true;
				}
			}, (delay * i));
		};

		//animate transition to top of screen
		this.animateTransitionToTopCenter = function (speed) {

			if (speed==null) { speed = 1; }

			TweenLite.to($el.parent(), speed, this.settings.states.topCenterState);

			//Update which point the animation should center around
			this.changeAdjustYPoint ("top");
			this.changeAdjustXPoint ("center");

			this.setReactAmount(.05);
		};

		//animate transition to top of screen left
		this.animateTransitionToTopLeft = function (speed) {

			if (speed==null) { speed = 1; }

			TweenLite.to($el.parent(), speed, this.settings.states.topLeftState);

			//Update which point the animation should center around
			this.changeAdjustYPoint ("top");
			this.changeAdjustXPoint ("left");

			this.setReactAmount(.05);
		};

		//animate transition to middle center of screen
		this.animateTransitionToMiddleCenter = function (speed) {

			if (speed==null) { speed = 1; }

			TweenLite.to($el.parent(), speed, this.settings.states.middleCenterState);

			//Update which point the animation should center around
			this.changeAdjustYPoint ("middle");
			this.changeAdjustXPoint ("center");

		};

		//process which functions should hand which event
		this.handleEvent = function (args) {
			switch (args.type) {
				case "mousemove":
					this.animateMouseFollow(args);
			}
		};
	
		//animation 
		this.animateMouseFollow = function(args) {
			if (this.settings.allowMouseFollow==true) {

				var reactAmount = this.settings.mouseFollow.reactAmount;
				var layerDivide = this.settings.mouseFollow.layerDivide;
				var reactSpeed = this.settings.mouseFollow.reactSpeed;
				
				for (var i = 0; i < $el.length; i++) {

					if (i>0) {
						reactAmount = reactAmount / (Math.pow(layerDivide, i));
					}

					//determine which point the animation should center around

					//Options for the Y Point
					if (this.settings.adjustYPoint == "middle") {
						var topAdjust = this.adjustForCenter("height", args.pageY) * reactAmount;
					}
					else if (this.settings.adjustYPoint == "top") {
						var topAdjust = (args.pageY/2) * reactAmount;
					}
					else {
						var topAdjust = this.adjustForCenter("height", args.pageY) * reactAmount;
					}

					//Options for the X Point
					if (this.settings.adjustXPoint == "center") {
						var leftAdjust = this.adjustForCenter("width", args.pageX) * reactAmount;
					}
					else if (this.settings.adjustXPoint == "left") {
						var leftAdjust = (args.pageX/2) * reactAmount;
					}
					else {
						var leftAdjust = this.adjustForCenter("width", args.pageX) * reactAmount;
					}

					_.animatePiece($el.eq(i), { top:topAdjust, left:leftAdjust }, reactSpeed);
				}
			}
		};

		//Since we only get the position of the mouse from the top left
		//we need to calculate it's offset from the center of browswer
		this.adjustForCenter = function ( axis, point) {

			var browserWidthorHeight, center;
			
			switch (axis) {
				case 'height' :
					browserWidthorHeight = $(window).height();
					break;
				case 'width' : 
					browserWidthorHeight = $(window).width();
			}

			center = browserWidthorHeight / 2;

			return (point - center);

		};

		this.changeAdjustXPoint = function (point) {
			this.settings.adjustXPoint = point;
		};

		this.changeAdjustYPoint = function (point) {
			this.settings.adjustYPoint = point;
		};

		this.setReactAmount = function (amount) {
			this.settings.mouseFollow.reactAmount = amount;
		};
	
		//Animate when it is first loaded on page
		this.animate();

		return this;
	};
	
		Splash_SplashLogo.prototype = Object.create(Animation.prototype);
		Splash_SplashLogo.prototype.constructor = Splash_SplashLogo;


	var Splash_IntroText = function (args) {
		Animation.apply(this, arguments);
		this.settings = {

		};

		$.extend(this.settings, settings);
	
		var $el = this.$el;
		var _ = this;


		return this;
	};
	
		Splash_IntroText.prototype = Object.create(Animation.prototype);
		Splash_IntroText.prototype.constructor = Splash_IntroText;