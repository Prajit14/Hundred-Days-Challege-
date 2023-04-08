// // JavaScript
// const loader = document.getElementById('loader');
// const content = document.getElementById('content');

// // Show the loader
// loader.style.display = 'block';

// //Fetch data asynchronously
// fetch('https://jsonplaceholder.typicode.com/todos/1')
//   .then(response => response.json())
//   .then(data => {
//     // Hide the loader
//     loader.style.display = 'none';

//     // Display the data
//     content.innerHTML = `<p>${JSON.stringify(data)}</p>`;
//   })
//   .catch(error => console.error(error));

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/14');
xhr.onload = () => {
  if (xhr.status === 200) {
    const responseData = JSON.parse(xhr.responseText);
    const responseString = `Title: ${responseData.title}, User ID: ${responseData.userId}, Completed: ${responseData.completed}`;
    // document.getElementById('response').textContent = responseString;
    //const responseString = JSON.stringify(responseData, null, 2);
    document.getElementById('response').textContent = responseString;
  } else {
    console.error(`Request failed with status ${xhr.status}`);
  }
};
xhr.send();
  