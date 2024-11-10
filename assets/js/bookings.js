Vue.createApp({
    data() {
        return {
            posts: [] // array of post objects
        }
    },
    created() { // created is a hook that executes as soon as Vue instance is created
        axios.get("../REST/blog/getPosts.php")
        .then(response => {
            // this gets the data, which is an array, and pass the data to Vue instance's posts property
            this.posts = response.data
            console.log(this.posts)
        })
        .catch(error => {
            this.posts = [{ entry: 'There was an error: ' + error.message }]
        })
    }
}).mount('#app')
