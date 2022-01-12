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

| Field        | Type     | Default | Description         |
| ------------ | -------- | ------- | ------------------- |
| name         | `string` |         | Driver name.        |
| phone_number | `string` |         | Driver phone number |

#### Example

```js
{
    "name": "John Doe",
    "phone_number": "+254700000000"
}
```

### Response

#### Status

| Code | Description           |
| ---- | --------------------- |
| 201  | Created successful.   |
| 409  | Driver already exist. |

#### Body

| Field        | Type      | Description             |
| ------------ | --------- | ----------------------- |
| id           | `uuid`    | Driver id.              |
| name         | `string`  | Driver phone name.      |
| phone_number | `string`  | Driver phone number.    |
| suspended    | `boolean` | Driver account status   |
| created_at   | `date`    | Driver created at date. |

#### Example

```js
{
    "id": "4bb6ff6c-ab09-471b-988f-118a8015b1f0",
    "name": "John Doe",
    "phone_number": "+254700000000",
    "suspended": false,
    "created_at": "2022-01-12T11:14:40.821Z"
}
```

## Suspend

Suspend driver by id.

### Request

#### Header

| Property      | Value                 | Description           |
| ------------- | --------------------- | --------------------- |
| URL           | /driver/`:id`/suspend | Request url.          |
| Method        | POST                  | Request method.       |
| Authorization | Bearer [token]        | Request authorization |

#### Params

| Field | Description |
| ----- | ----------- |
| id    | Driver id.  |

### Response

#### Status

| Code | Description             |
| ---- | ----------------------- |
| 204  | Suspended successfully. |

## Unuspend

Unsuspend driver by id.

### Request

#### Header

| Property      | Value                 | Description           |
| ------------- | --------------------- | --------------------- |
| URL           | /driver/`:id`/suspend | Request url.          |
| Method        | DELETE                | Request method.       |
| Authorization | Bearer [token]        | Request authorization |

#### Params

| Field | Description |
| ----- | ----------- |
| id    | Driver id.  |

### Response

#### Status

| Code | Description               |
| ---- | ------------------------- |
| 204  | Unsuspended successfully. |
