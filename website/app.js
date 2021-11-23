/* Global Variables */



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();


//personal API key for openweathermap API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apikey = '&appid=3a7bbb54142d931d73ad298ab9465f4b&units=imperial';
//event listener to add function to existing html dom element
document.getElementById('generate').addEventListener('click', performAction);


//function called by event listener
function performAction(e) {
  const newZip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  getWeather(baseURL, newZip, apikey)
    .then(function(data) {
      
      console.log(data);
      // Add data to POST request
      postData('/add', {
        date: newDate,
        temp: data.main.temp,
        content: feelings
      })
      // Function which updates UI

      updateUI();

    })
};

// function to get web api data
const getWeather = async (baseURL, zip, key) => {
  const res = await fetch(baseURL + zip + key)
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('error', error);
  }
}

// Async POST
const postData = async (url = '', data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    //handle error
    console.log('Error', error);
  }
}

// Update user interface
const updateUI = async()=>{
  const request = await fetch('/all')
  try{
  const allData = await request.json();
  console.log(allData)
  document.getElementById('date').innerHTML = `Date:${allData.date}`;
  document.getElementById('temp').innerHTML = `Temperature:${allData.temp}`;
  document.getElementById('content').innerHTML = `I feel:${allData.content}`;
  }catch(err){
  console.log('error',err);
  }
  }