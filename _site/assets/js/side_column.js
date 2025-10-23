if (location.pathname != "/") {
  // side_column state
  const toggleMenuOpen = document.querySelector('.toggle-menu-open')
  const toggleMenuClose = document.querySelector('.toggle-menu-close')
  const sideColumn = document.querySelector('aside')
  const main = document.querySelector('main')
  const sideColumnOpen = document.querySelector('.side-column-open')
  const sideColumnClose = document.querySelector('.side-column-close')

  const closeSideColumn = () => {
    sideColumn.classList.remove('w-64')
    sideColumn.classList.add('w-9')
    main.classList.remove('ml-64')
    main.classList.add('ml-5')
    main.classList.add('w-screen')
    sideColumnOpen.classList.add('hidden')
    sideColumnClose.classList.remove('hidden')
  }

  const openSideColumn = () => {
    if (sideColumn) {
      sideColumn.classList.remove('w-9')
      sideColumn.classList.add('w-64')
      main.classList.remove('ml-5')
      main.classList.add('ml-64')
      sideColumnClose.classList.add('hidden')
      sideColumnOpen.classList.remove('hidden')
    }
  }

  // toggle
  toggleMenuOpen.addEventListener('click', (e) => {
    closeSideColumn()
  })
  toggleMenuClose.addEventListener('click', (e) => {
    openSideColumn()
  })

  // responsive
  const mediaQuery = window.matchMedia('(min-width: 768px)');

  const checkWindow = (windowSize) => {
      if (windowSize.matches) {
          openSideColumn()
      } else {
          closeSideColumn()
      }
  }

  checkWindow(mediaQuery);

  mediaQuery.addEventListener('change', checkWindow);

  // #side top link
  // top button is back to course
  const currentCourseLinks = document.querySelectorAll('.current-course-link')
  if (currentCourseLinks.length > 0) {
    currentCourseLinks.forEach(o => {
      o.setAttribute('href', `/${currentCourse}.html`)
    })
  }

  //subMenu
  document.querySelectorAll(".sidebar-dropdown-toggle").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const parent = item.closest(".group");
      if (parent.hasAttribute("data-state-opened")) {
        parent.removeAttribute("data-state-opened");
      } else {
        document.querySelectorAll(".sidebar-dropdown-toggle").forEach((i) => {
          i.closest(".group").removeAttribute("data-state-opened");
        })
        parent.toggleAttribute("data-state-opened");
      }
    })
  })

  // current_page menu is open
  const url = new URL(window.location.href)
  const currentPath = url.pathname
  const currentPathNode = document.querySelector(`a[href='${currentPath}']`)
  if (currentPathNode && currentPathNode.parentNode) {
    const currentParentNode = currentPathNode.parentNode
    currentParentNode.toggleAttribute("data-state-opened")
  }

  // #side_sub top link
  // top button is back to part
  const currentPartLinks = document.querySelectorAll('.current-part-link')
  if (currentPartLinks.length > 0) {
    const currentPath = new URL(location.href).pathname
    const splitPath = currentPath.split('/')
    const currentPart = splitPath[1]
    currentPartLinks.forEach( o => {
      o.setAttribute('href', `/${currentCourse}/${currentPart}.html`)
    })
  }
}