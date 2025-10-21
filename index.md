---
layout: top
permalink: '/'
---

<div class="flex flex-col items-center grid crid-cols-1 h-screen">
  <div class="flex flex-col items-center">
    <h1 class="flex mx-auto text-sm sm:text-2xl md:text-3xl py-10">
      <span class="mr-2">Hearth Side Programing School</span>
      <span>カリキュラム</span>
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto">
      {% for course in site.courses %}
        <a href="{{ course.course }}.html" data-course="{{ course.course }}" class="course bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-4 px-6 border border-blue-500 hover:border-transparent rounded">
        {{ course.title }}
      </a>
      {% endfor %}
    </div>
  </div>
</div>

<script>
  const buttons = document.querySelectorAll('.course')
  buttons.forEach( o => {
    o.addEventListener('click', e => {
      const currentCourse = e.target.dataset.course
      sessionStorage.setItem("currentCourse", currentCourse)
    })
  })
</script>
