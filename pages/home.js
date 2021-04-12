export default {
    name: 'Home',
    data() {
        return {
            loading: false,
            weather_data_loaded: false,
            weather_data: {}
        };
    },
    methods: {
        
        fetchData() {
            this.loading = true
            this.final_text = ""
            // I prefer to use fetch
            // you can use use axios as an alternative
            return fetch('http://api.openweathermap.org/data/2.5/weather?lat=45.562307&lon=-122.454372&appid=4034f9b3f96bdad84337dfb131aed6d5&units=imperial', {
            method: 'get',
            headers: {
              'content-type': 'application/json'
            }
            })
            .then(res => {
              // a non-200 response code
              if (!res.ok) {
                // create error instance with HTTP status text
                const error = new Error(res.statusText);
                error.json = res.json();
                throw error;
              }

              return res.json();
            })
            .then(json => {
              // set the response data
              this.weather_data = json
              this.weather_data_loaded =  true
            })
            .catch(err => {
              console.error("There was an error!", err);
                this.loading = false
            })
            .then(() => {
                console.log('completed call');
                this.loading = false
            });
            
            
        }
    },
    beforeMount(){
       this.fetchData()
    },

    template: `

<div style="max-width:500px">
  Weather

  <br>
  <div v-show="weather_data_loaded">
    temp: {{ weather_data}}
  </div>
</div>
    `,
    
    
    
    
  };