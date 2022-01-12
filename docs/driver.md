## Create

Create new driver.

### Request

#### Header

| Property      | Value            | Description           |
| ------------- | ---------------- | --------------------- |
| URL           | /driver          | Request url.          |
| Method        | POST             | Request method.       |
| Content-Type  | application/json | Request body type.    |
| Authorization | Bearer [token]   | Request authorization |

#### Body

| Field        | Type     | Default | Description           |
| ------------ | -------- | ------- | --------------------- |
| name         | `string` |         | Driver's name.        |
| phone_number | `string` |         | Driver's phone number |

### Response

#### Status

| Code | Description           |
| ---- | --------------------- |
| 201  | Created successful.   |
| 409  | Driver already exist. |

#### Body

| Field | Type     | Description          |
| ----- | -------- | -------------------- |
| token | `string` | Authorization token. |
