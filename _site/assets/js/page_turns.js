const chapters = document.querySelectorAll('.chapters .chapter')
const previousButton = document.querySelector('.previous-link')
const nextButton = document.querySelector('.next-link')

if (chapters.length > 1) {
  const currentPageUrl = new URL(location.href)
  chapters.forEach((o, i) => {
    const chapterUrl = new URL(o.href)
    if (chapterUrl.pathname == currentPageUrl.pathname) {
      const previous = chapters[i - 1]
      const next = chapters[i + 1]
      if (previous) {
        const _previous = new URL(previous)
        previousButton.setAttribute('href', _previous.pathname)
        previousButton.classList.remove('hidden')
      }
      if (next) {
        const _next = new URL(next)
        nextButton.setAttribute('href', _next.pathname)
        nextButton.classList.remove('hidden')
      }
    }
  })
}