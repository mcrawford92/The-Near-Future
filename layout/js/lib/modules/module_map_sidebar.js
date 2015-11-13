//Map Sidebar

var Map_Sidebar = function (args) {
	Module.apply(this, arguments);

	var settings = {};

	$.extend(this.settings, settings);
	
	var $el = this.$el;
	var _ = this;

	this.handleEvent = function (e) {
		switch (e.type) {
			case "click":
				this.e_Click(e);
		}
	};

	this.e_Click = function (e) {
	};

	this.goTo_City = function (cityTitle, stateTitle, cityId) {
		var placeHolderPage = "
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