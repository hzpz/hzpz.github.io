function initMap() {
    let exMap = L.map('exMap').setView([52.277440, 8.043946], 12);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiaHpweiIsImEiOiJjamN2dTc3cnQxMDBkMnFvN2pnMGlweGI0In0.bKg3Z9MAMwBm55PKhVCMuQ'
    }).addTo(exMap);

    fetch("ex-raids-os.geojson")
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
    let style = {
        weight: 1,
        color: '#7e7e7e',
        fillColor: '#7e7e7e'
    };
    if (feature.properties) {
        if (feature.properties['stroke']) {
            if (feature.properties['fill']) {
                style.fillColor = feature.properties['fill'];
            }
            if (feature.properties['stroke']) {
                style.color = feature.properties['stroke'];
            }
        }
    }
    return style;
}

function onEachFeature(feature, layer) {
    if (feature.properties) {
        if (feature.properties.name) {
            layer.bindTooltip(feature.properties.name, {direction: 'right'});
        }
        if (feature.properties.dates) {
            layer.bindPopup(feature.properties.dates.join('<br>'));
        }
    }
}

function gymMarker(feature, latlng) {
    let iconUrl = 'gym.png';
    console.log(feature.properties['marker-color']);
    if (feature.properties && feature.properties['marker-color'] && feature.properties['marker-color'] === '#000000') {
        iconUrl = 'ex-raid.png'
    }

    let gymIcon = L.icon({
        iconUrl: iconUrl,
        iconSize: [32, 32],
        iconAnchor: [24, 32],
        tooltipAnchor: [-12, -18],
        popupAnchor: [-12, -18]
    });

    let markerOptions = {
        icon: gymIcon
    };

    return L.marker(latlng, markerOptions);
} 