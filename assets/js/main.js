import "./side_column.js";
import "./bread_crumb.js";
import "./curriculum_select.js";
import "./page_turns.js"

const currentUrlFirstPath = currentUrl.pathname.replace('.html', '').split('/')[1]
const defaultCourses = COURSES_DATA.map(o => o.course)
const correctSessionCourseFlug = currentUrlFirstPath == currentCourse
const correctInclusionCourseFlug = defaultCourses.includes(currentUrlFirstPath)

console.log(sessionStorage.getItem('currentCourse'))

if (correctInclusionCourseFlug && !correctSessionCourseFlug) {
  location.href('/')
}


