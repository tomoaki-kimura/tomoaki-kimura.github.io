---
layout: page
title: ベーシックコース
course: basic
permalink: basic.html
---

<table>
  <tbody>
    {% for post in site.basic %}
      <tr>
        <td>{{ post.title }}{{ post.level }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>



