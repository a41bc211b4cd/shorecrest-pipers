// Fills every campaign progress bar in the hero mockups from
// window.PIPERS_CAMPAIGN (assets/js/campaign.js, the one place to
// update the total). Markup: <div class="hero-progress" data-campaign-bar>
// with a .fill and a .label inside. If campaign.js failed to load, the
// bar shows the fallback goal and raised amounts below.
(function() {
	var c = window.PIPERS_CAMPAIGN || { goal: 6000, raised: 1010 };
	var pct = Math.max(0, Math.min(c.raised / c.goal, 1)) * 100;
	var bars = document.querySelectorAll('[data-campaign-bar]');
	for (var i = 0; i < bars.length; i++) {
		var bar = bars[i];
		bar.style.setProperty('--pct', pct.toFixed(1) + '%');
		var track = bar.querySelector('.track');
		track.setAttribute('role', 'progressbar');
		track.setAttribute('aria-valuemin', '0');
		track.setAttribute('aria-valuemax', String(c.goal));
		track.setAttribute('aria-valuenow', String(c.raised));
		track.setAttribute('aria-label', 'Fundraiser progress');
		bar.querySelector('.label').innerHTML =
			'<strong>$' + c.raised.toLocaleString('en-US') + '</strong> raised of $' +
			c.goal.toLocaleString('en-US') + ' for three new sets of pipes';
	}
})();
