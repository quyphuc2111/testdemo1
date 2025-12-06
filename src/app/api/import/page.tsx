"use client";

import { useState } from "react";

export default function ImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  async function handleUpload() {
    if (!file) {
      alert("Chưa chọn file Excel!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setStatus("Đang upload...");

    const res = await fetch("/api/import/catalog", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    setStatus(JSON.stringify(json, null, 2));
  }

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ marginBottom: 20 }}>Import Excel Catalog</h1>

      <input
        type="file"
        accept=".xlsx"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      <button
        onClick={handleUpload}
        style={{
          display: "block",
          marginTop: 20,
          padding: "10px 20px",
          background: "black",
          color: "white",
          borderRadius: 8,
        }}
      >
        Upload Excel
      </button>

      <pre style={{ marginTop: 30, whiteSpace: "pre-wrap" }}>{status}</pre>
    </div>
  );
}
