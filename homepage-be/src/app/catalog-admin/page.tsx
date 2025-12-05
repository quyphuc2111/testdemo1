"use client";

import { useEffect, useState } from "react";

// ====== TYPES giống API /api/catalog/tree ======
type LessonNode = {
  id: number;
  name: string;
  lectureUrl: string | null;
};

type TopicNode = {
  id: number;
  name: string;
  lessons: LessonNode[];
};

type BookNode = {
  id: number;
  name: string;
  topics: TopicNode[];
};

type SubjectNode = {
  id: number;
  name: string;
  books: BookNode[];
};

type GradeNode = {
  id: number;
  name: string;
  subjects: SubjectNode[];
};

type CatalogTreeResponse = {
  status: "ok" | "error";
  tree: GradeNode[];
};

// ====== PAGE COMPONENT ======

export default function CatalogAdminPage() {
  const [tree, setTree] = useState<GradeNode[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  // Load cây ban đầu
  useEffect(() => {
    reloadTree();
  }, []);

  async function reloadTree() {
    setLoading(true);
    try {
      const res = await fetch("/api/catalog/tree");
      const data: CatalogTreeResponse = await res.json();
      if (data.status === "ok") {
        setTree(data.tree);
        setMessage("Đã load cây catalog.");
      } else {
        setMessage("Lỗi khi load tree: " + JSON.stringify(data));
      }
    } catch (err: any) {
      setMessage("Lỗi khi gọi /api/catalog/tree: " + err?.message);
    } finally {
      setLoading(false);
    }
  }

  // ====== COMMON HELPER ======
  function promptNonEmpty(message: string, defaultValue = ""): string | null {
    const val = window.prompt(message, defaultValue);
    if (val === null) return null;
    if (val.trim() === "") return null;
    return val.trim();
  }

  // ====== CRUD GRADE ======
  async function handleAddGrade() {
    const name = promptNonEmpty("Nhập tên khối / lớp mới:", "Lớp 1");
    if (!name) return;

    setMessage("Đang tạo grade...");
    try {
      const res = await fetch("/api/grades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok || data.status !== "ok") {
        setMessage("Tạo grade thất bại: " + JSON.stringify(data));
      } else {
        setMessage("Tạo grade thành công.");
        await reloadTree();
      }
    } catch (err: any) {
      setMessage("Lỗi khi tạo grade: " + err?.message);
    }
  }

  async function handleEditGrade(grade: GradeNode) {
    const newName = promptNonEmpty("Sửa tên khối / lớp:", grade.name);
    if (!newName) return;

    setMessage("Đang cập nhật grade...");
    try {
      const res = await fetch(`/api/grades/${grade.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      const data = await res.json();
      if (!res.ok || data.status !== "ok") {
        setMessage("Cập nhật grade thất bại: " + JSON.stringify(data));
      } else {
        setMessage("Cập nhật grade thành công.");
        await reloadTree();
      }
    } catch (err: any) {
      setMessage("Lỗi khi cập nhật grade: " + err?.message);
    }
  }

  async function handleDeleteGrade(grade: GradeNode) {
    const ok = window.confirm(
      `Xóa toàn bộ khối "${grade.name}" (và tất cả subject/book/topic/lesson bên dưới)?`
    );
    if (!ok) return;

    setMessage("Đang xóa grade...");
    try {
      const res = await fetch(`/api/grades/${grade.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || data.status !== "ok") {
        setMessage("Xóa grade thất bại: " + JSON.stringify(data));
      } else {
        setMessage("Đã xóa grade.");
        await reloadTree();
      }
    } catch (err: any) {
      setMessage("Lỗi khi xóa grade: " + err?.message);
    }
  }

  // ====== CRUD SUBJECT ======
  async function handleAddSubject(grade: GradeNode) {
    const name = promptNonEmpty(
      `Nhập tên môn mới cho "${grade.name}":`,
      "Toán"
    );
    if (!name) return;

    setMessage("Đang tạo subject...");
    try {
      const res = await fetch("/api/subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gradeId: grade.id, name }),
      });
      const data = await res.json();
      if (!res.ok || data.status !== "ok") {
        setMessage("Tạo subject thất bại: " + JSON.stringify(data));
      } else {
        setMessage("Tạo subject thành công.");
        await reloadTree();
      }
    } catch (err: any) {
      setMessage("Lỗi khi tạo subject: " + err?.message);
    }
  }

  async function handleEditSubject(subject: SubjectNode) {
    const newName = promptNonEmpty("Sửa tên môn học:", subject.name);
    if (!newName) return;

    setMessage("Đang cập nhật subject...");
    try {
      const res = await fetch(`/api/subjects/${subject.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      const data = await res.json();
      if (!res.ok || data.status !== "ok") {
        setMessage("Cập nhật subject thất bại: " + JSON.stringify(data));
      } else {
        setMessage("Cập nhật subject thành công.");
        await reloadTree();
      }
    } catch (err: any) {
      setMessage("Lỗi khi cập nhật subject: " + err?.message);
    }
  }

  async function handleDeleteSubject(subject: SubjectNode) {
    const ok = window.confirm(
      `Xóa môn "${subject.name}" (và toàn bộ sách/chủ đề/bài phía dưới)?`
    );
    if (!ok) return;

    setMessage("Đang xóa subject...");
    try {
      const res = await fetch(`/api/subjects/${subject.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || data.status !== "ok") {
        setMessage("Xóa subject thất bại: " + JSON.stringify(data));
      } else {
        setMessage("Đã xóa subject.");
        await reloadTree();
      }
    } catch (err: any) {
      setMessage("Lỗi khi xóa subject: " + err?.message);
    }
  }

  // ====== CRUD BOOK ======
  async function handleAddBook(grade: GradeNode, subject: SubjectNode) {
    const name = promptNonEmpty(
      `Nhập tên sách mới cho "${subject.name}" (${grade.name}):`,
      "Kết nối tri thức với cuộc sống"
    );
    if (!name) return;

    setMessage("Đang tạo book...");
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gradeId: grade.id,
          subjectId: subject.id,
          name,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.status !== "ok") {
        setMessage("Tạo book thất bại: " + JSON.stringify(data));
      } else {
        setMessage("Tạo book thành công.");
        await reloadTree();
      }
    } catch (err: any) {
      setMessage("Lỗi khi tạo book: " + err?.message);
    }
  }

  async function handleEditBook(book: BookNode) {
    const newName = promptNonEmpty("Sửa tên sách:", book.name);
    if (!newName) return;

    setMessage("Đang cập nhật book...");
    try {
      const res = await fetch(`/api/books/${book.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      const data = await res.json();
      if (!res.ok || data.status !== "ok") {
        setMessage("Cập nhật book thất bại: " + JSON.stringify(data));
      } else {
        setMessage("Cập nhật book thành công.");
        await reloadTree();
      }
    } catch (err: any) {
      setMessage("Lỗi khi cập nhật book: " + err?.message);
    }
  }

  async function handleDeleteBook(book: BookNode) {
    const ok = window.confirm(
      `Xóa sách "${book.name}" (và toàn bộ chủ đề/bài phía dưới)?`
    );
    if (!ok) return;

    setMessage("Đang xóa book...");
    try {
      const res = await fetch(`/api/books/${book.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || data.status !== "ok") {
        setMessage("Xóa book thất bại: " + JSON.stringify(data));
      } else {
        setMessage("Đã xóa book.");
        await reloadTree();
      }
    } catch (err: any) {
      setMessage("Lỗi khi xóa book: " + err?.message);
    }
  }

  // ====== CRUD TOPIC ======
  async function handleAddTopic(
    grade: GradeNode,
    subject: SubjectNode,
    book: BookNode
  ) {
    const name = promptNonEmpty(
      `Nhập tên chủ đề mới cho sách "${book.name}":`,
      "Chủ đề 1: ..."
    );
    if (!name) return;

    setMessage("Đang tạo topic...");
    try {
      const res = await fetch("/api/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gradeId: grade.id,
          subjectId: subject.id,
          bookId: book.id,
          name,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.status !== "ok") {
        setMessage("Tạo topic thất bại: " + JSON.stringify(data));
      } else {
        setMessage("Tạo topic thành công.");
        await reloadTree();
      }
    } catch (err: any) {
      setMessage("Lỗi khi tạo topic: " + err?.message);
    }
  }

  async function handleEditTopic(topic: TopicNode) {
    const newName = promptNonEmpty("Sửa tên chủ đề:", topic.name);
    if (!newName) return;

    setMessage("Đang cập nhật topic...");
    try {
      const res = await fetch(`/api/topics/${topic.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      const data = await res.json();
      if (!res.ok || data.status !== "ok") {
        setMessage("Cập nhật topic thất bại: " + JSON.stringify(data));
      } else {
        setMessage("Cập nhật topic thành công.");
        await reloadTree();
      }
    } catch (err: any) {
      setMessage("Lỗi khi cập nhật topic: " + err?.message);
    }
  }

  async function handleDeleteTopic(topic: TopicNode) {
    const ok = window.confirm(
      `Xóa chủ đề "${topic.name}" (và toàn bộ bài phía dưới)?`
    );
    if (!ok) return;

    setMessage("Đang xóa topic...");
    try {
      const res = await fetch(`/api/topics/${topic.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || data.status !== "ok") {
        setMessage("Xóa topic thất bại: " + JSON.stringify(data));
      } else {
        setMessage("Đã xóa topic.");
        await reloadTree();
      }
    } catch (err: any) {
      setMessage("Lỗi khi xóa topic: " + err?.message);
    }
  }

  // ====== CRUD LESSON (giống bản trước) ======
  async function handleAddLesson(topic: TopicNode) {
    const name = promptNonEmpty(
      `Nhập tên bài học mới cho topic: "${topic.name}"`,
      "Bài mới"
    );
    if (!name) return;

    const lectureUrlPrompt = window.prompt(
      "Nhập URL bài giảng (có thể để trống):",
      ""
    );
    const lectureUrl =
      lectureUrlPrompt && lectureUrlPrompt.trim() !== ""
        ? lectureUrlPrompt.trim()
        : null;

    setMessage("Đang tạo lesson...");
    try {
      const res = await fetch("/api/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId: topic.id,
          name,
          lectureUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.status !== "ok") {
        setMessage(
          "Tạo lesson thất bại: " +
            JSON.stringify(data ?? { resStatus: res.status })
        );
      } else {
        setMessage("Tạo lesson thành công.");
        await reloadTree();
      }
    } catch (err: any) {
      setMessage("Lỗi khi tạo lesson: " + err?.message);
    }
  }

  async function handleEditLesson(lesson: LessonNode) {
    const newName = promptNonEmpty("Sửa tên bài học:", lesson.name);
    if (!newName) return;

    const newUrlPrompt = window.prompt(
      "Sửa URL bài giảng (có thể để trống):",
      lesson.lectureUrl ?? ""
    );
    if (newUrlPrompt === null) return;
    const newUrl = newUrlPrompt.trim() === "" ? null : newUrlPrompt.trim();

    setMessage("Đang cập nhật lesson...");
    try {
      const res = await fetch(`/api/lessons/${lesson.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          lectureUrl: newUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.status !== "ok") {
        setMessage(
          "Cập nhật lesson thất bại: " +
            JSON.stringify(data ?? { resStatus: res.status })
        );
      } else {
        setMessage("Cập nhật lesson thành công.");
        await reloadTree();
      }
    } catch (err: any) {
      setMessage("Lỗi khi cập nhật lesson: " + err?.message);
    }
  }

  async function handleDeleteLesson(lesson: LessonNode) {
    const ok = window.confirm(
      `Bạn có chắc chắn muốn xóa bài: "${lesson.name}" (id=${lesson.id})?`
    );
    if (!ok) return;

    setMessage("Đang xóa lesson...");
    try {
      const res = await fetch(`/api/lessons/${lesson.id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok || data.status !== "ok") {
        setMessage(
          "Xóa lesson thất bại: " +
            JSON.stringify(data ?? { resStatus: res.status })
        );
      } else {
        setMessage("Đã xóa lesson.");
        await reloadTree();
      }
    } catch (err: any) {
      setMessage("Lỗi khi xóa lesson: " + err?.message);
    }
  }

  // ====== RENDER ======

  return (
    <div style={{ padding: 32, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 16 }}>
        Catalog Admin – Test CRUD (Grade → Subject → Book → Topic → Lesson)
      </h1>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button
          onClick={reloadTree}
          disabled={loading}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "1px solid #ccc",
            background: "#f5f5f5",
            cursor: "pointer",
          }}
        >
          🔄 Reload Tree
        </button>

        <button
          onClick={handleAddGrade}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "1px solid #4caf50",
            background: "#e8f5e9",
            cursor: "pointer",
          }}
        >
          + Thêm khối / lớp
        </button>
      </div>

      <div style={{ marginTop: 12, color: "#555" }}>
        {loading ? "Đang tải..." : message}
      </div>

      <hr style={{ margin: "24px 0" }} />

      {tree.length === 0 && !loading && (
        <p>Không có dữ liệu. Hãy import Excel hoặc thêm mới.</p>
      )}

      <div>
        {tree.map((grade) => (
          <div
            key={grade.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
              background: "#fafafa",
            }}
          >
            {/* GRADE HEADER */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <h2 style={{ fontSize: 20, margin: 0 }}>{grade.name}</h2>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={() => handleEditGrade(grade)}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 6,
                    border: "1px solid #2196f3",
                    background: "#e3f2fd",
                    cursor: "pointer",
                    fontSize: 12,
                  }}
                >
                  Sửa khối
                </button>
                <button
                  onClick={() => handleDeleteGrade(grade)}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 6,
                    border: "1px solid #f44336",
                    background: "#ffebee",
                    cursor: "pointer",
                    fontSize: 12,
                  }}
                >
                  Xóa khối
                </button>
                <button
                  onClick={() => handleAddSubject(grade)}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 6,
                    border: "1px solid #4caf50",
                    background: "#e8f5e9",
                    cursor: "pointer",
                    fontSize: 12,
                  }}
                >
                  + Môn
                </button>
              </div>
            </div>

            {/* SUBJECTS */}
            {grade.subjects.map((subject) => (
              <div
                key={subject.id}
                style={{
                  marginLeft: 12,
                  marginTop: 8,
                  padding: 8,
                  borderLeft: "3px solid #ddd",
                  background: "#ffffff",
                  borderRadius: 6,
                }}
              >
                {/* SUBJECT HEADER */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h3 style={{ fontSize: 18, margin: 0 }}>{subject.name}</h3>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      onClick={() => handleEditSubject(subject)}
                      style={{
                        padding: "3px 8px",
                        borderRadius: 6,
                        border: "1px solid #2196f3",
                        background: "#e3f2fd",
                        cursor: "pointer",
                        fontSize: 12,
                      }}
                    >
                      Sửa môn
                    </button>
                    <button
                      onClick={() => handleDeleteSubject(subject)}
                      style={{
                        padding: "3px 8px",
                        borderRadius: 6,
                        border: "1px solid #f44336",
                        background: "#ffebee",
                        cursor: "pointer",
                        fontSize: 12,
                      }}
                    >
                      Xóa môn
                    </button>
                    <button
                      onClick={() => handleAddBook(grade, subject)}
                      style={{
                        padding: "3px 8px",
                        borderRadius: 6,
                        border: "1px solid #4caf50",
                        background: "#e8f5e9",
                        cursor: "pointer",
                        fontSize: 12,
                      }}
                    >
                      + Sách
                    </button>
                  </div>
                </div>

                {/* BOOKS */}
                {subject.books.map((book) => (
                  <div
                    key={book.id}
                    style={{
                      marginLeft: 12,
                      marginTop: 6,
                      padding: 8,
                      borderLeft: "2px solid #eee",
                    }}
                  >
                    {/* BOOK HEADER */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h4 style={{ fontSize: 16, margin: 0 }}>{book.name}</h4>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button
                          onClick={() => handleEditBook(book)}
                          style={{
                            padding: "2px 8px",
                            borderRadius: 6,
                            border: "1px solid #2196f3",
                            background: "#e3f2fd",
                            cursor: "pointer",
                            fontSize: 12,
                          }}
                        >
                          Sửa sách
                        </button>
                        <button
                          onClick={() => handleDeleteBook(book)}
                          style={{
                            padding: "2px 8px",
                            borderRadius: 6,
                            border: "1px solid #f44336",
                            background: "#ffebee",
                            cursor: "pointer",
                            fontSize: 12,
                          }}
                        >
                          Xóa sách
                        </button>
                        <button
                          onClick={() => handleAddTopic(grade, subject, book)}
                          style={{
                            padding: "2px 8px",
                            borderRadius: 6,
                            border: "1px solid #4caf50",
                            background: "#e8f5e9",
                            cursor: "pointer",
                            fontSize: 12,
                          }}
                        >
                          + Chủ đề
                        </button>
                      </div>
                    </div>

                    {/* TOPICS */}
                    {book.topics.map((topic) => (
                      <div
                        key={topic.id}
                        style={{
                          marginLeft: 12,
                          marginTop: 6,
                          padding: 8,
                          borderLeft: "2px dashed #ddd",
                        }}
                      >
                        {/* TOPIC HEADER */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <strong>{topic.name}</strong>
                          <div style={{ display: "flex", gap: 6 }}>
                            <button
                              onClick={() => handleEditTopic(topic)}
                              style={{
                                padding: "2px 8px",
                                borderRadius: 6,
                                border: "1px solid #2196f3",
                                background: "#e3f2fd",
                                cursor: "pointer",
                                fontSize: 12,
                              }}
                            >
                              Sửa chủ đề
                            </button>
                            <button
                              onClick={() => handleDeleteTopic(topic)}
                              style={{
                                padding: "2px 8px",
                                borderRadius: 6,
                                border: "1px solid #f44336",
                                background: "#ffebee",
                                cursor: "pointer",
                                fontSize: 12,
                              }}
                            >
                              Xóa chủ đề
                            </button>
                            <button
                              onClick={() => handleAddLesson(topic)}
                              style={{
                                padding: "2px 8px",
                                borderRadius: 6,
                                border: "1px solid #4caf50",
                                background: "#e8f5e9",
                                cursor: "pointer",
                                fontSize: 12,
                              }}
                            >
                              + Bài
                            </button>
                          </div>
                        </div>

                        {/* LESSONS */}
                        <ul style={{ marginTop: 4 }}>
                          {topic.lessons.map((lesson) => (
                            <li
                              key={lesson.id}
                              style={{ marginTop: 2, fontSize: 14 }}
                            >
                              <span>
                                {lesson.name}{" "}
                                {lesson.lectureUrl && (
                                  <a
                                    href={lesson.lectureUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ color: "#1976d2" }}
                                  >
                                    [Xem]
                                  </a>
                                )}
                              </span>
                              <button
                                onClick={() => handleEditLesson(lesson)}
                                style={{
                                  marginLeft: 8,
                                  padding: "2px 6px",
                                  borderRadius: 4,
                                  border: "1px solid #2196f3",
                                  background: "#e3f2fd",
                                  cursor: "pointer",
                                  fontSize: 12,
                                }}
                              >
                                Sửa
                              </button>
                              <button
                                onClick={() => handleDeleteLesson(lesson)}
                                style={{
                                  marginLeft: 4,
                                  padding: "2px 6px",
                                  borderRadius: 4,
                                  border: "1px solid #f44336",
                                  background: "#ffebee",
                                  cursor: "pointer",
                                  fontSize: 12,
                                }}
                              >
                                Xóa
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
