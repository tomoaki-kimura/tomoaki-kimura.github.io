const url = new URL(window.location.href)
const chapter = url.searchParams.get("chapter")

const posts = document.querySelectorAll(`.post.${chapter}`)
const target = document.querySelector('#posts')
if (target) { 
  target.innerHTML = ""
  posts.forEach(o => target.append(o))
}
