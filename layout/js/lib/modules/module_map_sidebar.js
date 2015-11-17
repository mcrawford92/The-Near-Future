//Map Sidebar

var Map_Sidebar = function (args) {
	Module.apply(this, arguments);

	var settings = {};

	$.extend(this.settings, settings);
	
	var $el = this.$el;
	var _ = this;

	this.city = null;

	this.handleEvent = function (e) {
		switch (e.type) {
			case "click":
				this.e_Click(e);
		}
	};

	this.e_Click = function (e) {
	};

	this.goTo_MapSideBar = function () {
		var ajaxResults = [
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
					},
					{
						type : "city",
						title : "New York City, New York",
						city : "New York City",
						state : "New York",
						specialties : 	[
											"Interactive",
											"Illustration",
											"Advertising"
										],
						numberOfCreatives : "25"
					},
					{
						type : "city",
						title : "Kansas City, Missouri",
						city : "Kansas City",
						state : "Missouri",
						specialties : 	[
											"Interactive",
											"Illustration",
											"Advertising"
										],
						numberOfCreatives : "25"
					}
				];
	};

	this.goTo_City = function (cityTitle, stateTitle, cityId) {

		this.city = new Page_City( { "cityId" : cityId } );

		var placeHolderPage = "	
								<nav>
									<a href=\"#\" id=\"back_arrow\">
										<img src=\"images/icon_arrow_left_white.png\" />
									</a>
									<h1>
										<span>City Overview</span>
									<h1>
								</nav>
								<header>
									<h2>" + cityTitle + "<span>Missouri</span></h2>
								</header>
								<main>

								</main>
								<footer>

								</footer>
							";
		TweenLite.to($el.find("footer")[0], .2,
			{
				"opacity" : "0",
				"display" : "none"
			}
		);
		TweenLite.to($el.find("article")[0], .2,
			{
				"opacity" : 0,
				onComplete : function () {
					$el.html(placeHolderPage);
					var cityElementsFadeInSettings = { "opacity" : 1 };
					var cityPageSlideSettings = { "padding-left" : "30px"}
					TweenLite.to($el.find("header")[0], .5, cityElementsFadeInSettings);
					TweenLite.to($el[0], .5, cityPageSlideSettings);
				}
			}
		);
	};

	return this;
};

	Map_Sidebar.prototype = Object.create(Module.prototype);
	Map_Sidebar.prototype.constructor = Map_Sidebar;