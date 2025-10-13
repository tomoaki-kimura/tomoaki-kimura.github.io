---
layout: top
permalink: '/'
---

<div class="flex flex-col items-center grid crid-cols-1 h-screen">
  <div class="flex flex-col items-center h-100 grid grid-cols-1 gap-4">
    <h1 class="justify-self-center text-4xl">
      Hearth Side Programing School カリキュラム
    </h1>
    <div class="justify-self-center">
      <a href="basic.html" data-course="basic" class="course bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-4 px-6 border border-blue-500 hover:border-transparent rounded">
        ベーシックコース
      </a>
      <a href="standard.html" data-course="standard" class="course bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-4 px-6 border border-blue-500 hover:border-transparent rounded">
        スタンダードコース
      </a>
      <a href="advance.html" data-course="advance" class="course bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-4 px-6 border border-blue-500 hover:border-transparent rounded">
        アドバンスコース
      </a>
      <a href="professional.html" data-course="professional" class="course bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-4 px-6 border border-blue-500 hover:border-transparent rounded">
        プロ育成コース
      </a>
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
