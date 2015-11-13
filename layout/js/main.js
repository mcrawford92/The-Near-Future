$(window).load(function(){
	//instantiate the page and effects
	var pageBody = new Page_Body({ pageTitle : "Page Controller" }, $('body'));
	var pageSplash = new Page_Splash({ pageTitle : "Home Splash" }, $('.splash_header'));
	enableScroll();
}); 

//Google maps loads as quicker than these were instantiated
//so this is my work around for now
//sloppy... I know...
var pageMap = new Page_Map({ pageTitle : "Map" }, $('.page_map'));
disableScroll();











