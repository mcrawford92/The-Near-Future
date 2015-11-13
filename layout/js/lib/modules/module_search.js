
	//Global Page Objects
	var Search_SearchBar = function (args) {
		Module.apply(this, arguments);

		var gAnimationSpeed = .75;

		var settings = {
			hideOnStart : true,
			animation : {
				animationSpeed : gAnimationSpeed,
				animationIntro : {
					expand : {
						display : "block",
						width : "100%",
						ease: Power2.easeOut,
						onComplete : function () {
							$el.find("input")[0].focus();
						}
					},
					formFade : {
						opacity : 1,
						delay : gAnimationSpeed * .5
					}
				},
				animationOutro : {
					collapse : {
						display : "none",
						width : "0",
						ease: Power2.easeOut,
						delay : gAnimationSpeed * .5,
						onComplete : function () {
							$el.css({"float" : "left"});
						}
					},
					formFade : {
						opacity : 0
					}
				}
			}
		};

		$.extend(this.settings, settings);
	
		var $el = this.$el;
		var _ = this;

		this.results = new Search_Results({}, $('.search_results'));

		//The animation for when it drops down
		this.animateIntro = function () {
			var a = _.settings.animation.animationIntro;
			var aOptions = _.settings.animation;
			TweenLite.to($el[0], aOptions.animationSpeed, a.expand);
			TweenLite.to($el.find('form')[0], aOptions.animationSpeed, a.formFade);

		};

		//the animation for when it leaves
		this.animateOutro = function () {
			var a = _.settings.animation.animationOutro;
			var aOptions = _.settings.animation;
			$el.css({"float":"right"});
			TweenLite.to($el[0], aOptions.animationSpeed, a.collapse);
			TweenLite.to($el.find('form')[0], aOptions.animationSpeed, a.formFade);

			this.results.animateOutro();
		};

		//process which functions should hand which event
		this.handleEvent = function (e) {
			switch (e.type) {
				case "keyup":
					_.e_KeyUp(e);
					break;
				case "click":
					_.e_Click(e);
			}
		};

		this.e_Click = function (e) {
			if (e.target.id == "close_search") {
				this.animateOutro();
			}
		};

		this.e_KeyUp = function (e) {
			//see what key was pressed and then do the appropriate action
			var spaceBar = 32;
			var letter_s = 83;
			var letter_f = 70;
			var letter_x = 88;
			var esc = 27
			if (!$el.find("input").is(":focus")&&e.keyCode!=esc) {
				switch (e.keyCode) {
					case spaceBar:
						//The spaceBar key was pressed
						//so let's open the mother fucker
						this.animateIntro();
						break;
					case letter_s:
						//the letter s key was pressed
						this.animateIntro();
						break;
					case letter_f:
						//the letter f key was pressed
						this.animateIntro();
						break;
					case letter_x:
						//the letter x key was pressed
						this.animateOutro();
				}
			}
			else if(e.keyCode==esc) {
				this.animateOutro();
			}
			else {
				this.results.searchFor($el.find('input').val());
			}
		};

		return this;
	};
	
		Search_SearchBar.prototype = Object.create(Module.prototype);
		Search_SearchBar.prototype.constructor = Search_SearchBar;

	//Search Results
	//Weird relationship between this and Search Bar!
	//Not instantiated on the page.. instantiated within search bar
	var Search_Results = function (args) {
		Module.apply(this, arguments);

		var settings = {
			animation : {
				animationSpeed : .3,
				animationIntro : {
					expand : {
						display : "block",
						top: "0",
						opacity: "1"
					}
				},
				animationOutro : {
					collapse : {
						display : "none",
						top : "10%",
						opacity : "0"
					}
				}
			}

		};

		$.extend(this.settings, settings);

		//fake AJAX data as filler until I actually get the back end working
		var ajaxResults = [
					{
						type : "agency",
						title : "Deep Group",
						city : "Springfield",
						state : "Missouri",
						specialties : 	[
											"Branding",
											"Illustration",
											"Advertising"
										],
						firmSize : "10-20"
					},
					{
						type : "person",
						title : "Michael Crawford",
						city : "Springfield",
						state : "Missouri",
						specialties : 	[
											"Concepting",
											"Interactive",
											"Web Development",
											"Poster"
										],
						firms : [
									{
										title : "Deep Group",
										position : "Creative Intern",
									},
									{
										title : "Alchemedia Project",
										position : "Interactive Design Intern"
									},
									{
										title : "417 Magazine",
										position : "Advertising Intern"
									}
								]
					},
					{
						type : "person",
						title : "Alexis Reid",
						city : "New York City",
						state : "New York",
						specialties : 	[
											"Identity",
											"Branding",
											"Concepting",
											"Art Direction",
											"Interactive"
										],
						firms : [
									{
										title : "Mucca Design",
										position : "Creative Intern"
									},
									{
										title : "McCann",
										position : "Junior Art Director"
									},
									{
										title : "Willoughby Design",
										position : "Creative Intern"
									}
								]
					},
					{
						type : "person",
						title : "Dan Stewart",
						city : "Springfield",
						state : "Missouri",
						specialties : 	[
											"Identity",
											"Concepting",
											"Art Direction"
										],
						firms : [
									{
										title : "Deep Group",
										position : "Creative Director"
									}
								]
					},
					{
						type : "agency",
						title : "The Alchemedia Project",
						city : "Springfield",
						state : "Missouri",
						specialties : 	[
											"Interactive",
											"Illustration",
											"Advertising"
										],
						firmSize : "25+"
					},
					{
						type : "city",
						title : "Springfield, Missouri",
						city : "Springfield",
						state : "Missouri",
						specialties : 	[
											"Interactive",
											"Illustration",
											"Advertising"
										],
						numberOfCreatives : "25"
					}
				];

		this.animateIntro = function () {

			var a = _.settings.animation.animationIntro;
			var aOptions = _.settings.animation;

			TweenLite.to($el[0], aOptions.animationSpeed, a.expand);
		};

		this.animateOutro = function () {

			var a = _.settings.animation.animationOutro;
			var aOptions = _.settings.animation;

			TweenLite.to($el[0], aOptions.animationSpeed, a.collapse);
		};

		this.searchFor = function(query) {
			//AJAx Method call that returns an object
			//like the fake info
			var results = this.queryDatabase(query);

			var output = "";

			var temp_title = "";
			var searchString = [];

			//format the results and pump them into
			for (x = 0; x < results.length; x++) {

				temp_title = results[x].title;
				
				searchString = temp_title.toLowerCase().search(query.toLowerCase());

				if (searchString!=-1) {
					temp_title = temp_title.substr(0, searchString) + "<span>" + temp_title.substr(searchString, query.length) + "</span>" + temp_title.substr(searchString + query.length, temp_title.length);
				}

				output += "<li><a href=\"#\" id=\"" + results[x].type + "\" data-postid=\"null\">" + temp_title + " <small>" + results[x].type + "</small></a></li>";
			}

			$el.find("ul").html(output);
			this.animateIntro();
		};

		this.queryDatabase = function(query) {
			//Code goes here for all the crazy AJAX calls

			//But not yet

			//so this is filler

			//remember to be able to pass a limit of how many results I want
			//probably like 10... OR OIT COULD LIMIT TO YOUR SCREEN SIZE
			//I'M SO FUCKING BRILLIANT

			return ajaxResults;
		};
	
		var $el = this.$el;
		var _ = this;

	};
	
		Search_Results.prototype = Object.create(Module.prototype);
		Search_Results.prototype.constructor = Search_Results;