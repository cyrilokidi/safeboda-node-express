## Create

Create new passenger

### Request

#### Header

| Property      | Value            | Description           |
| ------------- | ---------------- | --------------------- |
| URL           | /passenger       | Request url.          |
| Method        | POST             | Request method.       |
| Content-Type  | application/json | Request body type.    |
| Authorization | Bearer [token]   | Request authorization |

#### Body

| Field        | Type     | Default | Description            |
| ------------ | -------- | ------- | ---------------------- |
| name         | `string` |         | Passenger name.        |
| phone_number | `string` |         | Passenger phone number |

### Response

#### Status

| Code | Description              |
| ---- | ------------------------ |
| 201  | Created successful.      |
| 409  | Passenger already exist. |

#### Body

| Field        | Type     | Description                |
| ------------ | -------- | -------------------------- |
| id           | `uuid`   | Passenger id.              |
| name         | `string` | Passenger phone name.      |
| phone_number | `string` | Passenger phone number.    |
| created_at   | `date`   | Passenger created at date. |
