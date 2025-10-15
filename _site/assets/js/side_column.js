window.onload = function() {

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
    main.classList.add('ml-9')
    main.classList.add('w-screen')
    sideColumnOpen.classList.add('hidden')
    sideColumnClose.classList.remove('hidden')
  }

  const openSideColumn = () => {
    sideColumn.classList.remove('w-9')
    sideColumn.classList.add('w-64')
    main.classList.remove('ml-9')
    main.classList.add('ml-64')
    sideColumnClose.classList.add('hidden')
    sideColumnOpen.classList.remove('hidden')
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

  // current_page menu
  const url = new URL(window.location.href)
  const part = url.pathname
  const currentChapter = part.replace('/', '').replace('.html', '')
  const currentChapterNode = document.querySelector(`a[href='${currentChapter}']`)
  if (currentChapter && currentChapter.parentNode) {
    const currentParentNode = currentChapterNode.parentNode
    currentParentNode.toggleAttribute("data-state-opened")
  }
  
  // current_course name get sessionStrage
  const courseData = {
    COURSES_DATA
  }
  const currentCourse = sessionStorage.getItem("currentCourse")
  const currentCourseLink = document.querySelector('.current-course-link')
  const currentCourseName = document.querySelector('.current-course-name')
  currentCourseName.innerHTML = courseData.findcurrentCourse]
  currentCourseLink.setAttribute('href', `/${ currentCourse }.html`) 
}
