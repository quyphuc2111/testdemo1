# Hướng Dẫn Sửa Lỗi Runtime TypeError

## Vấn Đề
Các API routes đang sử dụng field `name` nhưng Prisma schema định nghĩa:
- `gradeName` cho Grade
- `subjectName` cho Subject  
- `bookName` cho Book
- `topicName` cho Topic
- `lessonName` cho Lesson

## Các File Cần Sửa

### API Routes (Backend)
Cần sửa field `name` thành field tương ứng trong schema:

1. ✅ `src/app/api/admin/topics/route.ts` - ĐÃ SỬA
2. ✅ `src/app/api/admin/topics/[id]/route.ts` - ĐÃ SỬA
3. ❌ `src/app/api/admin/lessons/route.ts` - Sửa `name` → `lessonName`
4. ❌ `src/app/api/admin/lessons/[id]/route.ts` - Sửa `name` → `lessonName`
5. ❌ `src/app/api/admin/grades/route.ts` - Sửa `name` → `gradeName`
6. ❌ `src/app/api/admin/grades/[id]/route.ts` - Sửa `name` → `gradeName`
7. ❌ `src/app/api/admin/subjects/route.ts` - Sửa `name` → `subjectName`
8. ❌ `src/app/api/admin/subjects/[id]/route.ts` - Sửa `name` → `subjectName`
9. ❌ `src/app/api/admin/books/route.ts` - Sửa `name` → `bookName`
10. ❌ `src/app/api/admin/books/[id]/route.ts` - Sửa `name` → `bookName`

### Admin Pages (Frontend)
Cần xử lý response.data và sử dụng đúng field names:

1. ✅ `src/app/admin/grades/page.tsx` - ĐÃ SỬA
2. ✅ `src/app/admin/subjects/page.tsx` - ĐÃ SỬA
3. ✅ `src/app/admin/books/page.tsx` - ĐÃ SỬA
4. ❌ `src/app/admin/topics/page.tsx` - Cần sửa
5. ❌ `src/app/admin/lessons/page.tsx` - Cần sửa

## Cách Sửa Nhanh

### Cho API Routes
Tìm và thay thế trong mỗi file:
- `name` → `[fieldName]` (ví dụ: `topicName`, `lessonName`, etc.)
- Thêm `include` để lấy relations khi cần

### Cho Admin Pages  
1. Sửa `fetchData`:
```typescript
const result = await response.json();
setData(result.data || []);
```

2. Sửa field names trong interface và form data

## Ưu Tiên
1. Sửa lessons API (quan trọng nhất vì phức tạp nhất)
2. Sửa topics và lessons pages
3. Sửa các API còn lại nếu cần

## Ghi Chú
- Tất cả API responses được wrap trong `{ data: [...] }`
- Cần include relations khi fetch để hiển thị thông tin liên quan
