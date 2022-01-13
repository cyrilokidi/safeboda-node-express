## Login

Login as an administrator to get authorization token for future requests.

### Request

#### Header

| Property     | Value            | Description        |
| ------------ | ---------------- | ------------------ |
| URL          | /login           | Request url.       |
| Method       | POST             | Request method.    |
| Content-Type | application/json | Request body type. |

#### Body

| Field    | Type     | Default | Description                     |
| -------- | -------- | ------- | ------------------------------- |
| email    | `string` |         | Administrator account email     |
| password | `string` |         | Administrator account password. |

#### Example

```js
{
    "email": "okidicyril@gmail.com",
    "password": "password"
}
```

### Response

#### Status

| Code | Description        |
| ---- | ------------------ |
| 201  | Login successful   |
| 401  | Wrong credentials. |

#### Body

| Field | Type     | Description          |
| ----- | -------- | -------------------- |
| token | `string` | Authorization token. |

#### Example

```js
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9raWRpY3lyaWxAZ21haWwuY29tIiwiaWF0IjoxNjQxOTg1NzEwLCJleHAiOjE2NDIwNzIxMTB9.lggp8akajXrVA_LVnT12QQIpnUIV67_zEUKs0YjgpSY"
}
```
