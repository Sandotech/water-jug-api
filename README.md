# Water Jug Problem API

This API provides a solution to the classic Water Jug Challenge Problem. Given the capacities of two jugs and a desired amount of water, the API determines if it's possible to measure the desired amount using the two jugs and returns the steps to achieve it.

## API Structure

The `src` folder of this project is structured in this way:

```bash
src/
├── app.ts
├── domain
│   ├── entities
│   │   └── WaterJugState.ts
│   └── interfaces
│       └── WaterJugSolver.ts
├── infrastructure
│   ├── logger.ts
│   ├── repositories
│   │   └── WaterJugRepository.ts
│   └── utils
│       ├── GenerateNextState.ts
│       └── Queue.ts
├── interface
│   ├── controllers
│   │   └── WaterJugController.ts
│   ├── routes
│   │   └── waterJugRoutes.ts
│   └── swagger.ts
└── use-cases
    └── WaterJugImpl.ts

11 directories, 11 files
```

- `app.ts` wraps the whole application to run the server.
- `domain` is an independent folder that contains all our entities and interfaces.
- `use-cases` contains the logic to solve the Water Jug Problem.
- `infrastructure` wraps implementations of the interface `(WaterJug)`, the Queue object, and a logger to watch the flow of the app.
- `interface` contains the API REST in Express (`routes` and `controllers`).

## API Endpoint

### Solve Water Jug Problem

- **URL**: `/solve`
- **Method**: `POST`
- **Description**: Solves the water jug problem given the capacities of two jugs and the desired amount of water.
- **Request Body**:
  - `x_capacity`: The capacity of the first jug (integer).
  - `y_capacity`: The capacity of the second jug (integer).
  - `z_amount_wanted`: The desired amount of water (integer).

- **Responses**:
  - **200 OK**: Solution found.
    ```json
    {
      "solution": [
        { "step": "number", "bucketX": "number", "bucketY": "number", "action": "string" },
        { "step": "number", "bucketX": "number", "bucketY": "number", "action": "string", "status": "Solved" } // add "status" Solved if solution is found in this step
        ...
      ]
    }
    ```
  - **400 Bad Request**: Invalid input.
    ```json
    {
      "error": "Invalid input. All inputs must be positive integers."
    }
    ```
  - **404 Not Found**: No solution found.
    ```json
    {
      "error": "No solution found."
    }
    ```
  - **500 Internal Server Error**: Unexpected error.
    ```json
    {
      "error": "An unexpected error occurred."
    }
    ```

## How to Run This API

### Prerequisites

To run it on your local machine, you'll need these packages installed:

- Node.js
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sandotech/water-jug-api.git
   cd water-jug-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the server:
   ```bash
   npm run start
   ```

2. The server will be running at `http://localhost:3000`.

3. Access the Swagger UI documentation at `http://localhost:3000/api-docs`.

You'll see the next output on the terminal:

```bash
{"level":"info","message":"Server is running on port 3000","timestamp":"the actual timestamp"}
```

This is a message from the logger indicating that our `API` is running without problems.

**feat**: You can try this `API` by making `POST` calls to this link: [production](https://water-jug-api-production.up.railway.app/solve)

## Algorithm Explanation

The Water Jug Challenge Problem is solved using a breadth-first search (BFS) algorithm. The algorithm explores all possible states of the two jugs until it finds a state where one of the jugs contains the desired amount of water or determines that no solution is possible.

The steps are organized in a `Queue` structure, using the FIFO organization (First In, First Out) to organize each step. This is located in the `utils` folder.

### Step-by-Step Explanation:

1. **Initialize**: Start with both jugs empty.
2. **Queue**: Use a queue to explore each state.
3. **States**: Each state represents the amount of water in both jugs.
4. **Transitions**: From each state, generate new states by:
   - Filling either jug to its full capacity.
   - Emptying either jug.
   - Pouring water from one jug to the other until one jug is empty or the other is full.
5. **Visited States**: Keep track of visited states to avoid infinite loops.
6. **Check**: If a state with the desired amount of water is found, return the path to that state.
7. **Terminate**: If the queue is exhausted without finding a solution, return that no solution is possible.

You can see it in code here `use-cases/WaterJugImpl.ts` and check all the imported files.

### Example:

Given jug capacities `x = 4` and `y = 3`, and desired amount `z = 2`:

1. Start with `(0, 0)`.
2. Fill jug `x`: `(4, 0)`.
3. Pour from `x` to `y`: `(1, 3)`.
4. Empty jug `y`: `(1, 0)`.
5. Pour from `x` to `y`: `(0, 1)`.
6. Fill jug `x`: `(4, 1)`.
7. Pour from `x` to `y`: `(2, 3)`.

The solution is found at `(2, 3)`.

## Example Requests and Responses

### Example Request

```bash
curl -X POST "http://localhost:3000/solve" \
-H "Content-Type: application/json" \
-d '{
  "x_capacity": 100,
  "y_capacity": 2,
  "z_amount_wanted": 92
}'
```

### Example Response

```json
{
  "solution": [
    {
      "step": 1,
      "bucketX": 100,
      "bucketY": 0,
      "action": "Fill bucket X"
    },
    {
      "step": 2,
      "bucketX": 98,
      "bucketY": 2,
      "action": "Transfer from bucket X to Y"
    },
    {
      "step": 3,
      "bucketX": 98,
      "bucketY": 0,
      "action": "Empty bucket Y"
    },
    {
      "step": 4,
      "bucketX": 96,
      "bucketY": 2,
      "action": "Transfer from bucket X to Y"
    },
    {
      "step": 5,
      "bucketX": 96,
      "bucketY": 0,
      "action": "Empty bucket Y"
    },
    {
      "step": 6,
      "bucketX": 94,
      "bucketY": 2,
      "action": "Transfer from bucket X to Y"
    },
    {
      "step": 7,
      "bucketX": 94,
      "bucketY": 0,
      "action": "Empty bucket Y"
    },
    {
      "step": 8,
      "bucketX": 92,
      "bucketY": 2,
      "action": "Transfer from bucket X to Y",
      "status": "Solved"
    }
  ]
}
```

## Documentation

The API is documented using Swagger UI, which provides an interactive interface for testing the API endpoints. After starting the server, you can access the Swagger UI documentation at `http://localhost:3000/api-docs` or [railway Deploymnet](https://water-jug-api-production.up.railway.app/api-doc).