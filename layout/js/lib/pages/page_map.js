	//Map View
	var Page_Map = function (args) {
		Page.apply(this, arguments);
	
		this.settings = {
			animation : {
				hoverSpeed : .3,
				states : {
					sidebarHover : {
						"width" : "30%"
					},
					sidebarStatic : {
						"width" : "25%"
					}
				}
			}
		};

		$.extend(this.settings, args);

		var _ = this;
		var $el = this.$el;

		var $mapContainer = $('.map_container');


		//Build Page
		this.init = function() {
			this.map = new Map({}, $('#map'));
	
			this.sidebar = new Map_Sidebar({}, $('.map_sidebar'));
				//Event listeners for the page (read: hover events)
				//I'm putting the function to animate in the parent object becasue it involves
				//two modules on the page.. otherwise it should be in the module object!
				this.sidebar.$el
					.on("mouseenter", function (e) { 
						if (!_.sidebar.$el.hasClass("sidebar_city")) {
							_.animateSidebarEnter(e);
						}
					})
					.on("mouseleave", function (e) {
						if (!_.sidebar.$el.hasClass("sidebar_city")) {
							_.animateSidebarLeave(e);
						}
					});
	
			this.filters = new Map_Filters({}, $('.map_filters'));
			this.filterControls = this.filters.$el.find('li>a');
	
				//add event handlers and listeners for filters
				this.Events.addObserver_Click(this.filters);
				for (x = 0; x < this.filterControls.length; x++) {
					this.buildFilterListeners(x);
				}

			//add event handlers if user clicks on city name
			this.Events.addObserver_Click(this);

		}

		//What
		
		this.buildFilterListeners = function (x) {
			$(this.filterControls[x])
				.on("mouseenter", function(e) { _.filters.handleEvent(e, x); })
				.on("mouseleave", function(e) { _.filters.handleEvent(e, x); });
		};


		//Neato little effect for when you hover over the sidebar
		//it's like it's saying hello!
		this.animateSidebarEnter = function (e) {
			
			var hoverSpeed = this.settings.animation.hoverSpeed;

			var sidebarWidth = 27;
			var mapContainerWidth = 100 - sidebarWidth;

			//animate the sidebar with the new settings
			TweenLite.to(this.sidebar.$el[0], hoverSpeed, { "width" : (sidebarWidth + "%"), ease: Power3.easeOut });
			TweenLite.to($mapContainer[0], hoverSpeed, { "width" : (mapContainerWidth + "%"), ease: Power3.easeOut });

		};

		//The reverse of the enter effect! It's like it's saying goodbye! So cute!
		this.animateSidebarLeave = function (e) {
			
			var hoverSpeed = this.settings.animation.hoverSpeed / 1.5;

			var sidebarWidth = 25;
			var mapContainerWidth = 100 - sidebarWidth;

			//animate the sidebar back to the original settings
			TweenLite.to(this.sidebar.$el[0], hoverSpeed, { "width" : (sidebarWidth + "%"), ease: Power3.easeOut });
			TweenLite.to($mapContainer[0], hoverSpeed, { "width" : (mapContainerWidth + "%"), ease: Power3.easeOut });

		};

		this.animateCityIntro = function () {
			
			var hoverSpeed = this.settings.animation.hoverSpeed;

			var sidebarWidth = 70;
			var mapContainerWidth = 100 - sidebarWidth;

			//Animate the sidebar into the width for a city
			TweenLite.to(this.sidebar.$el[0], hoverSpeed, { "width" : (sidebarWidth + "%"), ease: Power3.easeOut });
			TweenLite.to($mapContainer[0], hoverSpeed, { "width" : (mapContainerWidth + "%"), ease: Power3.easeOut });

			this.sidebar.$el.addClass("sidebar_city");
			this.filters.animateHide();
			this.map.animateFullHeight();
		};

		this.animateCityOutro = function () {
			
			var hoverSpeed = this.settings.animation.hoverSpeed;

			var sidebarWidth = 25;
			var mapContainerWidth = 100 - sidebarWidth;

			//Animate the sidebar into the width for a city
			TweenLite.to(this.sidebar.$el[0], hoverSpeed, { "width" : (sidebarWidth + "%"), ease: Power3.easeOut });
			TweenLite.to($mapContainer[0], hoverSpeed, { "width" : (mapContainerWidth + "%"), ease: Power3.easeOut });

			this.sidebar.$el.removeClass("sidebar_city");
		};

		this.handleEvent = function (e) {
			switch (e.type) {
				case "click":
					this.e_Click(e);
					break;
			}
		};

		this.e_Click = function (e) {
			t = e.target;
	
			//make sure the baby elements are blocking it from acting
			if(e.target.nodeName!=="A") {
				t = e.target.parentElement;
			}

			var $t = $(t);
	
			//see if it is a page link
			if (t.nodeName =="A") {

				//check if the link is to a city
				if ($t.hasClass("l_city")) {
					var cityTitle = $t.data("city");
					var stateTitle = $t.data("state");
					var cityId = $t.data("post-id");

					this.sidebar.goTo_City(cityTitle, stateTitle, cityId);
					this.animateCityIntro();
				}

				else if (t.id == "back_arrow") {
					this.animateCityOutro();
				}

			}
			return false;
		};

		this.init();
		return {
			init : function () {
				_.map.init();
			},
			allowScrollwheel : function () {
				_.map.allowScrollwheel();
			},
			cityZoom : function (id) {
				_.map.cityZoom(id)
			}
		}
	};
		Page_Map.prototype = Object.create(Page.prototype);
		Page_Map.prototype.constructor = Page_Map;