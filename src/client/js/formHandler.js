function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById('name').value;
  Client.checkForName(formText);

  console.log('::: Form Submitted :::');
  // console.log(formText);
  // fetch('http://localhost:8081/test')
  //   .then((res) => res.json())
  //   .then(function (res) {
  //     document.getElementById('results').innerHTML = res.message;
  //   });

  postData('/api', { txt: formText }).then(function (res) {
    document.getElementById('results').innerHTML =
      res.agreement + '<br />' + res.subjectivity;
  });
}

// Async POST
const postData = async (url = '', data = {}) => {
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
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};
export { handleSubmit };
