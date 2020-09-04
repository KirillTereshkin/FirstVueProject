<template>
    <div class="app-main-layout">
        <Sidebar @hide-navbar="isSideBarOpen = !isSideBarOpen"/>

        <Navbar :isOpen="isSideBarOpen"/>

        <main class="app-content" :class="{full: !isSideBarOpen}">
            <div class="app-page">
                <router-view/>
            </div>
        </main>

        <div class="fixed-action-btn">
            <router-link class="btn-floating btn-large blue" to="/records">
                <i class="large material-icons">add</i>
            </router-link>
        </div>
    </div>
</template>
<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";

export default {
    name: 'main-layout',
    data: () => ({
        isSideBarOpen: true,
    }),
    components: {
        Navbar,
        Sidebar
    }
}
</script>