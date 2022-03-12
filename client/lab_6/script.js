function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin) + newMin);
}

function dataHandler(dataArray) {
  console.log("fired dataHandler");
  console.table(dataArray);
  const range = [...Array(15).keys()];
  const listItems = range.map((item, index) => {
    return getRandomIntInclusive(0, dataArray);
  });
  
  console.log('list Items')
  
  //range.forEach((item) => {
    //console.log("range item", item);
    //return[dataArray]
  //});
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
      dataHandler(arrayFromJson.data);
    });
  }
}

document.addEventListener("DOMContentLoaded", async () => mainEvent());
