
<h3>Create container:</h3>
docker build -t task_manager_container .

<h3>run:</h3>
docker run -d -p 4200:80 task_manager_container:latest