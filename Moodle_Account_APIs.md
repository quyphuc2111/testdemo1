# Moodle Controller API Documentation

API endpoints để đăng nhập và đăng xuất hệ thống Moodle.

## Base URL

```
https://accountbackend.bkt.net.vn
```

---

## 1. Đăng nhập Moodle

Đăng nhập vào hệ thống Moodle bằng tài khoản và mật khẩu.

### Endpoint

```
POST /api/Moodle/login
```

### Request

#### Headers

| Header       | Value            | Required |
| ------------ | ---------------- | -------- |
| Content-Type | application/json | Yes      |

#### Body

```json
{
  "username": "string",
  "password": "string"
}
```

| Field    | Type   | Required | Description                                                                |
| -------- | ------ | -------- | -------------------------------------------------------------------------- |
| username | string | No\*     | Tên đăng nhập Moodle. Nếu để trống sẽ sử dụng tài khoản mặc định từ config |
| password | string | No\*     | Mật khẩu Moodle. Nếu để trống sẽ sử dụng mật khẩu mặc định từ config       |

> **Lưu ý**: Nếu cả `username` và `password` đều để trống, API sẽ sử dụng tài khoản mặc định được cấu hình trong `appsettings.json`.

### Response

#### Success (200 OK)

```json
{
  "success": true,
  "message": "Đăng nhập thành công"
}
```

**Cookies được set:**

| Cookie Name   | Description                 |
| ------------- | --------------------------- |
| MoodleSession | Session cookie của Moodle   |
| MOODLEID1\_\* | Cookie nhận dạng của Moodle |

**Lưu ý về Cookies theo môi trường:**

| Thuộc tính | Development           | Production           |
| ---------- | --------------------- | -------------------- |
| Domain     | Không set (localhost) | Domain từ Moodle     |
| Secure     | false                 | true                 |
| SameSite   | Lax                   | None                 |
| HttpOnly   | Theo Moodle response  | Theo Moodle response |

#### Error Responses

**400 Bad Request** - Cấu hình Moodle bị thiếu

```json
{
  "success": false,
  "message": "Moodle config missing"
}
```

**401 Unauthorized** - Đăng nhập thất bại

```json
{
  "success": false,
  "message": "Login failed or cookies not found"
}
```

**500 Internal Server Error** - Lỗi xử lý

```json
{
  "success": false,
  "message": "Cannot find MoodleSession cookie in login page response"
}
```

hoặc

```json
{
  "success": false,
  "message": "Cannot find logintoken in Moodle login page"
}
```

**502 Bad Gateway** - Không thể kết nối đến Moodle

```json
{
  "success": false,
  "message": "Cannot reach Moodle login page"
}
```

### Example

#### Request

```bash
curl -X POST "https://api.example.com/api/Moodle/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "student001",
    "password": "password123"
  }'
```

#### Response

```json
{
  "success": true,
  "message": "Đăng nhập thành công"
}
```

---

## 2. Đăng xuất Moodle

Đăng xuất khỏi hệ thống Moodle và xóa các cookies liên quan.

### Endpoint

```
POST /api/Moodle/logout
```

### Request

#### Headers

| Header | Value             | Required |
| ------ | ----------------- | -------- |
| Cookie | MoodleSession=xxx | No\*     |

> **Lưu ý**: Cookie `MoodleSession` được gửi tự động từ browser nếu đã đăng nhập trước đó.

#### Body

Không cần body.

### Response

#### Success (200 OK) - Đăng xuất thành công

```json
{
  "success": true,
  "message": "Đăng xuất thành công"
}
```

#### Success (200 OK) - Không có phiên đăng nhập

```json
{
  "success": true,
  "message": "Không có phiên đăng nhập Moodle"
}
```

#### Success (200 OK) - Đã xóa phiên local nhưng logout Moodle thất bại

```json
{
  "success": true,
  "message": "Đã xóa phiên đăng nhập local",
  "moodleLogout": false,
  "detail": "Chi tiết lỗi từ Moodle"
}
```

**Cookies được xóa:**

API sẽ xóa tất cả cookies có tên bắt đầu bằng:

- `MoodleSession`
- `MOODLE_`
- `MOODLEID`

### Example

#### Request

```bash
curl -X POST "https://api.example.com/api/Moodle/logout" \
  -H "Cookie: MoodleSession=abc123xyz"
```

#### Response

```json
{
  "success": true,
  "message": "Đăng xuất thành công"
}
```

---

## Cấu hình (appsettings.json)

Để sử dụng các API trên, cần cấu hình các thông số sau trong `appsettings.json`:

```json
{
  "MoodleUrl": "https://moodle.example.com",
  "MoodleUser": "default_username",
  "MoodlePassword": "default_password"
}
```

| Field          | Description                           |
| -------------- | ------------------------------------- |
| MoodleUrl      | URL của hệ thống Moodle               |
| MoodleUser     | Tài khoản mặc định (nếu không truyền) |
| MoodlePassword | Mật khẩu mặc định (nếu không truyền)  |

---

## Lưu ý quan trọng

1. **Cross-Origin (CORS)**: Đảm bảo đã cấu hình CORS phù hợp để cho phép frontend gọi API và nhận cookies.

2. **Môi trường Development**:

   - Cookies sẽ được log ra console để debug
   - `Secure=false` để hoạt động trên localhost HTTP
   - Không set `Domain` để cookies hoạt động trên localhost

3. **Môi trường Production**:

   - Cookies được set với `Secure=true` và `SameSite=None`
   - Domain được set theo cấu hình từ Moodle (mặc định: `.bkt.net.vn`)

4. **Bảo mật**: Không nên lưu trữ thông tin đăng nhập mặc định trong production. Chỉ sử dụng tính năng này cho môi trường development/testing.
