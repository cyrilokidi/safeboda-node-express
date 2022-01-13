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
| 404  | Ride not found.     |
| 400  | Ride already done.  |

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

### Response

#### Status

| Code | Description           |
| ---- | --------------------- |
| 200  | Fetched successfully. |

#### Body

| Field                         | Type      | Description             |
| ----------------------------- | --------- | ----------------------- |
| [ride.id]                     | `uuid`    | Ride id.                |
| [ride.passenger_id]           | `uuid`    | Passenger id.           |
| [ride.passenger_name]         | `string`  | Passenger name.         |
| [ride.passenger_phone_number] | `string`  | Passenger phone number. |
| [ride.driver_id]              | `uuid`    | Driver id.              |
| [ride.driver_name]            | `string`  | Driver name.            |
| [ride.driver_phone_number]    | `string`  | Driver phone number.    |
| [ride.done]                   | `boolean` | Ride status.            |
| [ride.pickup_point_lat]       | `number`  | Pickup point latitude.  |
| [ride.pickup_point_long]      | `number`  | Pickup point longitude. |
| [ride.destination_lat]        | `number`  | Destination latitude.   |
| [ride.destination_long]       | `number`  | Destination longitude.  |
| [ride.created_at]             | `date`    | Driver created at date. |

### Example

```js
[
  {
    id: '7627f0e9-584b-492a-a6e8-1129ac88aaa2',
    passenger_id: '9c1f7f77-6225-417a-aed0-43e9db77c3cc',
    passenger_name: 'Jane Doe',
    passenger_phone_number: '0700000000',
    driver_id: '977ad9cb-dac2-458f-9ff5-47b015e4ae68',
    driver_name: 'John Doe',
    driver_phone_number: '+254700000000',
    done: false,
    pickup_point_lat: '-1.286389',
    pickup_point_long: '36.817223',
    destination_lat: '-1.286389',
    destination_long: '36.817223',
    created_at: '2022-01-13T20:11:29.398Z',
  },
  {
    id: '6480b012-6c0d-47cb-84b5-babcc0fc2650',
    passenger_id: '617157c7-d100-4605-a48e-6dc4be2d1c0a',
    passenger_name: 'Jane Doe',
    passenger_phone_number: '0700000001',
    driver_id: '977ad9cb-dac2-458f-9ff5-47b015e4ae68',
    driver_name: 'John Doe',
    driver_phone_number: '+254700000000',
    done: false,
    pickup_point_lat: '-1.286389',
    pickup_point_long: '36.817223',
    destination_lat: '-1.286389',
    destination_long: '36.817223',
    created_at: '2022-01-13T20:12:22.127Z',
  },
  {
    id: 'ba8b43d0-4d25-4145-a8ab-a8f1803686f2',
    passenger_id: '26952ef6-4efa-489c-909c-230bcd51311f',
    passenger_name: 'Jane Doe',
    passenger_phone_number: '0700000002',
    driver_id: '977ad9cb-dac2-458f-9ff5-47b015e4ae68',
    driver_name: 'John Doe',
    driver_phone_number: '+254700000000',
    done: false,
    pickup_point_lat: '-1.286389',
    pickup_point_long: '36.817223',
    destination_lat: '-1.286389',
    destination_long: '36.817223',
    created_at: '2022-01-13T20:13:40.312Z',
  },
];
```
