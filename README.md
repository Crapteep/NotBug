
## Installation and Setup

1. **Clone the Repository and navigate to the project directory**

   ```bash
   git clone https://github.com/Crapteep/NotBug.git
   cd NotBug
   ```

2. **Configure Environment Variables**

   Create a `.env` file in the root directory of the project and add the following variables:

   ```bash

    # Postgres
    POSTGRES_SERVER=db
    POSTGRES_PORT=5432
    POSTGRES_DB=app
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD="postgres"

    # Backend
    DOMAIN=localhost
    ENVIRONMENT=local
    BACKEND_CORS_ORIGINS="http://localhost"
    FIRST_SUPERUSER="admin@example.com"
    FIRST_SUPERUSER_PASSWORD="adminadmin"
    API_V1_STR="/api/v1"
    PROJECT_NAME="todolist"
    DOCKER_IMAGE_BACKEND=backend


3. **Run the Application**

   Use Docker Compose to build and run the application:

   ```bash
   docker-compose up --build -d
   ```

   This command will build the Docker images for both the frontend and backend, and start the containers.

4. **Accessing the Application**

   Once the containers are up and running:
   - The todo-flask API will be available at `http://localhost:5000/api/v1/tasks/` and adminer will be available at `http://localhost:8080`


| **Endpoint**                    | **Method** | **Description**                                 | **Request Body**      | **Response**                                  |
|----------------------------------|------------|-------------------------------------------------|-----------------------|-----------------------------------------------|
| `/api/v1/tasks`                 | `POST`     | Create a new task                               | JSON object (TaskCreate) | JSON object with the created task (201)       |
| `/api/v1/tasks`                 | `GET`      | Retrieve a list of tasks                        | Query params (`skip`, `limit`) | JSON array of tasks (200)                    |
| `/api/v1/tasks`                 | `DELETE`   | Delete all tasks                                | None                  | JSON object with message (200)               |
| `/api/v1/tasks/<uuid:id>`       | `GET`      | Retrieve task by ID                             | None                  | JSON object with the task (200)              |
| `/api/v1/tasks/<uuid:id>`       | `PUT`      | Update task by ID                               | JSON object (TaskUpdate) | JSON object with the updated task (200)      |
| `/api/v1/tasks/<uuid:id>`       | `DELETE`   | Delete task by ID                               | None                  | JSON object with message (200)               |

        
   - The blog-django app will be accessible at `http://localhost:8000`
   - The pokemons-angular app will be accessible at `http://localhost:4500`
   - The cars-angular app will be accessible at `http://localhost:3000`


## Stopping the Application

To stop the application, use:

```bash
docker-compose down
```

This will stop and remove the containers, but preserve your data volumes.