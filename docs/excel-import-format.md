# Format Excel Import - Cập nhật mới

## Sheet: "Db Bài giảng"

### Các cột (Columns):

| Cột | Tên field | Bắt buộc | Mô tả | Ví dụ |
|-----|-----------|----------|-------|-------|
| A | `school_level` | Không* | Cấp học | Tiểu học, THCS, THPT |
| B | `class` | Có | Tên lớp | Lớp 1, Lớp 6, Lớp 10 |
| C | `subject` | Có | Môn học | Toán, Ngữ văn, Tiếng Anh |
| D | `book` | Có | Sách giáo khoa | Kết nối tri thức, Cánh diều |
| E | `topic_name` | Có | Tên chủ đề | Chủ đề 1: Số tự nhiên |
| F | `lesson_name` | Có | Tên bài học | Bài 1: Các số 0, 1, 2, 3, 4, 5 |
| G | `lecture_online_link` | Không | URL video bài giảng | https://cdn.example.com/video.mp4 |
| H | `image` | Không | URL ảnh cho lớp | https://example.com/lop1.jpg |

**\* Lưu ý:** Nếu không có cột `school_level`, hệ thống sẽ tự động phát hiện:
- "Lớp 1-5" → "Tiểu học"
- "Lớp 6-9" → "Trung học cơ sở"
- "Lớp 10-12" → "Trung học phổ thông"

### Fill-down (Giống Excel):

Các ô trống sẽ tự động dùng giá trị từ dòng trên:

```excel
school_level | class  | subject | book           | topic_name | lesson_name | lecture_url | image
-------------|--------|---------|----------------|------------|-------------|-------------|-------
Tiểu học     | Lớp 1  | Toán    | Kết nối...     | Chủ đề 1   | Bài 1       | https://... | https://img1.jpg
             |        |         |                |            | Bài 2       | https://... |
             |        |         |                | Chủ đề 2   | Bài 3       | https://... |
             |        | Văn     | Kết nối...     | Chủ đề 1   | Bài 1       | https://... |
THCS         | Lớp 6  | Toán    | Cánh diều      | Chủ đề 1   | Bài 1       | https://... | https://img6.jpg
```

Dòng 2 tự động có: `Tiểu học`, `Lớp 1`, `Toán`, `Kết nối...`, `Chủ đề 1`, `https://img1.jpg`

### Ví dụ đầy đủ:

| school_level | class | subject | book | topic_name | lesson_name | lecture_online_link | image |
|--------------|-------|---------|------|------------|-------------|---------------------|-------|
| Tiểu học | Lớp 1 | Toán | Kết nối tri thức | Chủ đề 1: Các số từ 0 đến 10 | Bài 1: Các số 0, 1, 2, 3, 4, 5 | https://cdn.example.com/toan-lop1-bai1.mp4 | https://example.com/images/lop1.jpg |
| | | | | | Bài 2: Các số 6, 7, 8, 9, 10 | https://cdn.example.com/toan-lop1-bai2.mp4 | |
| | | | | Chủ đề 2: Phép cộng | Bài 3: Phép cộng trong phạm vi 10 | https://cdn.example.com/toan-lop1-bai3.mp4 | |
| | | Ngữ văn | Kết nối tri thức | Chủ đề 1: Đọc hiểu | Bài 1: Chú bé rắc rối | https://cdn.example.com/van-lop1-bai1.mp4 | |
| THCS | Lớp 6 | Toán | Cánh diều | Chủ đề 1: Số nguyên | Bài 1: Tập hợp số nguyên | https://cdn.example.com/toan-lop6-bai1.mp4 | https://example.com/images/lop6.jpg |

## Cách Import:

### 1. Qua API:
```bash
POST /api/import/catalog
Content-Type: multipart/form-data

Body:
- file: [Excel file]
```

### 2. Qua Postman:
1. Method: POST
2. URL: `http://localhost:3001/api/import/catalog`
3. Body → form-data
4. Key: `file`, Type: File
5. Value: Chọn file Excel

### 3. Qua JavaScript:
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

fetch('http://localhost:3001/api/import/catalog', {
  method: 'POST',
  body: formData
}).then(res => res.json())
  .then(data => console.log(data));
```

## Response:

```json
{
  "status": "ok",
  "message": "Import dữ liệu bài giảng từ Excel thành công"
}
```

**Console log:**
```
🎉 Import xong: tạo mới 50 bài học, bỏ qua (đã tồn tại) 20 bài.
```

## Lưu ý quan trọng:

1. **ADD-ONLY Mode:** Import chỉ thêm mới, không cập nhật data cũ
2. **Unique Check:** 
   - Grade: theo `gradeName`
   - Subject: theo `subjectName`
   - Book: theo `bookName`
   - Topic: theo `topicName + gradeId + subjectId + bookId`
   - Lesson: theo `lessonName + topicId`
3. **SchoolLevel:** Tự động tạo nếu chưa có
4. **Image:** Nullable, có thể bỏ trống
5. **Fill-down:** Hỗ trợ đầy đủ như Excel

## Thay đổi so với version cũ:

✅ **Thêm mới:**
- Cột `school_level` (optional, auto-detect)
- Cột `image` (optional)

✅ **Cập nhật:**
- Tất cả field names theo schema mới (gradeName, subjectName, bookName, topicName, lessonName)
- Hỗ trợ SchoolLevel relation

✅ **Giữ nguyên:**
- ADD-ONLY mode
- Fill-down logic
- Unique constraints
