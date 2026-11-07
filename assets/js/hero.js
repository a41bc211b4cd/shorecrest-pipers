// Home page hero (issue #9): fills the progress bar and the one line of
// progress text from window.PIPERS_CAMPAIGN (assets/js/campaign.js, the
// one place to update the total). Markup: <div data-campaign-bar> holding
// a .track (with a .fill) and a .label.
//
// If campaign.js did not load, or its numbers are unusable, the bar stays
// hidden and the label keeps the plain sentence already in the HTML, so
// the page never shows a wrong or invented figure.
(function() {
	var c = window.PIPERS_CAMPAIGN;
	if (!c || !isFinite(c.goal) || !isFinite(c.raised) || c.goal <= 0 || c.raised < 0) return;

	var pct = Math.min(c.raised / c.goal, 1) * 100;
	var bars = document.querySelectorAll('[data-campaign-bar]');
	for (var i = 0; i < bars.length; i++) {
		var track = bars[i].querySelector('.track');
		track.querySelector('.fill').style.width = pct.toFixed(1) + '%';
		track.hidden = false;
		bars[i].querySelector('.label').textContent =
			'$' + c.raised.toLocaleString('en-US') + ' raised of $' + c.goal.toLocaleString('en-US');
	}
})();
