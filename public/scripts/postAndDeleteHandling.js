const paragraphsFromTasks = document.querySelectorAll('.single-task-p');

async function changeStatus(event) {

    event.preventDefault();

    const id = event.target.dataset.id;
    const status = event.target.dataset.status;

    const data = {id: id, status: status};
    console.log(JSON.stringify(data));
    try {
        const response = await fetch('/statuschange', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
    // console.log(response.json());
    } catch (error) {
        alert('could not send request - try again later!');
    }
}

for (paragraphsFromTask of paragraphsFromTasks) {
    paragraphsFromTask.addEventListener('click', changeStatus);
}