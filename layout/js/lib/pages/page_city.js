	//Main Page
	var Page_City = function(args) {
		Page.apply(this, arguments);
	
		$.extend(this.settings, args);

		var _ = this;

		this.Events.addObserver_Click(this);
	
		//Build Page Elements
		this.init = function (cityID) {
			var ajaxResults = {
				cityStats : {
					population : "164,122",
					costOfLiving : "87.6",
					crimeRate : "101",
					medianHousehold : "33,379",
					politicalParty : "60% Republican",
					socialPosition : "Very Socially Conservative"
				}
			};

			var stats = "
				<section class=\"city_stats\">
					<h4>WHAT</h4>
				</section>
			";

			var output = stats;

			var $page = $el.find("main");

			console.log("What");
			$page.html(output);

		}

		this.handleEvent = function(e) {
			switch (e.type) {
				case 'click':
					this.e_Click(e);
			}
		};

		this.e_Click = function (e) {

		}

		this.init(this.settings.cityId);

		console.log("what");

		return {
			init : _.init(id),
			handleEvent : _.handleEvent(e)
		};
	};
		Page_City.prototype = Object.create(Page.prototype);
		Page_City.prototype.constructor = Page_City;