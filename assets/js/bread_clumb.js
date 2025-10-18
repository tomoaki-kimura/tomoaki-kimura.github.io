const breadCourse = document.querySelector('.bread-course')
const breadPart = document.querySelector('.bread-part')
const breadChapter = document.querySelector('.bread-chapter')
const breadSection = document.querySelector('.bread-section')
const currentUrl = new URL(location.href)
const courseList = COURSES_DATA.map(o => `/${o.course}.html`)
const is_sectionPage = currentUrl.pathname.split('/').length == 7
const is_partPage = currentUrl.search.includes('chapter')
const is_coursePage = courseList.includes(currentUrl.pathname)
// course link
const allCourseNames = COURSES_DATA.map(o => o.course)
const courseName = COURSES_DATA.find(o => o.course == currentCourse).title
breadCourse.querySelector('a').innerHTML = courseName

// targets show
if (is_sectionPage) {
  const target = [breadCourse, breadPart, breadChapter, breadSection]
  target.forEach( o => o.classList.remove('hidden') )
} else if (is_partPage) {
  const target = [breadCourse, breadPart, breadChapter]
  breadCourse.querySelector('a').setAttribute('href', `/${ currentCourse }.html`)
  target.forEach( o => o.classList.remove('hidden') )
  breadPart.querySelector('a').innerHTML = 'kokoko'
} else if (is_coursePage) {
  breadCourse.classList.remove('hidden')
}

console.log(is_coursePage)

