<<<<<<< HEAD
# DevTrack: End-to-End CI/CD Pipeline for a Containerized MERN Stack Application

> **Project Abstract**
> *This project is used to manage tasks efficiently while automating software deployment using CI/CD pipelines. It works by connecting a MERN stack application with GitHub Actions, Docker, and cloud deployment technologies to provide reliable and automated software delivery.*

## 1. Project Introduction
DevTrack is a modern, full-stack task management and to-do list web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The core objective of this project is not just to provide a functional task management tool, but to demonstrate a production-ready, automated software delivery lifecycle. It features a complete CI/CD (Continuous Integration and Continuous Deployment) pipeline using GitHub Actions, containerization with Docker, and cloud deployment on AWS EC2. DevTrack ensures that every code change is automatically tested, built, and seamlessly deployed to a live environment without manual intervention.

## 2. How the To-Do List Works in DevTrack
DevTrack provides a structured and intuitive way for users to manage their daily tasks. Upon logging in, users are presented with a clean dashboard where they can create new tasks, update their status (e.g., pending, in-progress, completed), edit details, and delete obsolete entries. The application organizes these tasks in real-time, ensuring that users have an up-to-date view of their workload. The to-do list is personalized; each user only sees their own tasks, secured by robust authentication mechanisms.

## 3. Step-by-step Working Process
1. **User Registration/Login**: The user visits the application URL and either creates a new account or logs into an existing one.
2. **Dashboard Access**: After successful authentication, the user is redirected to their personal task dashboard.
3. **Task Operations (CRUD)**:
   - **Create**: User adds a new task with a title and description.
   - **Read**: The dashboard fetches and displays all existing tasks belonging to the user.
   - **Update**: User edits task details or marks a task as complete.
   - **Delete**: User removes a task from the list.
4. **Data Persistence**: Every action triggers an API call to the backend, which securely updates the MongoDB database.
5. **Real-time Feedback**: The frontend UI updates instantly to reflect the changes, providing a smooth user experience.
6. **Logout**: The user securely logs out, terminating the active session.

## 4. User Workflow Explanation
* **Sign Up / Sign In**: A new user enters their email and password to register. Existing users log in. The system validates the credentials.
* **Token Issuance**: Upon successful login, the server issues a JSON Web Token (JWT) which the user's browser stores securely.
* **Accessing the App**: The user navigates through the application. For every protected action (like viewing tasks), the stored JWT is sent along with the request to prove the user's identity.
* **Managing Tasks**: The user interacts with the UI to manage their to-do list. Each interaction is seamless and responsive.
* **Session End**: Clicking logout removes the JWT from the browser, effectively ending the secure session and redirecting the user to the login screen.

## 5. Frontend, Backend, and Database Communication
* **Frontend (React.js)**: Acts as the presentation layer. It captures user inputs and displays data. When a user performs an action, React components trigger HTTP requests (using Axios or the native Fetch API) to the backend server.
* **Backend (Node.js & Express.js)**: Acts as the middleman and business logic layer. It receives requests from the frontend, validates the data, checks user authorization, and then interacts with the database.
* **Database (MongoDB Atlas)**: Acts as the cloud-based data storage layer. It receives queries from the backend (via Mongoose), executes them (e.g., saving a new task, finding a user), and returns the results back to the Node.js server.
* **Flow**: Frontend `->` HTTP Request (JSON) `->` Backend `->` Database Query `->` MongoDB `->` Data `->` Backend `->` HTTP Response (JSON) `->` Frontend.

## 6. JWT Authentication Working
1. **Login Request**: User submits credentials (email/password).
2. **Validation**: Backend verifies the password against the securely hashed version stored in MongoDB.
3. **Token Generation**: If valid, the backend generates a JWT containing the user's unique ID and signs it with a secret key.
4. **Token Storage**: The token is sent back to the client and stored (typically in LocalStorage or an HttpOnly cookie).
5. **Authenticated Requests**: For any subsequent request requiring authorization (e.g., creating a task), the frontend attaches the JWT in the `Authorization` header.
6. **Verification**: The backend intercepts the request and verifies the JWT signature. If valid, the request proceeds; if tampered with or expired, it is rejected.

## 7. Task Creation and Management Flow
1. **Input**: User types a task in the React UI and clicks "Add".
2. **API Call**: React sends a `POST /api/tasks` request with the task data and the user's JWT.
3. **Backend Processing**: Express.js middleware verifies the JWT to securely identify the exact user making the request.
4. **Database Insertion**: The backend creates a new Task document, links it to the user's ID, and saves it to MongoDB Atlas.
5. **Confirmation**: Backend sends a success response back to the client with the newly created task data.
6. **UI Update**: React updates the local state and visually adds the new task to the list without reloading the page.

## 8. CI/CD Pipeline Workflow using GitHub Actions
1. **Code Commit**: A developer pushes code changes to the GitHub repository (e.g., to the `main` branch).
2. **Continuous Integration (CI)**:
   - GitHub Actions detects the push and triggers an automated workflow.
   - The workflow checks out the code, sets up the Node.js environment, and installs dependencies.
   - Automated tests can be executed here to ensure the new code doesn't break existing functionality.
3. **Continuous Deployment (CD)**:
   - If the code is verified, the workflow proceeds to build the Docker images for both the frontend and backend.
   - The images are pushed to a container registry (like Docker Hub).
   - The workflow securely connects to the AWS EC2 instance via SSH and pulls the latest images.
   - Existing containers are stopped, and the new containers are spun up seamlessly.

## 9. Docker Containerization Workflow
* **Dockerfile Creation**: Separate Dockerfiles are written for the React frontend and the Node.js backend. These files define the exact environment, dependencies, and startup commands required for each.
* **Image Building**: Docker reads the Dockerfiles and builds self-contained images containing everything needed to run the application components.
* **Docker Compose**: A `docker-compose.yml` file is used to define how the frontend and backend containers interact, including network settings, exposed ports, and environment variables.
* **Execution**: Running the `docker-compose up` command orchestrates the simultaneous launching of all necessary containers, ensuring they communicate flawlessly in an isolated environment.

## 10. AWS EC2 Deployment Workflow
1. **Provisioning**: An EC2 instance (e.g., running Ubuntu) is launched on AWS. Security groups are configured to allow HTTP/HTTPS (web) and SSH (admin) traffic.
2. **Environment Setup**: Docker and Docker Compose are installed on the fresh EC2 instance.
3. **Code Transfer**: Via the GitHub Actions pipeline, the application code (specifically the `docker-compose.yml`) is transferred to the server.
4. **Environment Variables**: Sensitive data (database URIs, JWT secrets) are securely configured on the server using `.env` files.
5. **Execution**: The application is started on the server using Docker containers, making the DevTrack application accessible globally over the internet via the EC2 instance's public IP address.

## 11. Technical Working Table

| Component | Technology Used | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React.js, HTML/CSS | User Interface, state management, and client-side routing. |
| **Backend** | Node.js, Express.js | API routing, business logic, handling requests/responses. |
| **Database** | MongoDB Atlas | NoSQL cloud database for storing user and task data. |
| **Authentication** | JWT, bcrypt.js | Secure user login and password hashing. |
| **Containerization** | Docker, Docker Compose | Packaging app components into isolated, portable containers. |
| **CI/CD Automation** | GitHub Actions | Automating testing, building, and deployment processes. |
| **Cloud Hosting** | AWS EC2 | Virtual server for deploying the live application. |

## 12. Simple Workflow Diagram using arrows

```text
[ Developer ] --> Pushes Code --> [ GitHub Repository ]
                                        |
                                        v
                               [ GitHub Actions (CI/CD) ]
                                 - Runs Automated Tests
                                 - Builds Docker Images
                                        |
                                        v
[ User ]                      [ Docker Hub / Registry ]
   |                                    |
   v                                    v
[ React Frontend ] <----- API -----> [ Node.js Backend ]
(Running on EC2)                     (Running on EC2)
                                        |
                                        v
                              [ MongoDB Atlas (Database) ]
```

## 13. Applications of the Project
* **Personal Productivity**: Individuals can use it to track daily chores, assignments, and goals efficiently.
* **Team Collaboration**: Can be easily extended for small teams to assign and track project milestones.
* **Educational Tool**: Serves as a perfect template for understanding modern web development, API integrations, and DevOps practices.
* **Foundation for Complex Systems**: The underlying architecture is highly scalable and can be used to build enterprise-level project management tools (like Jira or Trello clones).

## 14. Advantages of the Project
* **High Availability & Scalability**: Cloud deployment on AWS ensures the app is accessible 24/7 and can be scaled up if user traffic increases.
* **Consistency**: Docker containerization eliminates the classic "it works on my machine" problem, ensuring the application runs identically in development and production environments.
* **Rapid & Reliable Updates**: The CI/CD pipeline allows for automated, error-free deployments, significantly reducing the time between writing code and delivering features to users.
* **Security**: Implementation of JWT and hashed passwords ensures user data and sessions are strongly protected.
* **Modern Architecture**: Uses the highly sought-after MERN stack, reflecting current software engineering industry standards.

## 15. Deployment Method
The project utilizes a modern **Containerized Cloud Deployment strategy**.
1. Application code is version-controlled securely on GitHub.
2. Upon merging updates to the main branch, GitHub Actions automatically builds updated Docker images for the application.
3. These images are transferred and deployed to an active AWS EC2 instance.
4. `docker-compose` is used on the server to manage the lifecycle of the containers, exposing the robust application to the public internet.

## 16. Short Viva Explanation
**Examiner:** "Can you explain your project briefly?"

**Student:** "Yes. My project is 'DevTrack', a full-stack task management application built using the MERN stack. It allows users to securely register, log in, and manage their daily to-do lists using a React frontend and a Node.js backend. The unique and highly technical part of this project is its robust DevOps architecture. Instead of a manual deployment, I have containerized the entire application using Docker and set up a complete CI/CD pipeline using GitHub Actions. This means whenever I push new code to GitHub, it automatically builds the updated Docker containers and deploys them directly to an AWS EC2 cloud server. It demonstrates not just how to build a modern web app, but how to automate its delivery securely and reliably, which aligns perfectly with current industry standards."
=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
>>>>>>> 0956932831296c22288541f9a6aff055888c5eb0
