<template>
    <form class="mt-10" @submit.prevent="onSubmit">
        <div class="grid grid-cols-5 lg:grid-cols-8 gap-0">
            <input class="px-4 py-3 border bg-white col-span-5 lg:col-span-4" v-model="query" placeholder="Search for Event" />
            <div class="flex flex-col col-span-3 lg:col-span-2">
                <div class="relative">
                    <input class="w-full py-3 flex items-center border-gray-300 pl-4 border bg-white" v-model="locationStr" @input="onLocationInput" @blur="this.open=false" placeholder="Location" />
                    
                    <button class="w-12 absolute top-0 bottom-0 m-auto right-0 cursor-pointer" @click.prevent="onSubmitLocation">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                            <path fill="rgb(75, 85, 99)" d="M16,18a5,5,0,1,1,5-5A5.0057,5.0057,0,0,1,16,18Zm0-8a3,3,0,1,0,3,3A3.0033,3.0033,0,0,0,16,10Z"/>
                            <path fill="rgb(75, 85, 99)" d="M16,30,7.5645,20.0513c-.0479-.0571-.3482-.4515-.3482-.4515A10.8888,10.8888,0,0,1,5,13a11,11,0,0,1,22,0,10.8844,10.8844,0,0,1-2.2148,6.5973l-.0015.0025s-.3.3944-.3447.4474ZM8.8125,18.395c.001.0007.2334.3082.2866.3744L16,26.9079l6.91-8.15c.0439-.0552.2783-.3649.2788-.3657A8.901,8.901,0,0,0,25,13,9,9,0,1,0,7,13a8.9054,8.9054,0,0,0,1.8125,5.395Z"/>
                        </svg>
                    </button>
                    <ul v-bind:class="this.open ? 'visible' : 'invisible'" class="absolute w-full border z-10 bg-white">
                        <li class="px-2 py-1 hover:bg-gray-400" v-bind:key="suggestion.id" v-for="suggestion in locationSuggestion">
                            <button @click.prevent="onLocationSuggestionClick(suggestion)">{{suggestion.address.freeformAddress}}</button>
                        </li>
                    </ul>
                </div>
            </div>
            <select class="px-4 py-3 leading-5 border col-span-2 lg:col-span-1 bg-white" v-model="within" @change="onWithinChange($event)">
                <option value="">Anywhere</option>
                <option value="10">within 10 mi</option>
                <option value="25">within 25 mi</option>
                <option value="50">within 50 mi</option>
                <option value="75">within 75 mi</option>
            </select>
            <input type="submit" class="px-4 py-3 cursor-pointer col-span-5 lg:col-span-1 sm:col-span bg-purple-500 text-white hover:bg-purple-700" value="Get Events" />
        </div>
    </form>
</template>

<script>
export default {
 name: "Search",
 data() {
     return {
         query: '',
         location: null,
         locationSuggestion: null,
         locationStr: '',
         timeout: null,
         within: "",
         open: false,
         next: null,
         previous: null,
     }
 },
 methods: {
     onSubmit() {
         fetch(`https://api.predicthq.com/v1/events/?q=${this.query}${location !== null ? `&location_around.origin=${this.location.coords.latitude}%2C${this.location.coords.longitude}` : ''}${this.within !== "" ? `&within=${this.within}mi%40${this.location.coords.latitude}%2C${this.location.coords.longitude}` : ""}`, {
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 7KeXdiLaEuK2Rw7Pxjsdcc6lOr0LYWlrLd6DuEtO' 
            }
         })
         .then(res => res.json())
         .then(res => {
             this.events = res.results;
             this.next = res.next;
             this.prev = res.prev;
             this.$emit('fetch-events', res)
         })
     },
     onPagination(url) {
        fetch(url, {
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 7KeXdiLaEuK2Rw7Pxjsdcc6lOr0LYWlrLd6DuEtO' 
            }
         }).then(res => res.json())
         .then(res => {
             this.events = res.results;
             this.next = res.next;
             this.prev = res.prev;
             this.$emit('fetch-events', res)
         })
     },
     onSubmitLocation() {
        if (!("geolocation" in navigator)) {
             return;
        }
        try {
         navigator.geolocation.getCurrentPosition(async (pos) => {
            const response = await fetch(`https://api.tomtom.com/search/2/reverseGeocode/${pos.coords.latitude}%2C${pos.coords.longitude}.json?key=VsPf5OFQzuXYh3RkK4g7ZjcZQWA7lGPp`);
            
            const data = await response.json();
            this.locationStr = `${data.addresses[0].address.localName}, ${data.addresses[0].address.countrySubdivision}`;
            this.location = pos
        })
        } catch(error) {
            console.log(error)
        }
    },
    onSearchLocation() {
        if (this.locationStr) {
        fetch(`https://api.tomtom.com/search/2/geocode/${this.locationStr}.json?key=VsPf5OFQzuXYh3RkK4g7ZjcZQWA7lGPp`)
        .then(res => res.json())
        .then(data => {
            this.open = true;
            this.locationSuggestion = data.results;
            this.location = {coords: {latitude: data.results[0].position.lat, longitude: data.results[0].position.lon}}
        })
        }
    },
    onLocationSuggestionClick(location) {
        this.open = false;
        this.location = {coords: {latitude: location.position.lat, longitude: location.position.lon}};
        this.locationStr = location.address.freeformAddress
    },
    onLocationInput() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(()=>{
            this.onSearchLocation()
        },500)
    },
    onWithinChange(event) {
        this.within = event.target.value
    }
 },
}
</script>