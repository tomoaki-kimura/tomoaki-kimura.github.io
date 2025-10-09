---
layout: page
title: ベーシックコース
course: basic
permalink: basic.html
---

## {{ page.title }}

<table>
  <tbody>
    {% for post in site.scratch %}
      <tr>
        <td>{{ post.title }}{{ post.level }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>



