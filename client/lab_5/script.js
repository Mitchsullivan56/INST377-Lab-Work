async function mainEvent() {
    const form = document.querySelector('.main_form');
    form.addEventListener('submit', async (submitEvent) => {
        submitEvent.preventDefault();
        console.log('form submission')
        const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
        const arrayFromJSON = await results.json();
        console.table(arrayFromJSON.data);
    });
}

document.addEventListener('DOMContentLoaded', async () => mainEvent());