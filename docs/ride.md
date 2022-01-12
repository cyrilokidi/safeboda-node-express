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

| Field                  | Type      | Description             |
| ---------------------- | --------- | ----------------------- |
| id                     | `uuid`    | Ride id.                |
| passenger_id           | `uuid`    | Passenger id.           |
| passenger_name         | `string`  | Passenger name.         |
| passenger_phone_number | `string`  | Passenger phone number. |
| driver_id              | `uuid`    | Driver id.              |
| driver_name            | `string`  | Driver name.            |
| driver_phone_number    | `string`  | Driver phone number.    |
| done                   | `boolean` | Ride status.            |
| pickup_point_lat       | `number`  | Pickup point latitude.  |
| pickup_point_long      | `number`  | Pickup point longitude. |
| destination_lat        | `number`  | Destination latitude.   |
| destination_long       | `number`  | Destination longitude.  |
| created_at             | `date`    | Driver created at date. |
