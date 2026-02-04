// src/data/products.ts

// 1. Định nghĩa kiểu dữ liệu
export interface SpecItem {
  label: string; // Tên thông số (VD: Socket, Dung lượng)
  value: string; // Giá trị (VD: AM5, 16GB)
}

export interface ReviewType {
  id: string;
  user: string;
  rating: number;
  comment: string;
}

export interface ProductType {
  id: string;
  category: 'ram' | 'ssd' | 'hdd' | 'vga' | 'cpu' | 'psu' | 'other'; // Phân loại để dễ quản lý
  name: string;
  price: string;
  priceNumber: number;
  images: string[];
  description: string;
  specs: SpecItem[]; // Mảng chứa thông số
  reviews: ReviewType[];
}

// ====================================================================
// KHUÔN MẪU THÔNG SỐ (COPY CÁI NÀY KHI THÊM SẢN PHẨM MỚI)
// ====================================================================
/*
  1. RAM:
  specs: [
    { label: 'Loại RAM', value: 'DDR4 / DDR5' },
    { label: 'Dung lượng', value: '8GB / 16GB / 32GB' },
    { label: 'Bus', value: '3200MHz / 5600MHz' },
    { label: 'Độ trễ (Cas)', value: 'CL16 / CL36' },
    { label: 'Điện áp', value: '1.2V / 1.35V' },
  ]

  2. CPU:
  specs: [
    { label: 'Socket', value: 'LGA1700 / AM5' },
    { label: 'Số nhân/luồng', value: '16 nhân / 32 luồng' },
    { label: 'Xung nhịp cơ bản', value: '3.5 GHz' },
    { label: 'Xung nhịp tối đa', value: '5.7 GHz' },
    { label: 'Điện năng (TDP)', value: '120W' },
  ]

  3. VGA:
  specs: [
    { label: 'Chip đồ họa', value: 'RTX 4060 / RX 7600' },
    { label: 'VRAM', value: '8GB GDDR6' },
    { label: 'Bus bộ nhớ', value: '128-bit' },
    { label: 'Nguồn phụ', value: '1 x 8-pin' },
    { label: 'Nguồn đề xuất', value: '550W' },
  ]

  4. SSD/HDD:
  specs: [
    { label: 'Chuẩn kết nối', value: 'M.2 NVMe Gen4 / SATA 3' },
    { label: 'Dung lượng', value: '500GB / 1TB' },
    { label: 'Tốc độ đọc', value: '7000 MB/s' },
    { label: 'Tốc độ ghi', value: '6000 MB/s' },
  ]

  5. PSU (Nguồn):
  specs: [
    { label: 'Công suất', value: '650W / 750W' },
    { label: 'Chuẩn hiệu suất', value: '80 Plus Bronze / Gold' },
    { label: 'Kiểu dây', value: 'Full Modular / Non-Modular' },
    { label: 'Kích thước quạt', value: '120mm' },
  ]
*/

// ====================================================================
// DỮ LIỆU SẢN PHẨM CHÍNH THỨC
// ====================================================================

export const PRODUCTS_DATA: ProductType[] = [
  { 
    id: '1', 
    category: 'ram',
    name: 'RAM Corsair Vengeance RGB Pro 16GB (2x8GB) DDR4 3200MHz', 
    price: '2.200.000đ', 
    priceNumber: 2200000,
    images: ['https://kythuatvtech.com/uploads/products/240806034106-16gbconsair1.webp'],
    description: 'RAM Corsair Vengeance RGB PRO thắp sáng PC của bạn với đèn LED RGB đa vùng động đầy mê hoặc, đồng thời mang lại hiệu suất DDR4 tốt nhất.',
    specs: [
      { label: 'Loại RAM', value: 'DDR4' },
      { label: 'Dung lượng', value: '16GB (Kit 2x8GB)' },
      { label: 'Bus', value: '3200MHz' },
      { label: 'Độ trễ (Cas)', value: 'CL16' },
      { label: 'Điện áp', value: '1.35V' },
    ],
    reviews: [
      { id: 'r1', user: 'Minh Tuấn', rating: 5, comment: 'Ram ngon, bật XMP lên 3200 chạy mượt.' }
    ]
  },
  { 
    id: '2', 
    category: 'ssd',
    name: 'SSD Samsung 990 PRO 1TB PCIe 4.0 NVMe', 
    price: '4.900.000đ', 
    priceNumber: 4900000,
    images: ['https://bizweb.dktcdn.net/thumb/1024x1024/100/329/122/products/ssd-samsung-990-pro-pcie-gen-4-0-x4-nvme-v-nand-m-2-2280-1tb-mz-v9p1t0bw-2.jpg?v=1751994033067'],
    description: 'Ổ cứng SSD tối thượng cho game thủ và dân sáng tạo. Tận dụng tối đa giao diện PCIe 4.0 với tốc độ đọc ghi đỉnh cao.',
    specs: [
      { label: 'Chuẩn kết nối', value: 'PCIe Gen 4.0 x4, NVMe 2.0' },
      { label: 'Dung lượng', value: '1TB' },
      { label: 'Tốc độ đọc (Max)', value: '7450 MB/s' },
      { label: 'Tốc độ ghi (Max)', value: '6900 MB/s' },
      { label: 'Độ bền (TBW)', value: '600TB' },
    ],
    reviews: [
      { id: 'r1', user: 'Thành Đạt', rating: 5, comment: 'Tốc độ quá nhanh, load game trong nháy mắt.' }
    ]
  },
  { 
    id: '3', 
    category: 'vga',
    name: 'VGA ASUS ROG Strix GeForce RTX 5090 32GB GDDR7 OC', 
    price: '95.000.000đ', 
    priceNumber: 95000000,
    images: ['https://product.hstatic.net/200000722513/product/rog-astrix-rtx5090-o32g-gaming_box_with_card_nv_73341a59ff3e46e793de18d4ddbacd56_master.png'],
    description: 'Vua của các dòng card đồ họa thế hệ mới. Kiến trúc Blackwell mang lại hiệu năng chơi game 8K và xử lý AI vượt trội.',
    specs: [
      { label: 'Chip đồ họa', value: 'NVIDIA GeForce RTX 5090' },
      { label: 'VRAM', value: '32GB GDDR7' },
      { label: 'Bus bộ nhớ', value: '512-bit' },
      { label: 'Nguồn phụ', value: '1 x 16-pin (12VHPWR)' },
      { label: 'Nguồn đề xuất', value: '1000W trở lên' },
    ],
    reviews: [
      { id: 'r1', user: 'Elon Musk', rating: 5, comment: 'Bán cổ phần Tesla để mua.Đáng từng xu :D' }
    ]
  },
  { 
    id: '4', 
    category: 'cpu',
    name: 'CPU AMD Ryzen™ 9 9950X3D', 
    price: '18.000.000đ', 
    priceNumber: 18000000,
    images: ['https://npcshop.vn/media/product/10251-cpu-amd-ryzen----9-9950x3d1.jpg'],
    description: 'Bộ vi xử lý Gaming tốt nhất thế giới với công nghệ 3D V-Cache thế hệ 2, mang lại FPS cực cao trong các tựa game.',
    specs: [
      { label: 'Socket', value: 'AM5' },
      { label: 'Số nhân / luồng', value: '16 nhân / 32 luồng' },
      { label: 'Xung nhịp Max', value: 'Up to 5.7GHz' },
      { label: 'Bộ nhớ đệm', value: '144MB (L2+L3)' },
      { label: 'TDP Mặc định', value: '120W' },
    ],
    reviews: [
      { id: 'r1', user: 'Gamer', rating: 5, comment: 'Best CPU for Gaming hiện tại.' }
    ]
  },
  { 
    id: '5', 
    category: 'cpu',
    name: 'Intel Core i9 14900K', 
    price: '13.990.000đ', 
    priceNumber: 13990000,
    images: ['https://product.hstatic.net/200000722513/product/n22360_png_36691178908b435494f526d804c4b249.png'],
    description: 'Vi xử lý đầu bảng của Intel Gen 14. Xung nhịp lên tới 6.0GHz ngay khi xuất xưởng, quái vật đa nhiệm.',
    specs: [
      { label: 'Socket', value: 'LGA 1700' },
      { label: 'Số nhân / luồng', value: '24 nhân (8P+16E) / 32 luồng' },
      { label: 'Xung nhịp Max', value: 'Up to 6.0 GHz' },
      { label: 'Bộ nhớ đệm', value: '36MB Smart Cache' },
      { label: 'TDP (Turbo)', value: '253W' },
    ],
    reviews: [
      { id: 'r1', user: 'Editor', rating: 4, comment: 'Render cực nhanh, nhưng rất nóng.' }
    ]
  },
  { 
    id: '6', 
    category: 'psu',
    name: 'PSU ASUS ROG THOR 1600W Titanium III', 
    price: '23.000.000đ', 
    priceNumber: 23000000,
    images: ['https://product.hstatic.net/1000333506/product/image__1__5b38758fa45345078cc128021b5af607_grande.png'],
    description: 'Nguồn máy tính yên tĩnh nhất thế giới. Đạt chuẩn 80 Plus Titanium cao cấp nhất, màn hình OLED hiển thị công suất thực.',
    specs: [
      { label: 'Công suất', value: '1600W' },
      { label: 'Hiệu suất', value: '80 Plus Titanium' },
      { label: 'Kiểu dây', value: 'Full Modular (Dây rời 100%)' },
      { label: 'Quạt', value: '135mm PWM' },
      { label: 'Bảo hành', value: '10 năm' },
    ],
    reviews: [
      { id: 'r1', user: 'Hi-End User', rating: 5, comment: 'Kéo 2 card 4090 thoải mái.' }
    ]
  },
  { 
    id: '7', 
    category: 'hdd',
    name: 'HDD Seagate Ironwolf 8TB 3.5” SATA 3 ST8000VN0022', 
    price: '6.800.000đ', 
    priceNumber: 6800000,
    images: ['https://www.tnc.com.vn/uploads/product/06_2017/ST8000VN0022_1.jpg',
            'https://lagihitech.vn/wp-content/uploads/2019/10/Seagate-IronWolf-8TB.jpg'
    ],
    description: 'Đĩa cứng HDD Seagate Ironwolf 8TB 3.5" SATA 3, phù hợp cho NAS và máy chủ.',
    specs: [
      { label: 'Dung lượng', value: '8TB' },
      { label: 'Loại', value: 'SATA 3' },
      { label: 'Tốc độ quay', value: '7200 RPM' },
      { label: 'Bộ nhớ đệm', value: '256MB' },
      { label: 'Bảo hành', value: '5 năm' },
    ],
    reviews: [
      { id: 'r1', user: 'Hi-End User', rating: 5, comment: 'Dung lượng lớn, ổn định cho NAS.' }
    ]
  },
  { 
    id: '8', 
    category: 'ram',
    name: 'Ram DDR5 G.SKILL Trident Z5 Royal Neo RGB Gold 96GB (2x48GB) 6000MHz', 
    price: '35.990.000đ', 
    priceNumber: 35990000,
    images: ['https://mygear.io.vn/media/product/7497-ram-ddr5-gskill-trident-z5-royal-neo-rgb-gold-96gb-2x48gb-6000mhz-cl28-expo-f5-6000j2836f48gx2-tr5ns-1.jpg',
      'https://mygear.io.vn/media/product/7497-ram-ddr5-gskill-trident-z5-royal-neo-rgb-gold-96gb-2x48gb-6000mhz-cl28-expo-f5-6000j2836f48gx2-tr5ns-3.jpg'
    ],
    description: 'RAM G.SKILL Trident Z5 Royal Neo RGB mang vẻ đẹp hoàng gia với hiệu suất DDR5 đỉnh cao, lý tưởng cho các hệ thống cao cấp và chơi game nặng.',
    specs: [
      { label: 'Loại RAM', value: 'DDR5' },
      { label: 'Dung lượng', value: '96GB (2x48GB)' },
      { label: 'Bus', value: '6000MHz' },
      { label: 'Độ trễ (Cas)', value: 'CL36' },
      { label: 'Điện áp', value: '1.35V' },
    ],
    reviews: [
      { id: 'r1', user: 'Bill Gate', rating: 5, comment: 'Đắt xắt ra miếng.' }
    ]
  },
];