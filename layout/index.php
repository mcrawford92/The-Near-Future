<?php include('includes/header.php'); ?><!--
	<article class="splash_header">
		<figure>
			<img src="images/splash_logo_01.png" alt="The Near:Future" />
			<img src="images/splash_logo_02.png" alt="The Near:Future" />
			<img src="images/splash_logo_03.png" alt="The Near:Future" />
			<img src="images/splash_logo_04.png" alt="The Near:Future" />
		</figure><!--
		<figcaption>
			<p>
				A tool for alumni of random places. I don't care. Words.
			</p>
		</figcaption>
	</article>-->
	<article class="page_map">
		<section class="map_container">
			<figure id="map">

			</figure>
			<figcaption class="map_filters">
				<ul>
					<li>
						<h3>Filters</h3>
					</li>
					<li>
						<a href="#"><span>Firm Size</span></a>
					</li>
					<li>
						<a href="#"><span>Specialties</span></a>
					</li>
					<li>
						<a href="#"><span>Industry</span></a>
					</li>
				</ul>
			</figcaption>
			<form class="filters_form">
				<ul>
					<li>
						&nbsp;
					</li>
					<li>
						<header>
							<h6>
								<span>Firm Size</span>
							</h6>
						</header>
						<ul>
							<li>
								<input type="checkbox" name="large_firm" />
								<label name="large_firm">
									<h5>Large Firm</h5>
									<p>
										25+ Team Members
									</p>
								</label>
							</li>
							<li>
								<input type="checkbox" name="medium_firm" />
								<label name="medium_firm">
									<h5>Medium Firm</h5>
									<p>
										10-24 Team Members
									</p>
								</label>
							</li>
							<li>
								<input type="checkbox" />
								<label>
									<h5>Small Firm</h5>
									<p>
										1-9 Team Members
									</p>
								</label>
							</li>
						</ul>
						<footer>

						</footer>
					</li>
					<li>
						<ul>
							<li>What</li>
						</ul>
					</li>
					<li>
						<ul>
							<li>What</li>
						</ul>
					</li>
				</ul>
			</form>
		</section>
		<section class="map_sidebar">
			<article>
				<h3>Cities</h3>
				<ul>
					<li>
						<a href="#" class="l_city" data-city="Springfield" data-state="Missouri" data-post-id="1">
							<h4>Springfield, Missouri</h4>
							<p>
								4 Creatives, 8 Agencies
							</p>
						</a>
					</li>
					<li>
						<a href="#" class="l_city" data-city="New York City" data-state="New York" data-post-id="2">
							<h4>New York City, New York</h4>
							<p>
								10 Creatives, 2 Agencies
							</p>
						</a>
					</li>
					<li>
						<a href="#" class="l_city" data-city="Kansas City" data-state="Missouri" data-post-id="2">
							<h4>Kansas City, Missouri</h4>
							<p>
								20 Creatives, 3 Agencies
							</p>
						</a>
					</li>
				</ul>
			</article>
			<footer>
				<div>
					<h4>Viewing <span>Agencies</span></h5>
					<form>
						<span>Designers</span> <input type="radio" /> <span class="selected">Agencies</span>
					</form>
				</div>
			</footer>
		</section>
	</article>
<?php include('includes/footer.php'); ?>