<template>
  <div class="footer">
    <div class="footerWrapper">
      <div v-for="item in items" :key="item.name">
        <a :href="item.link"><span v-if="item.negate">Cannot </span> Follow us on <b>{{item.name}}</b></a>
      </div>
    </div>
    <div class="credits"> API credits   <a href="https://www.tvmaze.com/api">TVMAZE</a></div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      items: [{
        name: 'Facebook',
        link: 'https://www.facebook.com',
        negate: true
      }, {
        name: 'Linkedin',
        link: 'https://www.linkedin.com'
      }, {
        name: 'Twitter',
        link: 'https://twitter.com/?lang=en'
      }, {
        name: 'Instagram',
        link: 'https://www.instagram.com/',
        negate: true
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footerWrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  text-align: center;
}
.footerWrapper a {
  color: var(--white);
  text-decoration: none;
  padding: 0 .25rem;
  text-align: center;
}
.footerWrapper a:hover {
  text-decoration: underline;
}
.footer {
  display: flex;
  flex-direction: column;
  background: var(--black);
  padding: 12px 0;
}
.credits {
  width: 100%;
  justify-content: center;
  padding: 1rem .25rem;
  color: var(--white);
  display: flex;
}
.credits a {
  display: block;
  color: var(--blue);
  margin-left: 1rem;
}
</style>
