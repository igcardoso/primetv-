document.addEventListener('DOMContentLoaded', function () {
	const tabs = document.querySelectorAll('.floating-element');
	const navButtons = document.querySelectorAll('.floating-element-option');
	const clickAway = document.querySelectorAll('.click-away');

	function showFloatingElement(tabId) {
		tabs.forEach(tab => tab.classList.remove('active'));

		const selectedTab = document.getElementById(tabId);
		selectedTab.classList.add('active');
		if (selectedTab.classList.contains('floating-element')) {
			clickAway.forEach(Away => {
				Away.classList.add('active');
			});
		}
	}
	//
	// 	document.addEventListener('click', function(event) {
	// 		const floatingElement = event.state ? event.state.page: 'home';
	// 		var element = document.getElementById(floatingElement);
	// 		var isClickInsideElement = element.contains(event.target);
	//
	// 		if (!isClickInsideElement) {
	// 			history.back();
	// 		} else {
	// 			floatingElement.classList.add('active')
	// 		}
	// 	});
	//

	function handleNavClick(event) {
		const selectedPage = event.currentTarget.getAttribute('data-page');
		let currentPage = document.getElementById(selectedPage);
		if (!currentPage.classList.contains('active')) {
			setTimeout(function() {
				// Bottom tab
				showFloatingElement(selectedPage);

				window.history.pushState({
					page: selectedPage
				}, null, `#${selectedPage}`);
			},
				100);
			headerButtonBehavior(selectedPage);
		}
	}
	
	navButtons.forEach(button => {
		button.addEventListener('click', handleNavClick);
	});

	window.addEventListener('popstate',
		function (event) {
			const page = event.state ? event.state.page: 'home';
			showFloatingElement(page);
			headerButtonBehavior(page);
		});

	function functionClickAway() {
		history.back();
		clickAway.forEach(Away => {
			Away.classList.remove('active');
			const currentVisibleElement = window.history.state ? window.history.state.page: 'home';
			headerButtonBehavior(currentVisibleElement);
		});
	}

	clickAway.forEach(btn => {
		btn.addEventListener("click", ()=> {
			functionClickAway();
		})
	});

	function headerButtonBehavior(tabId) {
		const element = tabId
		const HeaderIconButtonMore = document.querySelector('header .content-profile .icon');
		const HeaderPhotoButtonMore = document.querySelector('header .content-profile .profile');
		let IdCurrentElement = document.getElementById(element);

		if (IdCurrentElement.classList.contains('header-more-options')) {

			HeaderIconButtonMore.classList.toggle('hidden');
			HeaderPhotoButtonMore.classList.toggle('open-opacity');
		} else if (HeaderIconButtonMore.classList.contains('hidden') && HeaderPhotoButtonMore.classList.contains('open-opacity')) {
			HeaderIconButtonMore.classList.remove('hidden');
			HeaderPhotoButtonMore.classList.remove('open-opacity');
		}
	}

});
