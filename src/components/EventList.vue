<template>
  <Event v-for="event in events" :key="event.id" :event="event" />
</template>

<script>
import Event from "./Event";
export default {
    name: "EventList",
    components: {Event},
    props: {
        events: Array
    }
}
</script>

<style>

</style>