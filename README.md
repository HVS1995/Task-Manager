# Database Schema Documentation

## Overview
The schema consists of a single `users` collection where each user document contains arrays for tasks and subtasks. This design encapsulates all necessary information related to a user’s tasks and their subtasks, ensuring efficient data retrieval and management.

## Collections and Documents

### Collection Name: `users`
- Each document in the `users` collection represents a single user.
- The document contains user information and an array of tasks, where each task can have its own array of subtasks.

### Document Structure

#### User Document
- **Description:** Stores information about users and their associated tasks and subtasks.
- **Fields:**
  - `_id`: Unique identifier for the user (ObjectId).
  - `name`: The name of the user (String).
  - `email`: The email of the user (String).
  - `tasks`: An array of task objects.

#### Task Object
- **Description:** Represents an individual task for a user.
- **Fields:**
  - `taskId`: Unique identifier for the task (ObjectId).
  - `subject`: The subject or title of the task (String).
  - `lastdate`: The deadline for the task (Date).
  - `status`: The status of the task (String).
  - `deleted`: Boolean flag indicating if the task is marked as deleted (Boolean).
  - `subtasks`: An array of subtask objects.
 
- #### Subtask Object
- **Description:** Represents an individual subtask associated with a task.
- **Fields:**
  - `subtaskId`: Unique identifier for the subtask (ObjectId).
  - `subject`: The subject or title of the subtask (String).
  - `deadline`: The deadline for the subtask (Date).
  - `status`: The status of the subtask (String).
  - `deleted`: Boolean flag indicating if the subtask is marked as deleted (Boolean).
 

## Example Documents

### Example User Document
```json
{
  "_id": "60c72b2f4f1a4e3d5f3d9c30",
  "name": "xyz",
  "email": "xyz@example.com",
  "tasks": [
    {
      "taskId": "60c72b2f4f1a4e3d5f3d9c31",
      "subject": "Complete project report",
      "deadline": "2024-06-01T00:00:00Z",
      "status": "pending",
      "deleted": false,
      "subtasks": [
        {
          "subtaskId": "60c72b2f4f1a4e3d5f3d9c32",
          "subject": "Gather requirements",
          "deadline": "2024-05-28T00:00:00Z",
          "status": "completed",
          "deleted": false
        },
        {
          "subtaskId": "60c72b2f4f1a4e3d5f3d9c33",
          "subject": "Draft report",
          "deadline": "2024-05-30T00:00:00Z",
          "status": "in-progress",
          "deleted": false
        }
      ]
    }
  ]
}


