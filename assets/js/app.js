new Vue({
    el: '#app',
    data: {
        data: [],
        searchValue: ''
    },
    methods: {
        getData: async function() {
            let response = await fetch('https://corona.lmao.ninja/countries');
            this.data = await response.json();
            setTimeout(this.getData, 300000);
        }
    },
    computed: {
        globalCases() {
            return this.data.reduce( (total, data) => total+data.cases, 0 );
        },
        globalDeaths() {
            return this.data.reduce( (total, data) => total+data.deaths, 0 );
        },
        globalRecovered() {
            return this.data.reduce( (total, data) => total+data.recovered, 0);
        },
        myanmarTotalCases() {
            if(this.data.length > 0) {
                return this.data.find( country => country.country == 'Myanmar' ).cases;
            }
            return null;
        },
        myanmarDeaths() {
            if(this.data.length > 0) {
                return this.data.find( country => country.country == 'Myanmar' ).deaths;
            }
            return null;
        },
        myanmarRecovered() {
            if(this.data.length > 0) {
                return this.data.find( country => country.country == 'Myanmar' ).recovered;
            }
            return null;
        },
        searchResults() {
            let result = [];
            this.data.forEach((country, index) => {
                if(country.country.toLowerCase().includes(this.searchValue.toLowerCase())) {
                    country.rank = index+1;
                    result.push(country);
                }
            } );
            
            return result;
        }
    },
    created: function() {
        this.getData();
    }
});