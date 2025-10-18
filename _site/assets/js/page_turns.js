const chapters = document.querySelectorAll('.chapters .chapter')
let previous;
let next;
if (chapters.length > 1) {
  const currentPageUrl = new URL(location.href)
  chapters.forEach((o, i) => {
    const chapterUrl = new URL(o.href)
    if (chapterUrl.pathname == currentPageUrl.pathname) {
      const _previous = chapters[i - 1]
      const _next = chapters[i + 1]
      if (_previous) {
        previous = new URL(_previous)
      }
      if (_next) {
        next = new URL(_next)
      }
    }
  })
}
console.log(previous, next)