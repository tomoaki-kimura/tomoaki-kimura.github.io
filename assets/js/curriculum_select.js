const url = new URL(window.location.href)
const currentChapter = url.searchParams.get("chapter")
const currentPart = url.pathname.replace('.html', '').split('/')[2]
const posts = document.querySelectorAll(`.post.${currentChapter}`)
const postsWrapper = document.querySelector('#posts')

const chapterMaterial = `
  <tr class="text-xl my-4 bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
    <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"></th>
    <td class="px-6 py-4">
      <a></a>
    </td>
  </tr>
`

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
  if (currentChapterData) {
    const currentChapterTitle = currentChapterData.title
    pageHeaderTitle.innerHTML = `chapter${ currentChapterIndex + 1 }:　${ currentChapterTitle }`
  } else {
    postsWrapper.innerHTML = ""
    currentPartChapters.forEach((o, i) => {
      const chapter = document.createElement('table')
      chapter.insertAdjacentHTML('beforeend', chapterMaterial)
      const row = chapter.querySelector('tr')
      row.querySelector('th').innerHTML = `${i + 1}`
      row.querySelector('a').innerHTML = o.title
      row.querySelector('a').setAttribute('href', `/${currentCourse}/${currentPart}.html?chapter=${o.chapter}`)
      postsWrapper.append(row)
    })
  }
}



