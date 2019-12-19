mapboxgl.accessToken = 'pk.eyJ1IjoiemJhcnJldCIsImEiOiJjazM4dXljcTgwYWphM2hsM21panR1NHR3In0.ZwA4wcOMvCL6r6qArNGy1g';
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [1.4390443, 43.6035698],
    zoom: 11
});




map.on("load", function(){
    
    loadImage('green');    
    loadImage('orange');
    loadImage('red');    
    
    
    let url = "https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=83e505d8c6119f48d25a579302a22e1bda11509d";
    
    console.log(ajaxGet(url, function(reponse){
        let geojson = JSON.parse (reponse);


        geojson.forEach(station => {
            
            let color = getMarkerColor(station);
                                            
            addMarker(station.name, station.position.lat, station.position.lng, color)
            console.log(station)
            
            /*addmarker.eventlistener (addlayer, 'click', function(){
                document.getElementByid (station.name)
                document.getElementByid (station.address)
            })*/
        })
    
    }));
    
});


/*
* Récupère la couleur du market par rapport au nombre de vélo restant
*/

function getMarkerColor(station){
    let dispo = station.available_bikes;
    let moitie = station.bike_stands / 2;
    
    if(dispo === 0){
        return "red"
    }
    else if(dispo < moitie){
        return 'orange'
    }
    else{
        return 'green'
    }
}

/*
* Création des markers
*/

function loadImage(color){
    /* Image: An image is loaded and added to the map. */
    map.loadImage(`https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`, (error, image)=>{
        if (error) throw error;

    map.addImage(`marker-${color}`, image);
    /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
    });
}

/*
* Ajoute un marker par station
* @nom : nom de la station
* @lat : lattitude de la station
* @lng : longitude de la station
* @color : couleur du marker 
*/

function addMarker(nom, lat, lng, color){
    map.addLayer({
            id: nom,
            type: "symbol",
            /* Source: A data source specifies the geographic coordinate where the image marker gets placed. */
            source: {
                type: "geojson",
                data: {
                    type: 'FeatureCollection',
                    features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: "Point",
                            coordinates: [lng, lat]
                        }
                    }
                    ]
                }
            },
            layout: {
                "icon-image": `marker-${color}`
            }
        });
}