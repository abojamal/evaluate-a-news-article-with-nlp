//handling the user submit event
function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById('name').value;
  Client.checkForBlank(formText);

  console.log('::: Form Submitted :::');

  //sending user input to meaningcloud API for NLP then displaying the results on the web page
  postData('/api', { txt: formText }).then((res) => {
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
