import type { ScheduleData, TemplateConfig } from '../types/schedule';

export const TEMPLATES: TemplateConfig[] = [
  // 1. Mẫu gốc theo ảnh người dùng
  {
    id: 'pastel-rainbow',
    name: 'Pastel Rainbow (Bản mẫu gốc)',
    description: 'Phong cách viên thuốc pastel, dải cầu vồng & ngôi sao lấp lánh như ảnh mẫu',
    previewColor: 'from-pink-300 via-amber-200 to-sky-300',
    category: 'pink',
  },
  // 2. Các mẫu Tone Hồng mới
  {
    id: 'sakura-blossom',
    name: 'Sakura Bloom (Hoa anh đào)',
    description: 'Tone hồng phấn dịu dàng, cánh hoa anh đào rơi thơ mộng và thanh lịch',
    previewColor: 'from-pink-200 via-rose-300 to-pink-400',
    category: 'pink',
  },
  {
    id: 'strawberry-milk',
    name: 'Strawberry Milk (Dâu tây & Sữa)',
    description: 'Hồng dâu ngọt ngào, họa tiết chấm bi chấm dâu 🍓 và chữ béo đáng yêu',
    previewColor: 'from-rose-400 via-pink-300 to-rose-200',
    category: 'pink',
  },
  {
    id: 'coquette-ribbon',
    name: 'Coquette Ribbon (Nơ hồng tiểu thư)',
    description: 'Phong cách tiểu thư Coquette, nơ ruy băng 🎀, viền nét đứt sang chảnh',
    previewColor: 'from-pink-300 via-rose-200 to-pink-100',
    category: 'pink',
  },
  {
    id: 'y2k-pink',
    name: 'Y2K Hot Pink (Hồng cá tính)',
    description: 'Hot pink rực rỡ phong cách Y2K/Barbiecore năng động, chữ in nổi 💖',
    previewColor: 'from-pink-500 via-fuchsia-500 to-purple-600',
    category: 'pink',
  },
  // 3. Các mẫu phong cách khác
  {
    id: 'kawaii-lavender',
    name: 'Kawaii Lavender (Hàn Quốc)',
    description: 'Tông tím hoa cà và hồng đào baby mộng mơ',
    previewColor: 'from-purple-300 via-pink-300 to-indigo-200',
    category: 'other',
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean (Hiện đại)',
    description: 'Tối giản, tinh tế, viền mảnh với độ tương phản cao',
    previewColor: 'from-slate-100 to-slate-300',
    category: 'other',
  },
  {
    id: 'dark-neon',
    name: 'Cyberpunk Neon (Dark Mode)',
    description: 'Nền tối đậm chất game thủ, viền neon phát sáng nổi bật',
    previewColor: 'from-purple-900 via-slate-900 to-cyan-900',
    category: 'other',
  },
  {
    id: 'retro-notebook',
    name: 'Vintage Notebook (Sổ tay)',
    description: 'Giấy kẻ caro vintage, font viết tay ấm áp như thời học sinh',
    previewColor: 'from-amber-100 via-orange-100 to-yellow-200',
    category: 'other',
  },
];

export const PRESET_DEFAULT_LINHCHI: ScheduleData = {
  title: "Weekly Schedule",
  subtitle: "Linh Chi",
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  sections: [
    {
      name: "morning",
      label: "Ca Sáng",
      slots: [
        {
          time: "07:00 - 07:45",
          Monday: "",
          Tuesday: "Văn - 7A03",
          Wednesday: "GDĐP - 7A04",
          Thursday: "GDĐP - 7A10",
          Friday: ""
        },
        {
          time: "07:50 - 08:35",
          Monday: "",
          Tuesday: "",
          Wednesday: "GDĐP - 7A07",
          Thursday: "GDĐP - 7A05",
          Friday: ""
        },
        {
          time: "08:45 - 09:30",
          Monday: "Văn - 7A03",
          Tuesday: "GDĐP - 7A09",
          Wednesday: "Văn - 7A03",
          Thursday: "Văn - 7A03",
          Friday: ""
        },
        {
          time: "09:35 - 10:20",
          Monday: "Văn - 7A06",
          Tuesday: "Văn - 7A06",
          Wednesday: "",
          Thursday: "",
          Friday: ""
        },
        {
          time: "10:25 - 11:10",
          Monday: "",
          Tuesday: "",
          Wednesday: "Văn - 7A06",
          Thursday: "GDĐP - 7A06",
          Friday: ""
        }
      ]
    },
    {
      name: "afternoon",
      label: "Ca Chiều",
      slots: [
        {
          time: "13:45 - 14:30",
          Monday: "GDĐP - 6A03",
          Tuesday: "GDĐP - 7A01",
          Wednesday: "",
          Thursday: "",
          Friday: ""
        },
        {
          time: "14:35 - 15:20",
          Monday: "GDĐP - 7A08",
          Tuesday: "GDĐP - 7A03",
          Wednesday: "",
          Thursday: "",
          Friday: ""
        },
        {
          time: "15:30 - 16:15",
          Monday: "Văn - 7A06",
          Tuesday: "GDĐP - 7A02",
          Wednesday: "",
          Thursday: "",
          Friday: ""
        }
      ]
    }
  ]
};

export const PRESET_UNIVERSITY: ScheduleData = {
  title: "Lịch Học Kì 2",
  subtitle: "Nguyễn Văn A - CNTT K65",
  days: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
  sections: [
    {
      name: "morning",
      label: "Buổi Sáng",
      slots: [
        {
          time: "07:30 - 09:00",
          "Thứ 2": "Cấu trúc dữ liệu",
          "Thứ 3": "",
          "Thứ 4": "Mạng máy tính",
          "Thứ 5": "",
          "Thứ 6": "Hệ điều hành",
          "Thứ 7": ""
        },
        {
          time: "09:15 - 11:45",
          "Thứ 2": "Lập trình Web",
          "Thứ 3": "Anh văn chuyên ngành",
          "Thứ 4": "Toán rời rạc",
          "Thứ 5": "Kiến trúc máy tính",
          "Thứ 6": "",
          "Thứ 7": "Kỹ năng mềm"
        }
      ]
    },
    {
      name: "afternoon",
      label: "Buổi Chiều",
      slots: [
        {
          time: "13:00 - 15:30",
          "Thứ 2": "",
          "Thứ 3": "Thực hành Web (Lab 3)",
          "Thứ 4": "",
          "Thứ 5": "Thực hành Mạng (Lab 1)",
          "Thứ 6": "",
          "Thứ 7": "CLB Tin học"
        },
        {
          time: "15:45 - 17:15",
          "Thứ 2": "Tự học thư viện",
          "Thứ 3": "",
          "Thứ 4": "Thể dục (Bóng rổ)",
          "Thứ 5": "",
          "Thứ 6": "Họp đồ án nhóm",
          "Thứ 7": ""
        }
      ]
    }
  ]
};
