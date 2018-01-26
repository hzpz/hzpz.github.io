function initMap() {
    let exMap = L.map('exMap').setView([52.277440, 8.043946], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiaHpweiIsImEiOiJjamN2dTc3cnQxMDBkMnFvN2pnMGlweGI0In0.bKg3Z9MAMwBm55PKhVCMuQ'
    }).addTo(exMap);

    fetch("http://hzpz.github.io/pkmn/ex-raids/ex-raids-os.geojson")
        .then(data => data.json())
        .then(data => {
            L.geoJSON(data, {
                style: styleFeature,
                onEachFeature: onEachFeature,
                pointToLayer: gymMarker
            }).addTo(exMap)
        })
}

function styleFeature(feature) {
    if (feature.properties && feature.properties['marker-color']) {
        return {
            fillColor: feature.properties['marker-color']
        }
    }
}

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.name) {
        layer.bindTooltip(feature.properties.name);
    }
}

function gymMarker(feature, latlng) {
    let gymIcon = L.icon({
        iconUrl: 'gym.png',
        iconSize: [32, 32],
        iconAnchor: [24, 32]
    });

    let markerOptions = {
        icon: gymIcon
    };

    return L.marker(latlng, markerOptions);
} 