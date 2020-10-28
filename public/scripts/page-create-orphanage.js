const map = L.map("mapid").setView([-27.2206463, -49.6506144], 16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
});

let marker;

// create and add marker
map.on("click", (event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  document.querySelector("[name=lat]").value = lat;
  document.querySelector("[name=lng]").value = lng;

  // remove icon
  marker && map.removeLayer(marker);

  // add icon layer
  marker = L.marker([lat, lng], { icon }).addTo(map);
});

// add photo field
function addPhotoField() {
  //get 'photos' container #images
  const container = document.querySelector("#images");

  // get duplicate container .new-upload
  const fieldsContainer = document.querySelectorAll(".new-upload");

  // duplicate (clone)
  const newFieldContainer = fieldsContainer[
    fieldsContainer.length - 1
  ].cloneNode(true);

  // verify if field is empty. If true, not create a new field
  const input = newFieldContainer.children[0];
  if (input.value == "") {
    return;
  }

  // clean field before adding to #images
  input.value = "";

  // add clone to #images container
  container.appendChild(newFieldContainer);
}

function deleteField(event) {
  const span = event.currentTarget;

  const fieldsContainer = document.querySelectorAll(".new-upload");

  if (fieldsContainer.length < 2) {
    // clean field value
    span.parentNode.children[0].value = "";
    return;
  }

  // delete field
  span.parentNode.remove();
}

// yes or no selection change
function toggleSelect(event) {
  // remove class .active (both buttons)
  document.querySelectorAll(".button-select button").forEach((button) => {
    button.classList.remove("active");
  });

  // get button clicked
  const button = event.currentTarget;

  // add class .active
  button.classList.add("active");

  // update hidden input with selected value
  const input = document.querySelector('[name="open_on_weekends"]');
  input.value = button.dataset.value;
}

function validate(event) {
  const lat = document.querySelector('[name=lat]').value
  const lng = document.querySelector('[name=lng]').value

  if(lat == "" || lng == "") {
    event.preventDefault()
    alert("Selecione um ponto no mapa")
  }

}
