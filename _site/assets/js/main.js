import "./side_column.js"

const url = new URL(window.location.href)
const part = url.pathname
const chapter = url.searchParams.get("chapter")
console.log(chapter)
const posts = document.querySelectorAll(`.${chapter}`)
const target = document.querySelector('#posts')
if (target) { 
  target.innerHTML = ""
  posts.forEach(o => target.append(o))
}
