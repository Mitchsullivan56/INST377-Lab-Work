function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin + 1) + newMin);
}

function restoArrayMake(dataArray) {
  console.log("fired dataHandler");
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
  console.log("fired Html Creator");
  console.log(collection);
  const targetList = document.querySelector(".resto-list");
  targetList.innerHTML = '';
  collection.forEach((item) => {
    const {name} = item; 
    const displayName = name.toLowerCase();
    const injectThisItem = `<li>${item.name}</li>`;
    targetList.innerHTML += injectThisItem;
  });
}
async function mainEvent() {
  console.log("script loaded");
  const form = document.querySelector(".main_form");
  const submit = document.querySelector(".submit_button");

  const results = await fetch(
    "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json"
  );
  const arrayFromJson = await results.json();
  console.log(arrayFromJson);

  if (arrayFromJson.length > 0) {
    submit.style.display = "block";
    form.addEventListener("submit", async (submitEvent) => {
      submitEvent.preventDefault();
      console.log("form submission");
      const restoArray = restoArrayMake(arrayFromJson);
      createHtmlList(restoArray);
    });
  }
}

document.addEventListener("DOMContentLoaded", async () => mainEvent());
