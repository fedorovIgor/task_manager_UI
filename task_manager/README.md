
Create container:
docker build -t task_manager_container .

ran:
docker run -d -p 4200:80 task_manager_container:latest