<template>
<div class="my-5 border rounded p-5 bg-white shadow-sm">
  <div class="flex flex-row gap-x-1">
    <div class="flex-grow">
      <div class="flex flex-row">
        <p class="text-purple-400 font-bold mr-3">{{ $dayjs(event.start).format('MMM D, YYYY h:mm A') }}</p>
        <p class="text-gray-600">{{event.title}}</p>
      </div>
      <h2 class="font-bold">{{event.entities[0]?.name}}</h2>
      <address>{{event.entities[0]?.formatted_address}}</address>
    </div>
    <button class="w-5" @click.prevent="handleClick">
      <svg v-if="!this.open" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path style="fill:rgb(167, 139, 250)" d="M238.23,342.43l89.09-74.13a16,16,0,0,0,0-24.6l-89.09-74.13A16,16,0,0,0,212,181.86V330.14A16,16,0,0,0,238.23,342.43Z"/><path d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z" style="fill:none;stroke:rgb(167, 139, 250);stroke-miterlimit:10;stroke-width:32px"/></svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path style="fill:rgb(167, 139, 250)" d="M342.43,238.23,268.3,327.32a16,16,0,0,1-24.6,0l-74.13-89.09A16,16,0,0,1,181.86,212H330.14A16,16,0,0,1,342.43,238.23Z"/><path d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z" style="fill:none;stroke:rgb(167, 139, 250);stroke-miterlimit:10;stroke-width:32px"/></svg>
    </button>
  </div>
  
  <p class="mt-5" v-show="this.open">{{event.description}}</p>
</div>
  
</template>

<script>
export default {
    name: "Event",
    props: {
        event: Object
        },
        data() {
     return {
         open: false,
     }
    },
    methods: {
      handleClick() {
        this.open = !this.open
      }
    }
}
</script>