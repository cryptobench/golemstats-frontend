<template>
  <div class="bg-gray-200">
    <Nav></Nav>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/components/Navbar.vue"
import Footer from "@/components/Footer.vue"

export default {
  name: "Home",
  components: {
    Nav,
    Footer,
  },
}
</script>
