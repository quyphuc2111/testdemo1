## API đề xuất cho Digital Lectures

### Pattern chung cho response

```json
{
  "statusCode": 200,
  "message": "Success",
  "success": true,
  "data": [...],          // hoặc object chi tiết
  "pagination": {         // cho list có phân trang
    "page": 1,
    "limit": 10,
    "total": 0,
    "hasFirstPage": true,
    "hasLastPage": true,
    "hasPreviousPage": false,
    "hasNextPage": true
  }
  // pagination = null nếu không có phân trang
}
```

### 1) Danh sách lớp

- **GET** `/api/digital-lecture/classes`
- **Response**

```json
{
  "statusCode": 200,
  "message": "Success",
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Lớp 1",
      "subject": [
        { "subjectId": "1", "subjectName": "Toán" },
        { "subjectId": "2", "subjectName": "Ngữ văn" }
      ],
      "topicCount": 12,
      "bookCount": 2
    },
    {
      "id": 2,
      "name": "Lớp 2",
      "subject": [
        { "subjectId": "3", "subjectName": "Tin học" },
        { "subjectId": "4", "subjectName": "Tiếng Anh" }
      ],
      "topicCount": 12,
      "bookCount": 2
    }
  ],
  "pagination": null
}
```

### 2) Danh sách môn theo lớp

- **GET** `/api/digital-lecture/classes/{classId}/subjects`
- **Response**

```json
{
  "statusCode": 200,
  "message": "Success",
  "success": true,
  "data": [
    { "id": "1", "name": "Toán" },
    { "id": "2", "name": "Tiếng Anh" },
    { "id": "3", "name": "Ngữ văn" }
  ],
  "pagination": null
}
```

### 3) Danh mục (sách/chủ đề) theo môn

- **GET** `/api/digital-lecture/classes/{classId}/subjects/{subjectId}/categories`
- **Response**

```json
{
  "statusCode": 200,
  "message": "Success",
  "success": true,
  "data": [
    {
      "id": 1,
      "book": "Kết nối tri thức với cuộc sống",
      "children": [
        { "id": 11, "name": "Chủ đề 1: Những kiến thức cơ bản" },
        { "id": 12, "name": "Chủ đề 2: Phát triển kỹ năng" },
        { "id": 13, "name": "Chủ đề 3: Ứng dụng thực tế" },
        { "id": 14, "name": "Chủ đề 4: Mở rộng và nâng cao" }
      ]
    },
    {
      "id": 2,
      "book": "i-Learn Smart Start",
      "children": [
        { "id": 11, "name": "Chủ đề 1: Những kiến thức cơ bản" },
        { "id": 12, "name": "Chủ đề 2: Phát triển kỹ năng" },
        { "id": 13, "name": "Chủ đề 3: Ứng dụng thực tế" },
        { "id": 14, "name": "Chủ đề 4: Mở rộng và nâng cao" }
      ]
    }
  ],
  "pagination": null
}
```

### 4) Danh sách bài giảng theo môn (lọc chủ đề, danh mục)

- **GET** `/api/digital-lecture/classes/{classId}/subjects/{subjectId}/lessons`
- **Query** (optional):
  - `topicId`: Id chủ đề (bỏ trống = lấy tất cả)
  - `page`, `limit`
- **Response**

```json
{
  "statusCode": 200,
  "message": "Success",
  "success": true,
  "data": [
    {
      "id": 111,
      "title": "Bài 1: Các số 0, 1, 2, 3, 4, 5",
      "topicId": 1,
      "topic": "Chủ đề 1: Các số từ 0 đến 10",
      "bookId": 2,
      "book": "Kết nối tri thức với cuộc sống",
      "classId": 3,
      "className": "Lớp 1",
      "subjectId": 1,
      "subjectName": "Toán"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 8,
    "total": 24,
    "hasFirstPage": true,
    "hasLastPage": false,
    "hasPreviousPage": false,
    "hasNextPage": true
  }
}
```

### 5) Chi tiết bài giảng

- **GET** `/api/digital-lecture/classes/{classId}/subjects/{subjectId}/lessons/{lessonId}`
- **Response**

```json
{
  "statusCode": 200,
  "message": "Success",
  "success": true,
  "data": {
    "id": 111,
    "title": "Bài 1: Các số 0, 1, 2, 3, 4, 5",
    "topicId": 3,
    "topic": "Chủ đề 1: Các số từ 0 đến 10",
    "bookId": 4,
    "book": "Kết nối tri thức với cuộc sống",
    "lectureOnlineLink": "https://cdn.../video.mp4",
    "classId": 1,
    "className": "Lớp 1",
    "subjectId": 3,
    "subjectName": "Toán"
  },
  "pagination": null
}
```

## Tóm tắt endpoint

- `GET /api/digital-lecture/classes`
- `GET /api/digital-lecture/classes/{classId}/subjects`
- `GET /api/digital-lecture/classes/{classId}/subjects/{subjectId}/categories`
- `GET /api/digital-lecture/classes/{classId}/subjects/{subjectId}/lessons`
- `GET /api/digital-lecture/classes/{classId}/subjects/{subjectId}/lessons/{lessonId}`
