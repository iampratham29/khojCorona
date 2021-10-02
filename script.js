$(document).ready(function () {
    var url = "https://data.covid19india.org/data.json"
    $.getJSON(url, function (data) {
        // console.log(data)
        var state = []
        var confirmed = []
        var recovered = []
        var deaths = []

        var total_recovered, total_active, total_deaths, total_confirmed
        total_active = data.statewise[0].active
        total_confirmed = data.statewise[0].confirmed
        total_deaths = data.statewise[0].deaths
        total_recovered = data.statewise[0].recovered

        $.each(data.statewise, function (id, obj) {
            if (obj.state !== "Total") {
                state.push(obj.state)
                confirmed.push(obj.confirmed)
                recovered.push(obj.recovered)
                deaths.push(obj.deaths)
            }
        })

        console.log(state)

        $("#active").append(total_active)
        $("#confirmed").append(total_confirmed)
        $("#recovered").append(total_recovered)
        $("#deaths").append(total_deaths)

        var myChart = document.getElementById("myChart").getContext('2d')
        var chart = new Chart(myChart, {

            type: 'line',
            data: {
                labels: state,
                datasets: [{
                        label: "Confirmed Cases",
                        data: confirmed,
                        backgroundColor: 'rgba(255, 255, 0, 0.4)',
                        minBarLength: 100
                    },
                    {
                        label: "Recovered Cases",
                        data: recovered,
                        backgroundColor: 'rgba(0, 255, 0, 0.5)',
                        minBarLength: 100
                    },
                    {
                        label: "Deceased cases",
                        data: deaths,
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        minBarLength: 100
                    },

                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
        })
    })
})