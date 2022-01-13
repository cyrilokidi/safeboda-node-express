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

#### Example

```js
{
    "name": "Jane Doe",
    "phone_number": "+254700000000"
}
```

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

#### Example

```js
{
    "id": "ed62e260-0231-4d1d-8278-42257e41ea1c",
    "name": "Jane Doe",
    "phone_number": "+254700000000",
    "created_at": "2022-01-12T11:39:05.047Z"
}
```
