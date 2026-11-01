# 📅 Schedule Generator - Bộ Tạo Thời Khóa Biểu từ JSON

Dự án Web Frontend (React + TypeScript + Tailwind CSS) cho phép nhập dữ liệu JSON và tự động sinh ra ảnh thời khóa biểu đẹp mắt (giống ảnh mẫu của bạn), hỗ trợ nhiều template khác nhau và xuất ảnh PNG/JPG độ phân giải cao (2X Retina).

---

## 🚀 Bộ Sưu Tập 9 Templates Đa Dạng

### 🌸 Nhóm Tone Hồng & Dễ Thương (5 Mẫu):
1. 🌈 **Pastel Rainbow (Bản mẫu gốc)**: Mẫu chuẩn theo hình của bạn với các viên thuốc pastel, cầu vồng và ngôi sao lấp lánh ✨.
2. 🌸 **Sakura Bloom (Hoa anh đào)**: Tone hồng phấn bay bổng, cánh hoa anh đào rơi dịu dàng, thơ mộng và thanh lịch.
3. 🍓 **Strawberry Milk (Dâu tây & Sữa)**: Tone hồng dâu sữa ngọt ngào, icon dâu tây 🍓 và font chữ béo ngậy đáng yêu.
4. 🎀 **Coquette Ribbon (Nơ hồng tiểu thư)**: Phong cách Coquette tiểu thư với nơ ruy băng 🎀, đường viền nét đứt sang trọng.
5. 💖 **Y2K Hot Pink (Hồng cá tính)**: Hot pink rực rỡ phong cách Y2K/Barbiecore năng động, chữ in nổi bật.

### ✨ Nhóm Phong Cách Khác (4 Mẫu):
6. 💜 **Kawaii Lavender (Hàn Quốc)**: Tone tím hoa cà & hồng đào phong cách bullet journal.
7. 🏢 **Minimal Clean (Hiện đại)**: Tối giản, thanh lịch, viền mảnh với độ tương phản cao.
8. ⚡ **Cyberpunk Neon (Dark Mode)**: Nền tối đậm chất game thủ, viền neon phát sáng nổi bật.
9. 📓 **Vintage Notebook (Sổ tay)**: Giấy kẻ ô caro vintage, font viết tay ấm áp như thời học sinh.

---

## 🛠️ Cài đặt & Khởi chạy

```bash
# 1. Cài đặt các gói phụ thuộc
npm install

# 2. Khởi chạy môi trường phát triển (Dev server)
npm run dev

# 3. Mở trình duyệt tại địa chỉ:
http://localhost:5173/
```

Để đóng gói sản phẩm ra thư mục `dist/`:
```bash
npm run build
```

---

## 📋 Cấu trúc JSON mẫu

```json
{
  "title": "Weekly Schedule",
  "subtitle": "Linh Chi",
  "theme": "strawberry-milk",
  "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  "sections": [
    {
      "name": "morning",
      "label": "Ca Sáng",
      "slots": [
        {
          "time": "07:00 - 07:45",
          "Monday": "",
          "Tuesday": "Văn - 7A03",
          "Wednesday": "GDĐP - 7A04",
          "Thursday": "GDĐP - 7A10",
          "Friday": ""
        },
        {
          "time": "08:45 - 09:30",
          "Monday": "Văn - 7A03",
          "Tuesday": "GDĐP - 7A09",
          "Wednesday": "Văn - 7A03",
          "Thursday": "Văn - 7A03",
          "Friday": ""
        }
      ]
    },
    {
      "name": "afternoon",
      "label": "Ca Chiều",
      "slots": [
        {
          "time": "13:45 - 14:30",
          "Monday": "GDĐP - 6A03",
          "Tuesday": "GDĐP - 7A01",
          "Wednesday": "",
          "Thursday": "",
          "Friday": ""
        }
      ]
    }
  ]
}
```
