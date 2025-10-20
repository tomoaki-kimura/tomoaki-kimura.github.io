// page global
const currentUrl = new URL(location.href)

// target selector
const breadCourse = document.querySelector('.bread-course')
const breadPart = document.querySelector('.bread-part')
const breadChapter = document.querySelector('.bread-chapter')
const breadSection = document.querySelector('.bread-section')

// current page flug
const courseUrlList = COURSES_DATA.map(o => `/${o.course}.html`)

const is_sectionPage = currentUrl.pathname.split('/').length == 7
const is_partPage = currentUrl.search.includes('chapter')
const is_coursePage = courseUrlList.includes(currentUrl.pathname)
const is_partPageNoParam = currentUrl.search.length == 0

// course link
const insertCurrentCourseLink = () => {
  const allCourseNames = COURSES_DATA.map(o => o.course)
  const courseName = COURSES_DATA.find(o => o.course == currentCourse).title
  breadCourse.querySelector('a').innerHTML = courseName
  breadCourse.querySelector('a').setAttribute('href', `/${ currentCourse }.html`)
}

const insertCurrentPartLink = (currentPart) => {
  const currentPartData = CURRICULUMS_DATA.find(o => o.part == currentPart)
  breadPart.querySelector('a').innerHTML = currentPartData.title
  const url = `/${currentCourse}/${currentPart}.html`
  breadPart.querySelector('a').setAttribute('href', url)
}

const insertCurrentChapterString = (currentPart) => {
  const currentPartData = CURRICULUMS_DATA.find(o => o.part == currentPart)
  const currentChaptersData = currentPartData.contents
  const currentChapter = currentUrl.searchParams.get('chapter')
  const currentChapterName = currentChaptersData.find(o => o.chapter == currentChapter).title
  breadChapter.querySelector('a').innerHTML = currentChapterName
}

const insertCurrentChapterLink = () => {
  const currentPath = currentUrl.pathname
  const splitPath = currentPath.split('/')
  const currentPart = splitPath[1]
  const currentChapter = splitPath[2]
  const url = `/${currentCourse}/${currentPart}.html?chapter=${currentChapter}`
  breadChapter.querySelector('a').setAttribute('href', url)
}

// bread crumb display
const displayBreadCrumb = (target) => {
  target.forEach( o => o.classList.remove('hidden') )
}

if (is_sectionPage) {
  console.log("section")
  const target = [breadCourse, breadPart, breadChapter, breadSection]
  insertCurrentCourseLink()
  const currentPart = currentUrl.pathname.split('/')[1]
  insertCurrentPartLink(currentPart)
  insertCurrentChapterLink()
  displayBreadCrumb(target)
} else if (is_partPage) {
  console.log("part")
  const target = [breadCourse, breadPart, breadChapter]
  insertCurrentCourseLink()
  const currentPart = currentUrl.pathname.split('/')[2].split('.')[0]
  insertCurrentPartLink(currentPart)
  insertCurrentChapterString(currentPart)
  displayBreadCrumb(target)
} else if (is_coursePage) {
  console.log("course")
  const target = [breadCourse]
  displayBreadCrumb(target)
} else if (is_partPageNoParam) {
  console.log("part_no_param")
  const target = [breadCourse, breadPart]
  insertCurrentCourseLink()
  displayBreadCrumb(target)
  document.querySelectorAll('[data-state-opened]').forEach(o => {
    delete o.dataset.stateOpened
  })
}





