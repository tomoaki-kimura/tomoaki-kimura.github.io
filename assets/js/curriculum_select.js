const url = new URL(window.location.href)
const currentChapter = url.searchParams.get("chapter")
const currentPart = url.pathname.replace('.html', '').split('/')[2]
const posts = document.querySelectorAll(`.post.${currentChapter}`)
const postsWrapper = document.querySelector('#posts')

if (postsWrapper) { 
  postsWrapper.innerHTML = ""
  posts.forEach(o => {
    postsWrapper.append(o);
  })
}

const pageHeaderTitle = document.querySelector('.params-chapter')
const currenPartData = CURRICULUMS_DATA.find(o => o.part == currentPart)

if (currenPartData) {
  const currentPartChapters = currenPartData.contents
  const currentChapterIndex = currentPartChapters.findIndex(o => o.chapter == currentChapter)
  const currentChapterData = currentPartChapters[currentChapterIndex]
  const currentChapterTitle = currentChapterData.title
  pageHeaderTitle.innerHTML = `${ currentChapterIndex + 1 }章 - ${ currentChapterTitle }`
}
