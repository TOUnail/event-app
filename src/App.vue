<template>
  <div class="container mx-auto">
    <Search ref="search" @fetch-events="onFetch" />
    <EventList :events="events" />
    <div class="flex justify-between gap-x-1" v-if="this.next !== null || this.previous !== null">
      <button class="w-full px-4 py-3" :class="{'bg-purple-500 text-white hover:bg-purple-700': this.previous !== null, 'bg-purple-200 text-gray-400 cursor-not-allowed': this.previous === null}" @click.prevent="onPrev" :disabled="this.previous === null">Previous</button>
      <button class="w-full px-4 py-3" :class="{'bg-purple-500 text-white hover:bg-purple-700': this.next !== null, 'bg-purple-200 text-gray-400 cursor-not-allowed': this.next === null}" @click.prevent="onNext" :disabled="this.next === null">Next</button>
    </div>
  </div>
</template>

<script>
import Search from "./components/Search";
import EventList from "./components/EventList";
export default {
  name: "App",
  components: {
    Search,
    EventList,
  },
  data() {
    return {
      events: [],
      next: null,
      previous: null,
    };
  },
  methods: {
    onFetch(result) {
      this.events = result.results;
      this.next = result.next;
      this.previous = result.previous;
    },
    onNext() {
      this.$refs.search.onPagination(this.next);
      window.scrollTo(0,0)
    },
    onPrev() {
      this.$refs.search.onPagination(this.previous)
      window.scrollTo(0,0)
    }
  },
};
</script>
