function getRandomIntInclusive(min, max) {
    const newMin = Math.ceil(min);
    const newMax = Math.floor(max);
    return Math.floor(Math.random() * (newMax - newMin + 1) + newMin);
  }
  
  function restoArrayMake(dataArray) {
    //console.log("fired dataHandler");
    //console.table(dataArray);
    const range = [...Array(15).keys()];
    const listItems = range.map((item, index) => {
      const restNum = getRandomIntInclusive(0, dataArray.length);
      return dataArray[restNum];
    });
  
    //console.log(listItems);
    return listItems;
    //range.forEach((item) => {
    //console.log("range item", item);
    //return[dataArray]
    //});
  }
  
  function createHtmlList(collection) {
    //console.log("fired Html Creator");
    //console.log(collection);
    const targetList = document.querySelector(".resto-list");
    targetList.innerHTML = "";
    collection.forEach((item) => {
      const { name } = item;
      const displayName = name.toLowerCase();
      const injectThisItem = `<li>${item.name}</li>`;
      targetList.innerHTML += injectThisItem;
    });
  }
  
  function initMap() {
    const map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
    }).addTo(map);
    return map;
  }

  async function mainEvent() {
    console.log("script loaded");
    const form = document.querySelector(".main_form");
    const submit = document.querySelector(".submit_button");
  
    const resto = document.querySelector("#resto_name");
    const zipcode = document.querySelector("#zipcode");
    const map = initMap();
    //const results = await fetch(
      //"https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json"
    //);
    //const arrayFromJson = await results.json();
    //console.log(arrayFromJson);
    let arrayFromJson = {data: []};


    if (arrayFromJson.length > 0) {
      submit.style.display = "block";
      let currentArray = [];
      resto.addEventListener("input", async (event) => {
        console.log(event.target.value);
  
        //if (currentArray.length < 1) {
          //return;
        //}
        
        const selectResto = arrayFromJson.filter((item) => {
          const lowerName = item.name.toLowerCase();
          const lowerValue = event.target.value.toLowerCase();
          return lowerName.includes(lowerValue);
        });
  
        console.log(selectResto);
        createHtmlList(selectResto);
      });
  
      form.addEventListener("submit", async (submitEvent) => {
        submitEvent.preventDefault();
        //console.log("form submission");
        currentArray = restoArrayMake(arrayFromJson);
        console.log(currentArray);
        createHtmlList(currentArray);
      });
    }
  }
  
  document.addEventListener("DOMContentLoaded", async () => mainEvent());