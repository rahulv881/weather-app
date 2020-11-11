console.log("Client side javascript is loaded.");

const weatherApp = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherApp.addEventListener('submit',(event)=>{
  event.preventDefault();
  console.log('testing');

  fetch("/weather?address="+search.value).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageTwo.textContent = data.error;
        console.log(data.error);
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;

        console.log(data.location);
        console.log(data.forecast);
      }
    });
  });
});