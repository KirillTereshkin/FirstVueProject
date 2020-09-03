<template>
  <ul class="sidenav app-sidenav" :class="{open: isOpen}">
    <router-link
        v-for="(link, index) in links"
        :key="index"
        tag="li"
        active-class="active"
        :to="link.href"
        :exact="link.exact"
        >
      <a href='#' class="waves-effect waves-orange pointer">{{link.name}}</a> 
    </router-link>
  </ul>
</template>

<script>
export default {
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        }
    },
    data: () => ({
        links: [
            { name: "Счет", href: "/", exact: true },
            { name: "История", href: "/history" },
            { name: "Планирование", href: "/planning" },
            { name: "Новая запись", href: "/records" },
            { name: "Категории", href: "/categories" },
            ]
    }),
}
</script>