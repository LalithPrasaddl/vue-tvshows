<template>
  <a class="showCard" :href="showPath()">
    <div>
      <div class="showCardImgWrapper">
        <img :src="show.imageUrl" :alt="show.showName" />
      </div>
      <h4 class="showName">{{show.showName}}</h4>
    </div>
    <div class="showDets">
      <p class="showSummary" v-html="show.summary" />
    </div>
    <div class="showInnerDets">
      <div>
        <div>{{show.type}}</div>
      </div>
      <div>
        <div>{{show.webChannel}}</div>
      </div>
    </div>
    <h5 class="showSeason">{{show.showTime}}</h5>
  </a>
</template>

<script>
export default {
  name: 'ShowItem',
  props: ['show'],
  methods: {
    showPath: function() {
      return '#/showDetail?showId=' + this.show.id
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.showCard {
  border: 1px solid var(--lightblack);
  border-radius: 8px;
  flex: 1;
  margin: 0 .5rem .75rem;
  min-width: 20rem;
  max-width: 20rem;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-decoration: none;
  color: var(--black);
}
.showCardImgWrapper {
  width: 100%;
  max-height: 15rem;
  min-height: 15rem;
  overflow:hidden;
  text-align: center;
}
.showCardImgWrapper img {
  object-fit: contain;
  width: 100%;
}
.showName {
  background: var(--black);
  color: var(--white);
  padding: .5rem;
  text-align: center;
}
.showDets .showSummary {
  padding: .5rem;
  color: var(--black);
  min-height: 8rem;
  max-height: 8rem;
  overflow: scroll;
}
.showInnerDets {
  border-top: 1px solid var(--lightblack);
  padding: .5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.showInnerDets > div {
  flex: 1;
  text-align: center;
  padding: 2px;
  font-weight: bold;
}

.showInnerDets > div:first-child {
  border-right: 1px solid var(--lightblack);
}
.showSeason {
  text-align: center;
  padding: .75rem;
  background: var(--black);
  color: var(--white);
}
</style>
