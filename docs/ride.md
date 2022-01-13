## Create

Create new ride

### Request

#### Header

| Property      | Value                              | Description           |
| ------------- | ---------------------------------- | --------------------- |
| URL           | /ride/`:passenger_id`/`:driver_id` | Request url.          |
| Method        | POST                               | Request method.       |
| Content-Type  | application/json                   | Request body type.    |
| Authorization | Bearer [token]                     | Request authorization |

#### Params

| Field        | Description   |
| ------------ | ------------- |
| passenger_id | Passenger id. |
| driver_id    | Driver id.    |

#### Body

| Field             | Type      | Default | Description            |
| ----------------- | --------- | ------- | ---------------------- |
| done              | `boolean` | false   | Ride status            |
| pickup_point_lat  | `number`  |         | Pickup point latitude. |
| pickup_point_long | `number`  |         | Pickup point longitude |
| destination_lat   | `number`  |         | Destination latitude.  |
| destination_long  | `number`  |         | Destination longitude  |

#### Example

```js
{
    "done": false,
    "pickup_point_lat": "-1.286389",
    "pickup_point_long": "36.817223",
    "destination_lat": "-1.286389",
    "destination_long": "36.817223"
}
```

### Response

#### Status

| Code | Description           |
| ---- | --------------------- |
| 201  | Created successfully. |
| 409  | Ride already exist.   |

#### Body

| Field             | Type      | Description             |
| ----------------- | --------- | ----------------------- |
| id                | `uuid`    | Ride id.                |
| passenger_id      | `uuid`    | Passenger id.           |
| driver_id         | `uuid`    | Driver id.              |
| done              | `boolean` | Ride status.            |
| pickup_point_lat  | `number`  | Pickup point latitude.  |
| pickup_point_long | `number`  | Pickup point longitude. |
| destination_lat   | `number`  | Destination latitude.   |
| destination_long  | `number`  | Destination longitude.  |
| created_at        | `date`    | Driver created at date. |

#### Example

```js
{
    "id": "b8befac1-597d-4513-b477-c0db8a5e4b1c",
    "passenger_id": "f0d71bb7-cffc-44f7-99e0-4cbb576f8480",
    "driver_id": "dca8cf17-d5db-45bf-af11-247f40304cd7",
    "done": false,
    "pickup_point_lat": "-1.286389",
    "pickup_point_long": "36.817223",
    "destination_lat": "-1.286389",
    "destination_long": "36.817223",
    "created_at": "2022-01-12T12:55:33.418Z"
}
```

## Stop

Stop ongoing ride by id.

### Request

#### Header

| Property      | Value            | Description           |
| ------------- | ---------------- | --------------------- |
| URL           | /ride/`:id`/stop | Request url.          |
| Method        | PUT              | Request method.       |
| Authorization | Bearer [token]   | Request authorization |

#### Params

| Field | Description |
| ----- | ----------- |
| id    | Ride id.    |

### Response

#### Status

| Code | Description         |
| ---- | ------------------- |
| 200  | Stopped successful. |

#### Body

| Field             | Type      | Description             |
| ----------------- | --------- | ----------------------- |
| id                | `uuid`    | Ride id.                |
| passenger_id      | `uuid`    | Passenger id.           |
| driver_id         | `uuid`    | Driver id.              |
| done              | `boolean` | Ride status.            |
| pickup_point_lat  | `number`  | Pickup point latitude.  |
| pickup_point_long | `number`  | Pickup point longitude. |
| destination_lat   | `number`  | Destination latitude.   |
| destination_long  | `number`  | Destination longitude.  |
| created_at        | `date`    | Driver created at date. |

## Get ongoing rides

Get all ongoing rides.

### Request

#### Header

| Property      | Value          | Description           |
| ------------- | -------------- | --------------------- |
| URL           | /rides/ongoing | Request url.          |
| Method        | GET            | Request method.       |
| Authorization | Bearer [token] | Request authorization |

#### Query params

| Field       | type     | Default         | Description       |
| ----------- | -------- | --------------- | ----------------- |
| search      | `string` |                 | Search value.     |
| page_number | `number` | 1               | Page number.      |
| page_limit  | `number` | 10              | Paginatiob limit. |
| sort_field  | `string` | ride.created_at | Sort field.       |
| sort_order  | `string` | desc            | Sort order.       |

### Response

#### Status

| Code | Description           |
| ---- | --------------------- |
| 200  | Fetched successfully. |

#### Body

| Field                        | Type      | Description             |
| ---------------------------- | --------- | ----------------------- |
| page_number                  | `number`  | Page number.            |
| page_limit                   | `number`  | Paginatiob limit.       |
| sort_field                   | `string`  | Sort field.             |
| sort_order                   | `string`  | Sort order.             |
| rides                        | `object`  | Ride information.       |
| rides.id                     | `uuid`    | Ride id.                |
| rides.passenger_id           | `uuid`    | Passenger id.           |
| rides.passenger_name         | `string`  | Passenger name.         |
| rides.passenger_phone_number | `string`  | Passenger phone number. |
| rides.driver_id              | `uuid`    | Driver id.              |
| rides.driver_name            | `string`  | Driver name.            |
| rides.driver_phone_number    | `string`  | Driver phone number.    |
| rides.done                   | `boolean` | Ride status.            |
| rides.pickup_point_lat       | `number`  | Pickup point latitude.  |
| rides.pickup_point_long      | `number`  | Pickup point longitude. |
| rides.destination_lat        | `number`  | Destination latitude.   |
| rides.destination_long       | `number`  | Destination longitude.  |
| rides.created_at             | `date`    | Driver created at date. |

### Example

```js
{
    "page_number": 1,
    "page_limit": 10,
    "sort_field": "created_at",
    "sort_order": "desc",
    "total_count": 1,
    "rides": [
        {
            "id": "dbe7bb89-d009-4744-808e-28ad720a496b",
            "passenger_id": "f0d71bb7-cffc-44f7-99e0-4cbb576f8480",
            "passenger_name": "Jane Doe",
            "passenger_phone_number": "+254700000000",
            "driver_id": "dca8cf17-d5db-45bf-af11-247f40304cd7",
            "driver_name": "John Doe",
            "driver_phone_number": "+254700000000",
            "done": false,
            "pickup_point_lat": "-1.286389",
            "pickup_point_long": "36.817223",
            "destination_lat": "-1.286389",
            "destination_long": "36.817223",
            "created_at": "2022-01-12T13:02:55.572Z"
        }
    ]
}
```
