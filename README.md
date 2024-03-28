
## PioneerLab Backend Assignment


## Deployment and Swagger Documentation

- [Backend Deployment Link](https://pioneerlabs.onrender.com/) - Visit this link to access the deployed API.
- [Swagger Documentation Link](https://pioneerlab-backend.onrender.com/apidocs/) - View the Swagger documentation for detailed API specifications.


## Getting Started

To run the project locally, follow these simple steps:

1. Clone this repository to your local machine.
2. Install project dependencies using `npm install`.
3. Set up environment variables, including the secret key for JWT and any necessary configurations for connecting to MongoDB.
4. Start the server by running `npm start`.


## Task 1: Implement User Authentication with JWT

### User Registration
- **URL:** `/api/user/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**
    ```json
    {
        "name": "string",
        "email": "string",
        "pass": "string",
        "role": "string"
    }
    ```
- **Response:**
    ```json
    {
        "msg": "User successfully registered",
        "user": { "userObject" }
    }
    ```

### User Login
- **URL:** `/api/user/login`
- **Method:** `POST`
- **Description:** Logs in a user.
- **Request Body:**
    ```json
    {
        "email": "string",
        "pass": "string"
    }
    ```
- **Response:**
    ```json
    {
        "msg": "Login successful",
        "token": "string",
        "refresh_token": "string"
    }
    ```

### User Logout
- **URL:** `/api/user/logout`
- **Method:** `GET`
- **Description:** Logs out a user.
- **Request Headers:**
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```
- **Response:**
    ```json
    {
        "msg": "Logged out"
    }
    ```

# Task 2: Create API Endpoints for Data Retrieval

Objective: Develop API endpoints to fetch data from a public API with filtering options.

### Fake API:
Explore the provided public API for fetching data: [Fake API](https://api.publicapis.org/entries)

Requirements:
Utilize Node.js and Express.js to create API routes.
Fetch data from the provided public API.
Implement filtering options for data retrieval based on categories and result limits.
Evaluation Criteria:
Successful integration of API endpoints for data retrieval.
Proper implementation of filtering options for categories and result limits.
Error handling for invalid requests and edge cases.


# API Endpoints for Checking Filtering and Sorting

Explore various functionalities of your API with these endpoints.

1. **Filtering by Category**
   - **Endpoint**: `http://localhost:4500/api/entries?category=Animals`
   - **Description**: Filter entries by the "Animals" category.
   - **Sample Output**:
     ```json
     {
       "totalResults": 3,
       "currentPage": 1,
       "entries": [
         {
           "API": "AdoptAPet",
           "Description": "Resource to help get pets adopted",
           "Auth": "apiKey",
           "HTTPS": true,
           "Cors": "yes",
           "Link": "https://www.adoptapet.com/public/apis/pet_list.html",
           "Category": "Animals"
         },
         {
           "API": "Axolotl",
           "Description": "Collection of axolotl pictures and facts",
           "Auth": "",
           "HTTPS": true,
           "Cors": "no",
           "Link": "https://theaxolotlapi.netlify.app/",
           "Category": "Animals"
         },
         {
           "API": "Cat Facts",
           "Description": "Daily cat facts",
           "Auth": "",
           "HTTPS": true,
           "Cors": "no",
           "Link": "https://alexwohlbruck.github.io/cat-facts/",
           "Category": "Animals"
         }
       ]
     }
     ```

2. **Sorting by API Name**
   - **Endpoint**: `http://localhost:4500/api/entries?sort=apiName`
   - **Description**: Sort entries alphabetically by API name.
   - **Sample Output**:
     ```json
     {
       "totalResults": 1427,
       "currentPage": 1,
       "entries": [
         {
           "API": "3rd Party Formula 1 Data",
           "Description": "Formula 1 Data from the beginning of the world championships in 1950",
           "Auth": "",
           "HTTPS": true,
           "Cors": "no",
           "Link": "https://ergast.com/mrd/",
           "Category": "Sports & Fitness"
         },
         {
           "API": "7Timer!",
           "Description": "Global weather forecast",
           "Auth": "",
           "HTTPS": true,
           "Cors": "unknown",
           "Link": "https://7timer.info/",
           "Category": "Weather"
         },
         ...
       ]
     }
     ```

3. **Combining Filtering and Sorting**
   - **Endpoint**: `http://localhost:4500/api/entries?category=Animals&sort=apiName`
   - **Description**: Filter entries by the "Animals" category and sort them alphabetically by API name.
   - **Sample Output**: _(Similar to the previous sample with filtered and sorted entries)_

4. **Pagination with Filtering and Sorting**
   - **Endpoint**: `http://localhost:4500/api/entries?page=2&limit=10&sort=apiName`
   - **Description**: Retrieve the second page of results with a limit of 10 entries per page, sorted alphabetically by API name.
   - **Sample Output**: _(Paginated and sorted entries for the second page)_

5. **Testing for No Results**
   - **Endpoint**: `http://localhost:4500/api/entries?category=NonExistentCategory`
   - **Description**: Test if the API properly handles cases where no entries match the specified category.
   - **Sample Output**: _(An empty array as there are no entries for the non-existent category)_

6. **Testing for Invalid Sorting Parameter**
   - **Endpoint**: `http://localhost:4500/api/entries?sort=invalidParameter`
   - **Description**: Test if the API properly handles cases where an invalid sorting parameter is provided.
   - **Sample Output**: _(Error message indicating invalid sorting parameter)_
  

 ## Task 4: Secure API Endpoint for Authenticated Users Only

### Get All Users
- **URL:** `/api/list/all`
- **Method:** `GET`
- **Description:** Get a list of all users.
- **Request Headers:**
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```
- **Response:**
    ```json
    {
        "users_list": [ { "userObjects" } ]
    }
    ```

### Update User
- **URL:** `/api/list/update/:id`
- **Method:** `PATCH`
- **Description:** Update a user by ID.
- **Request Parameters:**
    - `id`: User ID
- **Request Body:**
    ```json
    {
        "fieldsToUpdate": "newValues"
    }
    ```
- **Response:**
    ```json
    {
        "msg": "User updated successfully"
    }
    ```

### Delete User
- **URL:** `/api/list/delete/:id`
- **Method:** `DELETE`
- **Description:** Delete a user by ID.
- **Request Parameters:**
    - `id`: User ID
- **Request Headers:**
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```
- **Response:**
    ```json
    {
        "msg": "User deleted successfully"
    }
    ```
