//$(function(){
	var allHeaders = [];
	var sectionContainer = document.querySelector('.menu-root');
	var sidebar = document.querySelector('.sidebar');
	//if (isAPIOrStyleGuide) {
	//	sectionContainer = document.querySelector('.menu-root')
	//} else {
	//	sectionContainer = document.createElement('ul')
	//	sectionContainer.className = 'menu-sub'
	//	currentPageAnchor.parentNode.appendChild(sectionContainer)
	//}
	var content = document.querySelector('.content');
	console.log(content);
	var headers = content.querySelectorAll('h2');
	console.log(headers);
	var currentPageAnchor = sidebar.querySelector('.sidebar-link.current');
	var contentClasses = document.querySelector('.content').classList;

	if (headers.length) {
		$.each(headers, function (i,h) {
			allHeaders.push(h)
			//allHeaders.push.apply(allHeaders, h3s)
		})
	}

	var animating = false
	sectionContainer.addEventListener('click', function (e) {

		// Not prevent hashchange for smooth-scroll
		// e.preventDefault()
		if (e.target.classList.contains('section-link')) {
			//sidebar.classList.remove('open')
			setActive(e.target)
			animating = true
			setTimeout(function () {
				animating = false
			}, 400)
		}
	}, true)

	var hoveredOverSidebar = false
	sidebar.addEventListener('mouseover', function () {
		hoveredOverSidebar = true
	})
	sidebar.addEventListener('mouseleave', function () {
		hoveredOverSidebar = false
	})

	// listen for scroll event to do positioning & highlights
	content.addEventListener('scroll', updateSidebar)
	content.addEventListener('resize', updateSidebar)
	function updateSidebar () {
		var doc = document.documentElement;
		var top = content.scrollTop;
		console.log(top)
		if (animating || !allHeaders) return
		var last
		for (var i = 0; i < allHeaders.length; i++) {
			var link = allHeaders[i]
			if (link.offsetTop > top) {
				if (!last) last = link
				break
			} else {
				last = link
			}
		}
		if (last)
			setActive(last.id, !hoveredOverSidebar)
	}

	function setActive (id, shouldScrollIntoView) {
		var previousActive = sidebar.querySelector('.section-link.active')
		var currentActive = typeof id === 'string'
			? sidebar.querySelector('.section-link[href="#' + id + '"]')
			: id
		if (currentActive !== previousActive) {
			if (previousActive) previousActive.classList.remove('active')
			currentActive.classList.add('active')
			if (shouldScrollIntoView) {
				var currentPageOffset = currentPageAnchor
					? currentPageAnchor.offsetTop - 8
					: 0
				var currentActiveOffset = currentActive.offsetTop + currentActive.parentNode.clientHeight
				var sidebarHeight = sidebar.clientHeight
				var currentActiveIsInView = (
					currentActive.offsetTop >= sidebar.scrollTop &&
					currentActiveOffset <= sidebar.scrollTop + sidebarHeight
				)
				var linkNotFurtherThanSidebarHeight = currentActiveOffset - currentPageOffset < sidebarHeight
				var newScrollTop = currentActiveIsInView
					? sidebar.scrollTop
					: linkNotFurtherThanSidebarHeight
					? currentPageOffset
					: currentActiveOffset - sidebarHeight
				sidebar.scrollTop = newScrollTop
			}
		}
	}
//})