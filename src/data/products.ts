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
  category: 'ram' | 'ssd' | 'hdd' | 'vga' | 'cpu' | 'psu' | 'monitor' | 'mouse' | 'keyboard' | 'headphone' | 'other';
  brand: string; // Thương hiệu
  name: string;
  price: string;
  priceNumber: number;
  images: string[];
  description: string;
  specs: SpecItem[];
  reviews: ReviewType[];
  rating?: number; // Rating trung bình
}

// Brand mapping for each category
export const CATEGORY_BRANDS: Record<string, string[]> = {
  ram: ['Corsair', 'G.SKILL', 'Kingston', 'Samsung', 'ADATA', 'Crucial', 'TeamGroup'],
  ssd: ['Samsung', 'WD', 'Kingston', 'Crucial', 'ADATA', 'TeamGroup', 'Lexar'],
  cpu: ['AMD', 'Intel'],
  vga: ['ASUS', 'MSI', 'Gigabyte', 'Sapphire', 'ASRock'],
  hdd: ['Seagate', 'WD', 'Toshiba'],
  psu: ['ASUS', 'Corsair', 'MSI', 'Cooler Master', 'Thermaltake'],
  monitor: ['ASUS', 'Samsung', 'LG', 'Dell', 'MSI', 'AOC', 'ViewSonic'],
  mouse: ['Logitech', 'Razer', 'SteelSeries', 'Corsair', 'HyperX', 'ASUS', 'Glorious'],
  keyboard: ['Keychron', 'Logitech', 'Razer', 'Corsair', 'SteelSeries', 'ASUS', 'Akko'],
  headphone: ['SteelSeries', 'Logitech', 'Razer', 'HyperX', 'Corsair', 'ASUS', 'JBL'],
};

export const PRODUCTS_DATA: ProductType[] = [
  // ==================== RAM ====================
  { 
    id: 'ram1', 
    category: 'ram',
    brand: 'Corsair',
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
    ],
    rating: 5
  },
  { 
    id: 'ram2', 
    category: 'ram',
    brand: 'G.SKILL',
    name: 'Ram DDR5 G.SKILL Trident Z5 Royal Neo RGB Gold 96GB (2x48GB) 6000MHz', 
    price: '35.990.000đ', 
    priceNumber: 35990000,
    images: ['https://mygear.io.vn/media/product/7497-ram-ddr5-gskill-trident-z5-royal-neo-rgb-gold-96gb-2x48gb-6000mhz-cl28-expo-f5-6000j2836f48gx2-tr5ns-1.jpg'],
    description: 'RAM G.SKILL Trident Z5 Royal Neo RGB mang vẻ đẹp hoàng gia với hiệu suất DDR5 đỉnh cao.',
    specs: [
      { label: 'Loại RAM', value: 'DDR5' },
      { label: 'Dung lượng', value: '96GB (2x48GB)' },
      { label: 'Bus', value: '6000MHz' },
      { label: 'Độ trễ (Cas)', value: 'CL36' },
      { label: 'Điện áp', value: '1.35V' },
    ],
    reviews: [
      { id: 'r1', user: 'Bill Gate', rating: 5, comment: 'Đắt xắt ra miếng.' }
    ],
    rating: 5
  },
  { 
    id: 'ram3', 
    category: 'ram',
    brand: 'Kingston',
    name: 'Kingston Fury Beast DDR5 (1x32GB) 5600MHz', 
    price: '5.990.000đ', 
    priceNumber: 5990000,
    images: ['https://cdn.hstatic.net/products/1000284798/ram-kingston-fury-beast-16gb-3_462e4add28764664abb2f25b31621b69_eccc223e9dc4418bbafc78abbcc4905a_grande.jpg'],
    description: 'Kingston FURY Beast DDR5 RGB với hiệu suất cao, thiết kế tản nhiệt hiệu quả, lý tưởng cho gaming và workstation.',
    specs: [
      { label: 'Loại RAM', value: 'DDR5' },
      { label: 'Dung lượng', value: '32GB' },
      { label: 'Bus', value: '5600MHz' },
      { label: 'Độ trễ (Cas)', value: 'CL36' },
      { label: 'Điện áp', value: '1.25V' },
    ],
    reviews: [],
    rating: 4.5
  },
  { 
    id: 'ram4', 
    category: 'ram',
    brand: 'Samsung',
    name: 'Samsung DDR4 16GB (1x16GB) 3200MHz (For Server)', 
    price: '4.450.000đ', 
    priceNumber: 4450000,
    images: ['https://lagihitech.vn/wp-content/uploads/2020/11/RAM-Samsung-16GB-DDR4-3200MHz-ECC-Registered-M393A2K40DB3-CWE-2.jpg'],
    description: 'RAM DDR4 Samsung ECC chính hãng, chất lượng cao dành cho Server và Workstation chuyên nghiệp.',
    specs: [
      { label: 'Loại RAM', value: 'DDR4 ECC' },
      { label: 'Dung lượng', value: '16GB (1x16GB)' },
      { label: 'Bus', value: '3200MHz' },
      { label: 'Độ trễ (Cas)', value: 'CL22' },
      { label: 'Điện áp', value: '1.2V' },
    ],
    reviews: [],
    rating: 5
  },
  { 
    id: 'ram5', 
    category: 'ram',
    brand: 'ADATA',
    name: 'ADATA XPG Lancer RGB DDR5 32GB (2x16GB) 6000MHz', 
    price: '14.290.000đ', 
    priceNumber: 14290000,
    images: ['https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/r/a/ram-adata-xpg-lancer-rgb-32gb-6000mhz-ddr5-ax5u6000c3016g-dclarwh_2_.png'],
    description: 'ADATA XPG Lancer RGB DDR5 với thiết kế RGB đẹp mắt và hiệu năng vượt trội cho game thủ.',
    specs: [
      { label: 'Loại RAM', value: 'DDR5' },
      { label: 'Dung lượng', value: '32GB (2x16GB)' },
      { label: 'Bus', value: '6000MHz' },
      { label: 'Độ trễ (Cas)', value: 'CL38' },
      { label: 'Điện áp', value: '1.35V' },
    ],
    reviews: [],
    rating: 4
  },
  { 
    id: 'ram6', 
    category: 'ram',
    brand: 'Crucial',
    name: 'Crucial DDR4 8GB 2666MHz UDIMM', 
    price: '1.650.000đ', 
    priceNumber: 1650000,
    images: ['https://bizweb.dktcdn.net/100/329/122/products/ct8g4dfs832a-02-dc6ccda4-987e-4264-8082-b66aba784d5d-06ab4266-9384-44e6-ba69-6a9fa2e36838.jpg?v=1609428883673'],
    description: 'RAM Crucial DDR4 8GB với giá cả phải chăng, phù hợp cho văn phòng và học tập.',
    specs: [
      { label: 'Loại RAM', value: 'DDR4' },
      { label: 'Dung lượng', value: '8GB (1x8GB)' },
      { label: 'Bus', value: '2666MHz' },
      { label: 'Độ trễ (Cas)', value: 'CL19' },
      { label: 'Điện áp', value: '1.2V' },
    ],
    reviews: [],
    rating: 4
  },
  { 
    id: 'ram7', 
    category: 'ram',
    brand: 'TeamGroup',
    name: 'Team T-Force Delta RGB DDR4 16GB (2x8GB) 3600MHz', 
    price: '1.890.000đ', 
    priceNumber: 1890000,
    images: ['https://m.media-amazon.com/images/I/71yyY+Y29WL._AC_UF894,1000_QL80_.jpg'],
    description: 'Team T-Force Delta RGB với thiết kế RGB 120° rực rỡ và hiệu năng gaming tốt.',
    specs: [
      { label: 'Loại RAM', value: 'DDR4' },
      { label: 'Dung lượng', value: '16GB (2x8GB)' },
      { label: 'Bus', value: '3600MHz' },
      { label: 'Độ trễ (Cas)', value: 'CL18' },
      { label: 'Điện áp', value: '1.35V' },
    ],
    reviews: [],
    rating: 4.5
  },

  // ==================== SSD ====================
  { 
    id: 'ssd1', 
    category: 'ssd',
    brand: 'Samsung',
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
    ],
    rating: 5
  },
  {id: 'ssd2', 
    category: 'ssd',
    brand: 'WD',
    name: 'WD Black SN850X 2TB NVMe Gen4', 
    price: '5.490.000đ', 
    priceNumber: 5490000,
    images: ['https://bizweb.dktcdn.net/100/329/122/products/wd-black-sn850x-2tb-3d-hr.jpg?v=1741160387027'],
    description: 'WD Black SN850X được thiết kế cho game thủ chuyên nghiệp với hiệu năng PCIe Gen4 đỉnh cao.',
    specs: [
      { label: 'Chuẩn kết nối', value: 'PCIe Gen 4.0 x4, NVMe 1.4' },
      { label: 'Dung lượng', value: '2TB' },
      { label: 'Tốc độ đọc (Max)', value: '7300 MB/s' },
      { label: 'Tốc độ ghi (Max)', value: '6600 MB/s' },
      { label: 'Độ bền (TBW)', value: '1200TB' },
    ],
    reviews: [],
    rating: 5
  },
  { 
    id: 'ssd3', 
    category: 'ssd',
    brand: 'Kingston',
    name: 'Kingston KC3000 1TB PCIe 4.0 NVMe M.2', 
    price: '8.290.000đ', 
    priceNumber: 8290000,
    images: ['https://nguyencongpc.vn/media/product/22472-sp397902.jpg'],
    description: 'Kingston KC3000 với hiệu năng cao, giá cả hợp lý, lựa chọn tuyệt vời cho PC gaming.',
    specs: [
      { label: 'Chuẩn kết nối', value: 'PCIe 4.0 NVMe M.2' },
      { label: 'Dung lượng', value: '1TB' },
      { label: 'Tốc độ đọc (Max)', value: '7000 MB/s' },
      { label: 'Tốc độ ghi (Max)', value: '6000 MB/s' },
      { label: 'Độ bền (TBW)', value: '800TB' },
    ],
    reviews: [],
    rating: 4.5
  },
  { 
    id: 'ssd4', 
    category: 'ssd',
    brand: 'Crucial',
    name: 'Crucial P5 Plus 500GB PCIe 4.0 3D NAND NVMe', 
    price: '2.690.000đ', 
    priceNumber: 2690000,
    images: ['https://lv4tech.com/wp-content/uploads/2023/09/p5p500g-1.png'],
    description: 'Crucial P5 Plus với công nghệ Micron 3D NAND tiên tiến, tốc độ cao và giá tốt.',
    specs: [
      { label: 'Chuẩn kết nối', value: 'PCIe 4.0 NVMe M.2' },
      { label: 'Dung lượng', value: '500GB' },
      { label: 'Tốc độ đọc (Max)', value: '6600 MB/s' },
      { label: 'Tốc độ ghi (Max)', value: '3600 MB/s' },
      { label: 'Độ bền (TBW)', value: '300TB' },
    ],
    reviews: [],
    rating: 4
  },
  { 
    id: 'ssd5', 
    category: 'ssd',
    brand: 'ADATA',
    name: 'ADATA Legend 850 Lite 1TB PCIe Gen4 NVMe', 
    price: '4.490.000đ', 
    priceNumber: 4490000,
    images: ['https://product.hstatic.net/200000522285/product/legend_850_lite_pk_500gb_7321492796174712ba7807eed35c4c98.png'],
    description: 'ADATA Legend 850 Lite với hiệu suất PCIe Gen4 vượt trội, giá cả phải chăng.',
    specs: [
      { label: 'Chuẩn kết nối', value: 'PCIe Gen4 x4 NVMe 1.4' },
      { label: 'Dung lượng', value: '1TB' },
      { label: 'Tốc độ đọc (Max)', value: '5000 MB/s' },
      { label: 'Tốc độ ghi (Max)', value: '4500 MB/s' },
      { label: 'Độ bền (TBW)', value: '740TB' },
    ],
    reviews: [],
    rating: 4
  },
  { 
    id: 'ssd6', 
    category: 'ssd',
    brand: 'TeamGroup',
    name: 'Team MP44L 512GB M.2 2280 NVMe PCIe Gen4', 
    price: '2.390.000đ', 
    priceNumber: 2390000,
    images: ['https://geekawhat.com/wp-content/uploads/2024/06/FI_TeamGroup-MP44L.jpg'],
    description: 'Team MP44L với dung lượng 512GB, phù hợp cho máy gaming tầm trung.',
    specs: [
      { label: 'Chuẩn kết nối', value: 'PCIe Gen4 x4 NVMe 1.4' },
      { label: 'Dung lượng', value: '512GB' },
      { label: 'Tốc độ đọc (Max)', value: '5000 MB/s' },
      { label: 'Tốc độ ghi (Max)', value: '2500 MB/s' },
      { label: 'Độ bền (TBW)', value: '300TB' },
    ],
    reviews: [],
    rating: 4
  },
  { 
    id: 'ssd7', 
    category: 'ssd',
    brand: 'Lexar',
    name: 'Lexar NM790 2TB M.2 2280 NVMe Gen4', 
    price: '6.190.000đ', 
    priceNumber: 6190000,
    images: ['https://tanthanhdanh.vn/wp-content/uploads/2024/06/NM790SSD_slider_1TB_1.png'],
    description: 'Lexar NM790 cung cấp hiệu năng PCIe Gen4 tuyệt vời với mức giá hấp dẫn.',
    specs: [
      { label: 'Chuẩn kết nối', value: 'PCIe Gen4 x4 NVMe 1.4' },
      { label: 'Dung lượng', value: '2TB' },
      { label: 'Tốc độ đọc (Max)', value: '7400 MB/s' },
      { label: 'Tốc độ ghi (Max)', value: '6500 MB/s' },
      { label: 'Độ bền (TBW)', value: '1500TB' },
    ],
    reviews: [],
    rating: 4.5
  },

  // ==================== CPU ====================
  { 
    id: 'cpu1', 
    category: 'cpu',
    brand: 'AMD',
    name: 'CPU AMD Ryzen™ 9 9950X3D', 
    price: '18.000.000đ', 
    priceNumber: 18000000,
    images: ['https://npcshop.vn/media/product/10251-cpu-amd-ryzen----9-9950x3d1.jpg'],
    description: 'Bộ vi xử lý Gaming tốt nhất thế giới với công nghệ 3D V-Cache thế hệ 2.',
    specs: [
      { label: 'Socket', value: 'AM5' },
      { label: 'Số nhân / luồng', value: '16 nhân / 32 luồng' },
      { label: 'Xung nhịp Max', value: 'Up to 5.7GHz' },
      { label: 'Bộ nhớ đệm', value: '144MB (L2+L3)' },
      { label: 'TDP Mặc định', value: '120W' },
    ],
    reviews: [
      { id: 'r1', user: 'Gamer', rating: 5, comment: 'Best CPU for Gaming hiện tại.' }
    ],
    rating: 5
  },
  { 
    id: 'cpu2', 
    category: 'cpu',
    brand: 'Intel',
    name: 'Intel Core i9 14900K', 
    price: '13.990.000đ', 
    priceNumber: 13990000,
    images: ['https://product.hstatic.net/200000722513/product/n22360_png_36691178908b435494f526d804c4b249.png'],
    description: 'Vi xử lý đầu bảng của Intel Gen 14. Xung nhịp lên tới 6.0GHz ngay khi xuất xưởng.',
    specs: [
      { label: 'Socket', value: 'LGA 1700' },
      { label: 'Số nhân / luồng', value: '24 nhân (8P+16E) / 32 luồng' },
      { label: 'Xung nhịp Max', value: 'Up to 6.0 GHz' },
      { label: 'Bộ nhớ đệm', value: '36MB Smart Cache' },
      { label: 'TDP (Turbo)', value: '253W' },
    ],
    reviews: [
      { id: 'r1', user: 'Editor', rating: 4, comment: 'Render cực nhanh, nhưng rất nóng.' }
    ],
    rating: 4
  },
  { 
    id: 'cpu3', 
    category: 'cpu',
    brand: 'AMD',
    name: 'AMD Ryzen 7 7800X3D', 
    price: '10.990.000đ', 
    priceNumber: 10990000,
    images: ['https://product.hstatic.net/1000333506/product/ryzen-7-7800x3d-600x600_30d6f05d43524a6c950830a366e4f4eb_9139982519ce4b498cbe84dd5559295a.png'],
    description: 'CPU gaming tốt nhất phân khúc tầm trung với công nghệ 3D V-Cache.',
    specs: [
      { label: 'Socket', value: 'AM5' },
      { label: 'Số nhân / luồng', value: '8 nhân / 16 luồng' },
      { label: 'Xung nhịp Max', value: 'Up to 5.0GHz' },
      { label: 'Bộ nhớ đệm', value: '104MB (L2+L3)' },
      { label: 'TDP Mặc định', value: '120W' },
    ],
    reviews: [],
    rating: 5
  },
  { 
    id: 'cpu4', 
    category: 'cpu',
    brand: 'Intel',
    name: 'Intel Core i5 14600K', 
    price: '7.490.000đ', 
    priceNumber: 7490000,
    images: ['https://product.hstatic.net/200000420363/product/_new_-anh-sp-web_0229438098674c899bd2c5675e1559c0_master.jpg'],
    description: 'CPU Intel thế hệ 14 tầm trung, hiệu năng tốt cho gaming và làm việc.',
    specs: [
      { label: 'Socket', value: 'LGA 1700' },
      { label: 'Số nhân / luồng', value: '14 nhân (6P+8E) / 20 luồng' },
      { label: 'Xung nhịp Max', value: 'Up to 5.3 GHz' },
      { label: 'Bộ nhớ đệm', value: '24MB' },
      { label: 'TDP (Turbo)', value: '181W' },
    ],
    reviews: [],
    rating: 4.5
  },
  { 
    id: 'cpu5', 
    category: 'cpu',
    brand: 'AMD',
    name: 'AMD Ryzen 5 7600X', 
    price: '6.990.000đ', 
    priceNumber: 6990000,
    images: ['https://cdn2.cellphones.com.vn/x/media/catalog/product/t/_/t_i_xu_ng_-_2023-01-02t221507.270.png'],
    description: 'CPU AMD Ryzen 5 thế hệ Zen 4, hiệu năng cao cho game và đa nhiệm.',
    specs: [
      { label: 'Socket', value: 'AM5' },
      { label: 'Số nhân / luồng', value: '6 nhân / 12 luồng' },
      { label: 'Xung nhịp Max', value: 'Up to 5.3GHz' },
      { label: 'Bộ nhớ đệm', value: '38MB (L2+L3)' },
      { label: 'TDP Mặc định', value: '105W' },
    ],
    reviews: [],
    rating: 4.5
  },
  { 
    id: 'cpu6', 
    category: 'cpu',
    brand: 'Intel',
    name: 'Intel Core i7 13700K', 
    price: '9.490.000đ', 
    priceNumber: 9490000,
    images: ['https://hanoicomputercdn.com/media/product/68380_cpu_intel_core_i7_13700k_3_4ghz_turbo_up_to_5_4ghz_16_nhan_24_luong_24mb_cache_125w_socket_intel_lga_1700_alder_lake.jpg'],
    description: 'CPU Intel thế hệ 13 với hiệu năng cao, đa nhiệm mượt mà.',
    specs: [
      { label: 'Socket', value: 'LGA 1700' },
      { label: 'Số nhân / luồng', value: '16 nhân (8P+8E) / 24 luồng' },
      { label: 'Xung nhịp Max', value: 'Up to 5.4 GHz' },
      { label: 'Bộ nhớ đệm', value: '30MB' },
      { label: 'TDP (Turbo)', value: '253W' },
    ],
    reviews: [],
    rating: 4.5
  },

  // ==================== VGA (GPU) ====================
  { 
    id: 'vga1', 
    category: 'vga',
    brand: 'ASUS',
    name: 'VGA ASUS ROG Strix GeForce RTX 5090 32GB GDDR7 OC', 
    price: '95.000.000đ', 
    priceNumber: 95000000,
    images: ['https://product.hstatic.net/200000722513/product/rog-astrix-rtx5090-o32g-gaming_box_with_card_nv_73341a59ff3e46e793de18d4ddbacd56_master.png'],
    description: 'Vua của các dòng card đồ họa thế hệ mới. Kiến trúc Blackwell mang lại hiệu năng 8K.',
    specs: [
      { label: 'Chip đồ họa', value: 'NVIDIA GeForce RTX 5090' },
      { label: 'VRAM', value: '32GB GDDR7' },
      { label: 'Bus bộ nhớ', value: '512-bit' },
      { label: 'Nguồn phụ', value: '1 x 16-pin (12VHPWR)' },
      { label: 'Nguồn đề xuất', value: '1000W trở lên' },
    ],
    reviews: [
      { id: 'r1', user: 'Elon Musk', rating: 5, comment: 'Bán cổ phần Tesla để mua. Đáng từng xu :D' }
    ],
    rating: 5
  },
  { 
    id: 'vga2', 
    category: 'vga',
    brand: 'MSI',
    name: 'MSI GeForce RTX 4070 Ti SUPER GAMING X SLIM 16GB', 
    price: '25.490.000đ', 
    priceNumber: 25490000,
    images: ['https://www.tncstore.vn/media/product/250-9683-card-msi-4070ti-super-2.jpg'],
    description: 'MSI RTX 4070 Ti SUPER với thiết kế mỏng, hiệu năng mạnh mẽ cho gaming 1440p.',
    specs: [
      { label: 'Chip đồ họa', value: 'NVIDIA GeForce RTX 4070 Ti SUPER' },
      { label: 'VRAM', value: '16GB GDDR6X' },
      { label: 'Bus bộ nhớ', value: '256-bit' },
      { label: 'Nguồn phụ', value: '1 x 16-pin (12VHPWR)' },
      { label: 'Nguồn đề xuất', value: '750W' },
    ],
    reviews: [],
    rating: 5
  },
  { 
    id: 'vga3', 
    category: 'vga',
    brand: 'Gigabyte',
    name: 'Gigabyte GeForce RTX 4060 WINDFORCE OC 8GB', 
    price: '9.990.000đ', 
    priceNumber: 9990000,
    images: ['https://hanoicomputercdn.com/media/product/73422_card_man_hinh_gigabyte_rtx_4060_gaming_oc_8gd__10_.jpg'],
    description: 'Card đồ họa tầm trung tốt nhất cho gaming 1080p với giá hợp lý.',
    specs: [
      { label: 'Chip đồ họa', value: 'NVIDIA GeForce RTX 4060' },
      { label: 'VRAM', value: '8GB GDDR6' },
      { label: 'Bus bộ nhớ', value: '128-bit' },
      { label: 'Nguồn phụ', value: '1 x 8-pin' },
      { label: 'Nguồn đề xuất', value: '550W' },
    ],
    reviews: [],
    rating: 4.5
  },
  { 
    id: 'vga4', 
    category: 'vga',
    brand: 'Sapphire',
    name: 'Sapphire PULSE AMD Radeon RX 7900 XTX 24GB', 
    price: '29.990.000đ', 
    priceNumber: 29990000,
    images: ['https://songphuong.vn/Content/uploads/2022/12/VGA-Sapphire-PULSE-Radeon-RX-7900-XTX-24GB-GDDR6-10-songphuong.vn_-1.jpg'],
    description: 'Card AMD flagship với 24GB VRAM, lý tưởng cho gaming 4K và content creation.',
    specs: [
      { label: 'Chip đồ họa', value: 'AMD Radeon RX 7900 XTX' },
      { label: 'VRAM', value: '24GB GDDR6' },
      { label: 'Bus bộ nhớ', value: '384-bit' },
      { label: 'Nguồn phụ', value: '2 x 8-pin' },
      { label: 'Nguồn đề xuất', value: '800W' },
    ],
    reviews: [],
    rating: 5
  },
  { 
    id: 'vga5', 
    category: 'vga',
    brand: 'ASUS',
    name: 'ASUS TUF Gaming GeForce RTX 4070 SUPER OC 12GB', 
    price: '21.990.000đ', 
    priceNumber: 21990000,
    images: ['https://nguyencongpc.vn/media/product/26195-tuf-rtx4070s-o12g-01.jpg'],
    description: 'Card đồ họa RTX 4070 SUPER với thiết kế TUF Gaming bền bỉ.',
    specs: [
      { label: 'Chip đồ họa', value: 'NVIDIA GeForce RTX 4070 SUPER' },
      { label: 'VRAM', value: '12GB GDDR6X' },
      { label: 'Bus bộ nhớ', value: '192-bit' },
      { label: 'Nguồn phụ', value: '1 x 16-pin (12VHPWR)' },
      { label: 'Nguồn đề xuất', value: '700W' },
    ],
    reviews: [],
    rating: 5
  },
  { 
    id: 'vga6', 
    category: 'vga',
    brand: 'ASRock',
    name: 'ASRock AMD Radeon RX 7600 Challenger 8GB', 
    price: '7.990.000đ', 
    priceNumber: 7990000,
    images: ['https://cdn.hstatic.net/products/200000079075/vga-asrock-rx-7600-challenger-8gb-oc-rx7600-cl-8go-65741741773673_b2f28e1971414ea282d9378fb2041d93_master.png'],
    description: 'Card đồ họa AMD tầm trung với hiệu năng tốt cho gaming 1080p.',
    specs: [
      { label: 'Chip đồ họa', value: 'AMD Radeon RX 7600' },
      { label: 'VRAM', value: '8GB GDDR6' },
      { label: 'Bus bộ nhớ', value: '128-bit' },
      { label: 'Nguồn phụ', value: '1 x 8-pin' },
      { label: 'Nguồn đề xuất', value: '550W' },
    ],
    reviews: [],
    rating: 4
  },

  // ==================== HDD ====================
  { 
    id: 'hdd1', 
    category: 'hdd',
    brand: 'Seagate',
    name: 'HDD Seagate Ironwolf 8TB 3.5" SATA 3 ST8000VN0022', 
    price: '6.800.000đ', 
    priceNumber: 6800000,
    images: ['https://www.tnc.com.vn/uploads/product/06_2017/ST8000VN0022_1.jpg'],
    description: 'Đĩa cứng HDD Seagate Ironwolf 8TB, phù hợp cho NAS và máy chủ.',
    specs: [
      { label: 'Dung lượng', value: '8TB' },
      { label: 'Loại', value: 'SATA 3' },
      { label: 'Tốc độ quay', value: '7200 RPM' },
      { label: 'Bộ nhớ đệm', value: '256MB' },
      { label: 'Bảo hành', value: '5 năm' },
    ],
    reviews: [
      { id: 'r1', user: 'Hi-End User', rating: 5, comment: 'Dung lượng lớn, ổn định cho NAS.' }
    ],
    rating: 5
  },
  { 
    id: 'hdd2', 
    category: 'hdd',
    brand: 'WD',
    name: 'WD Red Plus 4TB 3.5" SATA 3 CMR', 
    price: '3.490.000đ', 
    priceNumber: 3490000,
    images: ['https://hugotech.vn/wp-content/uploads/4-1392-600x600.jpg'],
    description: 'HDD WD Red Plus dành cho NAS, công nghệ CMR đảm bảo độ tin cậy cao.',
    specs: [
      { label: 'Dung lượng', value: '4TB' },
      { label: 'Loại', value: 'SATA 3 CMR' },
      { label: 'Tốc độ quay', value: '5400 RPM' },
      { label: 'Bộ nhớ đệm', value: '128MB' },
      { label: 'Bảo hành', value: '3 năm' },
    ],
    reviews: [],
    rating: 4.5
  },
  { 
    id: 'hdd3', 
    category: 'hdd',
    brand: 'Toshiba',
    name: 'Toshiba N300 6TB 3.5" SATA 3 NAS HDD', 
    price: '4.790.000đ', 
    priceNumber: 4790000,
    images: ['https://phucanhcdn.com/media/product/32884-nas-toshiba-n300-6tb-1-1.jpg'],
    description: 'Toshiba N300 được thiết kế đặc biệt cho hệ thống NAS.',
    specs: [
      { label: 'Dung lượng', value: '6TB' },
      { label: 'Loại', value: 'SATA 3' },
      { label: 'Tốc độ quay', value: '7200 RPM' },
      { label: 'Bộ nhớ đệm', value: '256MB' },
      { label: 'Bảo hành', value: '3 năm' },
    ],
    reviews: [],
    rating: 4.5
  },
  { 
    id: 'hdd4', 
    category: 'hdd',
    brand: 'Seagate',
    name: 'Seagate BarraCuda 2TB 3.5" SATA 3', 
    price: '1.590.000đ', 
    priceNumber: 1590000,
    images: ['https://tandoanh.vn/wp-content/uploads/2025/01/Seagate-Barracuda-2TB-ST2000DM008-H3.jpg'],
    description: 'HDD Seagate BarraCuda phổ thông cho PC gaming và văn phòng.',
    specs: [
      { label: 'Dung lượng', value: '2TB' },
      { label: 'Loại', value: 'SATA 3' },
      { label: 'Tốc độ quay', value: '7200 RPM' },
      { label: 'Bộ nhớ đệm', value: '256MB' },
      { label: 'Bảo hành', value: '2 năm' },
    ],
    reviews: [],
    rating: 4
  },
  { 
    id: 'hdd5', 
    category: 'hdd',
    brand: 'WD',
    name: 'WD Blue 1TB 3.5" SATA 3', 
    price: '990.000đ', 
    priceNumber: 990000,
    images: ['https://product.hstatic.net/200000680839/product/blue-1tb-3.5_compressed_2bf3b8a884354c67b7024e2a4fd49f82_master_4dc57aa393954f6186b66e82ff2a5e9a.jpg'],
    description: 'HDD WD Blue giá rẻ, phù hợp cho lưu trữ dữ liệu cơ bản.',
    specs: [
      { label: 'Dung lượng', value: '1TB' },
      { label: 'Loại', value: 'SATA 3' },
      { label: 'Tốc độ quay', value: '7200 RPM' },
      { label: 'Bộ nhớ đệm', value: '64MB' },
      { label: 'Bảo hành', value: '2 năm' },
    ],
    reviews: [],
    rating: 4
  },

  // ==================== PSU ====================
  { 
    id: 'psu1', 
    category: 'psu',
    brand: 'ASUS',
    name: 'PSU ASUS ROG THOR 1600W Titanium III', 
    price: '23.000.000đ', 
    priceNumber: 23000000,
    images: ['https://product.hstatic.net/1000333506/product/image__1__5b38758fa45345078cc128021b5af607_grande.png'],
    description: 'Nguồn máy tính yên tĩnh nhất thế giới. Đạt chuẩn 80 Plus Titanium.',
    specs: [
      { label: 'Công suất', value: '1600W' },
      { label: 'Hiệu suất', value: '80 Plus Titanium' },
      { label: 'Kiểu dây', value: 'Full Modular' },
      { label: 'Quạt', value: '135mm PWM' },
      { label: 'Bảo hành', value: '10 năm' },
    ],
    reviews: [
      { id: 'r1', user: 'Hi-End User', rating: 5, comment: 'Kéo 2 card 4090 thoải mái.' }
    ],
    rating: 5
  },
  { 
    id: 'psu2', 
    category: 'psu',
    brand: 'Corsair',
    name: 'Corsair RM1000x 1000W 80 Plus Gold', 
    price: '5.490.000đ', 
    priceNumber: 5490000,
    images: ['https://www.tncstore.vn/media/product/9919-nguon-corsair-rm1000x-shift-1000.jpg'],
    description: 'Nguồn Corsair RM1000x với hiệu suất 80 Plus Gold, dây rời hoàn toàn.',
    specs: [
      { label: 'Công suất', value: '1000W' },
      { label: 'Hiệu suất', value: '80 Plus Gold' },
      { label: 'Kiểu dây', value: 'Full Modular' },
      { label: 'Quạt', value: '135mm' },
      { label: 'Bảo hành', value: '10 năm' },
    ],
    reviews: [],
    rating: 5
  },
  { 
    id: 'psu3', 
    category: 'psu',
    brand: 'MSI',
    name: 'MSI MAG A850GL 850W 80 Plus Gold', 
    price: '3.290.000đ', 
    priceNumber: 3290000,
    images: ['https://phucanhcdn.com/media/lib/14-03-2025/chan-trang-thang-3-bai-22-1.jpg'],
    description: 'Nguồn MSI MAG A850GL với chứng nhận 80 Plus Gold, giá tốt.',
    specs: [
      { label: 'Công suất', value: '850W' },
      { label: 'Hiệu suất', value: '80 Plus Gold' },
      { label: 'Kiểu dây', value: 'Full Modular' },
      { label: 'Quạt', value: '120mm' },
      { label: 'Bảo hành', value: '7 năm' },
    ],
    reviews: [],
    rating: 4.5
  },
  { 
    id: 'psu4', 
    category: 'psu',
    brand: 'Cooler Master',
    name: 'Cooler Master MWE 750W V2 80 Plus Bronze', 
    price: '1.990.000đ', 
    priceNumber: 1990000,
    images: ['https://cdn.hstatic.net/products/200000320233/0001_b8fa8450fe554b4580030aaa5e05cd18.png'],
    description: 'Nguồn Cooler Master MWE với chuẩn 80 Plus Bronze, giá phải chăng.',
    specs: [
      { label: 'Công suất', value: '750W' },
      { label: 'Hiệu suất', value: '80 Plus Bronze' },
      { label: 'Kiểu dây', value: 'Non-Modular' },
      { label: 'Quạt', value: '120mm' },
      { label: 'Bảo hành', value: '5 năm' },
    ],
    reviews: [],
    rating: 4
  },
  { 
    id: 'psu5', 
    category: 'psu',
    brand: 'Thermaltake',
    name: 'Thermaltake Toughpower GF3 850W 80 Plus Gold', 
    price: '3.790.000đ', 
    priceNumber: 3790000,
    images: ['https://thermaltakeusa.com/cdn/shop/files/toughpower_gf3_850_04.jpg?v=1696627774&width=1445'],
    description: 'Nguồn Thermaltake Toughpower GF3 với hiệu suất cao và độ ồn thấp.',
    specs: [
      { label: 'Công suất', value: '850W' },
      { label: 'Hiệu suất', value: '80 Plus Gold' },
      { label: 'Kiểu dây', value: 'Full Modular' },
      { label: 'Quạt', value: '140mm' },
      { label: 'Bảo hành', value: '10 năm' },
    ],
    reviews: [],
    rating: 4.5
  },

  //==================== MONITOR ====================
  { 
    id: 'mon1', 
    category: 'monitor',
    brand: 'ASUS',
    name: 'ASUS ROG Swift PG27AQDM 27" OLED 240Hz QHD', 
    price: '28.990.000đ', 
    priceNumber: 28990000,
    images: ['https://product.hstatic.net/1000333506/product/rog-swift-oled-pg27aqdm-ttd-1_f6e7432eb3d3438e946c56e7e68d1ab0.png'],
    description: 'Màn hình gaming OLED cao cấp với tần số quét 240Hz và độ phân giải QHD.',
    specs: [
      { label: 'Kích thước', value: '27 inch' },
      { label: 'Độ phân giải', value: '2560 x 1440 (QHD)' },
      { label: 'Tấm nền', value: 'OLED' },
      { label: 'Tần số quét', value: '240Hz' },
      { label: 'Thời gian phản hồi', value: '0.03ms' },
    ],
    reviews: [],
    rating: 5
  },
  { 
    id: 'mon2', 
    category: 'monitor',
    brand: 'Samsung',
    name: 'Samsung Odyssey G7 32" Curved 240Hz QHD', 
    price: '12.990.000đ', 
    priceNumber: 12990000,
    images: ['https://images.samsung.com/is/image/samsung/p6pim/at/lc32g75tqspxen/gallery/at-odyssey-g7-c32g75t-lc32g75tqspxen-536109750?$Q90_1248_936_F_PNG$'],
    description: 'Màn hình cong Samsung Odyssey G7 với độ cong 1000R và tần số quét 240Hz.',
    specs: [
      { label: 'Kích thước', value: '32 inch' },
      { label: 'Độ phân giải', value: '2560 x 1440 (QHD)' },
      { label: 'Tấm nền', value: 'VA Curved (1000R)' },
      { label: 'Tần số quét', value: '240Hz' },
      { label: 'Thời gian phản hồi', value: '1ms' },
    ],
    reviews: [],
    rating: 5
  },
  { 
    id: 'mon3', 
    category: 'monitor',
    brand: 'LG',
    name: 'LG UltraGear 27GN950-B 27" 4K 144Hz Nano IPS', 
    price: '16.990.000đ', 
    priceNumber: 16990000,
    images: ['https://kenhtinhoc.vn/wp-content/uploads/2023/12/man-hinh-lg-27gn950-b-27-inch-4k-nano-ips-144hz-1ms-1.jpg'],
    description: 'Màn hình LG UltraGear 4K với công nghệ Nano IPS, màu sắc chính xác.',
    specs: [
      { label: 'Kích thước', value: '27 inch' },
      { label: 'Độ phân giải', value: '3840 x 2160 (4K UHD)' },
      { label: 'Tấm nền', value: 'Nano IPS' },
      { label: 'Tần số quét', value: '144Hz' },
      { label: 'Thời gian phản hồi', value: '1ms' },
    ],
    reviews: [],
    rating: 5
  },
  { 
    id: 'mon4', 
    category: 'monitor',
    brand: 'Dell',
    name: 'Dell S2722DGM 27" Curved 165Hz QHD', 
    price: '6.490.000đ', 
    priceNumber: 6490000,
    images: ['https://tanphat.com.vn/media/product/2678_dell_s2722dgm_850x850_3.jpg'],
    description: 'Màn hình gaming Dell với độ cong 1500R, giá cả phải chăng.',
    specs: [
      { label: 'Kích thước', value: '27 inch' },
      { label: 'Độ phân giải', value: '2560 x 1440 (QHD)' },
      { label: 'Tấm nền', value: 'VA Curved (1500R)' },
      { label: 'Tần số quét', value: '165Hz' },
      { label: 'Thời gian phản hồi', value: '1-2ms' },
    ],
    reviews: [],
    rating: 4.5
  },
  { 
    id: 'mon5', 
    category: 'monitor',
    brand: 'MSI',
    name: 'MSI MAG274QRF-QD 27" Rapid IPS 165Hz QHD', 
    price: '8.490.000đ', 
    priceNumber: 8490000,
    images: ['https://kenhtinhoc.vn/wp-content/uploads/2024/01/man-hinh-msi-optix-mag274qrf-qd-27-inch-2k-ips-165hz-1ms-chuyen-game-1.jpg'],
    description: 'Màn hình MSI MAG với công nghệ Quantum Dot và Rapid IPS.',
    specs: [
      { label: 'Kích thước', value: '27 inch' },
      { label: 'Độ phân giải', value: '2560 x 1440 (QHD)' },
      { label: 'Tấm nền', value: 'Rapid IPS' },
      { label: 'Tần số quét', value: '165Hz' },
      { label: 'Thời gian phản hồi', value: '1ms' },
    ],
    reviews: [],
    rating: 4.5
  },
  { 
    id: 'mon6', 
    category: 'monitor',
    brand: 'AOC',
    name: 'AOC 24G2 24" IPS 144Hz Full HD', 
    price: '3.990.000đ', 
    priceNumber: 3990000,
    images: ['https://nguyencongpc.vn/media/product/250-16694-24g2.jpg'],
    description: 'Màn hình gaming giá rẻ AOC 24G2 với tấm nền IPS và 144Hz.',
    specs: [
      { label: 'Kích thước', value: '24 inch' },
      { label: 'Độ phân giải', value: '1920 x 1080 (Full HD)' },
      { label: 'Tấm nền', value: 'IPS' },
      { label: 'Tần số quét', value: '144Hz' },
      { label: 'Thời gian phản hồi', value: '1ms' },
    ],
    reviews: [],
    rating: 4.5
  },
  { 
    id: 'mon7', 
    category: 'monitor',
    brand: 'ViewSonic',
    name: 'ViewSonic VX2718-PC-MHD 27" Curved 165Hz Full HD', 
    price: '4.490.000đ', 
    priceNumber: 4490000,
    images: ['https://anphat.com.vn/media/product/34818_viewsonic_vx2718_pc_mhd_upweb_1.jpg'],
    description: 'Màn hình ViewSonic cong với độ cong 1500R, giá tốt cho gaming.',
    specs: [
      { label: 'Kích thước', value: '27 inch' },
      { label: 'Độ phân giải', value: '1920 x 1080 (Full HD)' },
      { label: 'Tấm nền', value: 'VA Curved (1500R)' },
      { label: 'Tần số quét', value: '165Hz' },
      { label: 'Thời gian phản hồi', value: '1ms' },
    ],
    reviews: [],
    rating: 4
  },

  // ==================== MOUSE ====================
  { 
    id: 'mou1', 
    category: 'mouse',
    brand: 'Logitech',
    name: 'Logitech G Pro X Superlight 2 Wireless Gaming Mouse', 
    price: '3.990.000đ', 
    priceNumber: 3990000,
    images: ['https://product.hstatic.net/200000722513/product/3_7c1bf2ff4e504450a42de78e6cc48087_master.jpg'],
    description: 'Chuột gaming không dây siêu nhẹ với sensor HERO 2 32K DPI.',
    specs: [
      { label: 'Loại kết nối', value: 'Wireless 2.4GHz' },
      { label: 'Sensor', value: 'HERO 2' },
      { label: 'DPI', value: 'Up to 32,000' },
      { label: 'Trọng lượng', value: '60g' },
      { label: 'Pin', value: 'Up to 95 giờ' },
    ],
    reviews: [],
    rating: 5
  },
  { 
    id: 'mou2', 
    category: 'mouse',
    brand: 'Razer',
    name: 'Razer Viper V3 Pro Wireless Gaming Mouse', 
    price: '4.290.000đ', 
    priceNumber: 4290000,
    images: ['https://anphat.com.vn/media/product/48699_razer_viper_pro_v3_white__1_.jpg'],
    description: 'Chuột Razer Viper V3 Pro với Focus Pro 30K sensor và thiết kế siêu nhẹ.',
    specs: [
      { label: 'Loại kết nối', value: 'Wireless HyperSpeed' },
      { label: 'Sensor', value: 'Focus Pro 30K' },
      { label: 'DPI', value: 'Up to 30,000' },
      { label: 'Trọng lượng', value: '54g' },
      { label: 'Pin', value: 'Up to 90 giờ' },
    ],
    reviews: [],
    rating: 5
  },
  { 
    id: 'mou3', 
    category: 'mouse',
    brand: 'SteelSeries',
    name: 'SteelSeries Aerox 5 Wireless Gaming Mouse', 
    price: '2.990.000đ', 
    priceNumber: 2990000,
    images: ['https://www.tncstore.vn/media/product/8992-chuot-aerox5-black-wireless-1.jpg'],
    description: 'Chuột SteelSeries Aerox 5 với 9 nút lập trình và thiết kế chống nước IP54.',
    specs: [
      { label: 'Loại kết nối', value: 'Wireless 2.4GHz + Bluetooth' },
      { label: 'Sensor', value: 'TrueMove Air' },
      { label: 'DPI', value: 'Up to 18,000' },
      { label: 'Trọng lượng', value: '74g' },
      { label: 'Pin', value: 'Up to 180 giờ' },
    ],
    reviews: [],
    rating: 4.5
  },
  { 
    id: 'mou4', 
    category: 'mouse',
    brand: 'Corsair',
    name: 'Corsair Dark Core RGB Pro SE Wireless Gaming Mouse', 
    price: '2.490.000đ', 
    priceNumber: 2490000,
    images: ['https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024,f_auto/products/Gaming-Mice/CH-9315511-EU/Gallery/DARK_CORE_RGB_PRO_SE_01.webp'],
    description: 'Chuột Corsair Dark Core với khả năng sạc không dây Qi và đèn RGB.',
    specs: [
      { label: 'Loại kết nối', value: 'Wireless 2.4GHz + Bluetooth' },
      { label: 'Sensor', value: 'PMW3392' },
      { label: 'DPI', value: 'Up to 18,000' },
      { label: 'Trọng lượng', value: '133g' },
      { label: 'Pin', value: 'Up to 50 giờ' },
    ],
    reviews: [],
    rating: 4.5
  },
  { 
    id: 'mou5', 
    category: 'mouse',
    brand: 'HyperX',
    name: 'HyperX Pulsefire Haste Wireless Gaming Mouse', 
    price: '1.690.000đ', 
    priceNumber: 1690000,
    images: ['https://row.hyperx.com/cdn/shop/files/hyperx_pulsefire_haste_wireless_white_1_top_down.jpg?v=1700189384'],
    description: 'Chuột HyperX Pulsefire Haste siêu nhẹ với honeycomb shell design.',
    specs: [
      { label: 'Loại kết nối', value: 'Wireless 2.4GHz + Wired' },
      { label: 'Sensor', value: 'PAW3335' },
      { label: 'DPI', value: 'Up to 16,000' },
      { label: 'Trọng lượng', value: '61g' },
      { label: 'Pin', value: 'Up to 100 giờ' },
    ],
    reviews: [],
    rating: 4.5
  },
  { 
    id: 'mou6', 
    category: 'mouse',
    brand: 'ASUS',
    name: 'ASUS ROG Gladius III Wireless Gaming Mouse', 
    price: '2.290.000đ', 
    priceNumber: 2290000,
    images: ['https://product.hstatic.net/200000722513/product/h732_d29ee675b2e14c79a3d16f4ebd70d359_77db2ebffe484dbaa6fad709392b6705_master.png'],
    description: 'Chuột ASUS ROG Gladius III với công tắc có thể thay thế và đèn RGB Aura Sync.',
    specs: [
      { label: 'Loại kết nối', value: 'Wireless 2.4GHz + Bluetooth + Wired' },
      { label: 'Sensor', value: 'PAW3370' },
      { label: 'DPI', value: 'Up to 26,000' },
      { label: 'Trọng lượng', value: '79g' },
      { label: 'Pin', value: 'Up to 89 giờ' },
    ],
    reviews: [],
    rating: 4.5
  },
  { 
    id: 'mou7', 
    category: 'mouse',
    brand: 'Glorious',
    name: 'Glorious Model O Wireless Gaming Mouse', 
    price: '1.890.000đ', 
    priceNumber: 1890000,
    images: ['https://bizweb.dktcdn.net/thumb/grande/100/329/122/products/chuot-gaming-khong-day-glorious-model-o-wireless.jpg?v=1660301579157'],
    description: 'Chuột Glorious Model O với thiết kế honeycomb nhẹ và pin lâu.',
    specs: [
      { label: 'Loại kết nối', value: 'Wireless 2.4GHz' },
      { label: 'Sensor', value: 'BAMF 2.0' },
      { label: 'DPI', value: 'Up to 19,000' },
      { label: 'Trọng lượng', value: '69g' },
      { label: 'Pin', value: 'Up to 71 giờ' },
    ],
    reviews: [],
    rating: 4.5
  },

  // ==================== KEYBOARD ====================
  { 
    id: 'key1', 
    category: 'keyboard',
    brand: 'Keychron',
    name: 'Keychron Q1 Pro QMK Custom Mechanical Keyboard', 
    price: '4.990.000đ', 
    priceNumber: 4990000,
    images: ['https://siliconz.vn/cdn/shop/files/keychron-q1-pro-2.jpg?v=1719914487&width=1445'],
    description: 'Bàn phím cơ custom Keychron Q1 Pro với khung nhôm CNC và QMK/VIA.',
    specs: [
      { label: 'Loại kết nối', value: 'Wireless + Wired USB-C' },
      { label: 'Layout', value: '75% (82 phím)' },
      { label: 'Switch', value: 'Gateron G Pro (Hot-swap)' },
      { label: 'Keycap', value: 'Double-shot PBT' },
      { label: 'Đèn nền', value: 'RGB Per-key' },
    ],
    reviews: [],
    rating: 5
  },
  { 
    id: 'key2', 
    category: 'keyboard',
    brand: 'Logitech',
    name: 'Logitech G Pro X TKL Wireless Gaming Keyboard', 
    price: '4.490.000đ', 
    priceNumber: 4490000,
    images: ['https://product.hstatic.net/200000637319/product/ezgif-2-592452ad42_af8a637e5aab4c038ea19b0131f398bd_master.png'],
    description: 'Bàn phím gaming không dây Logitech G Pro X TKL với công tắc GX có thể thay đổi.',
    specs: [
      { label: 'Loại kết nối', value: 'Wireless Lightspeed + Wired' },
      { label: 'Layout', value: 'TKL (Tenkeyless)' },
      { label: 'Switch', value: 'GX Linear/Tactile/Clicky' },
      { label: 'Keycap', value: 'Double-shot PBT' },
      { label: 'Đèn nền', value: 'RGB Lightsync' },
    ],
    reviews: [],
    rating: 5
  },
  { 
    id: 'key3', 
    category: 'keyboard',
    brand: 'Razer',
    name: 'Razer BlackWidow V4 Pro Mechanical Gaming Keyboard', 
    price: '5.990.000đ', 
    priceNumber: 5990000,
    images: ['https://m.media-amazon.com/images/I/81L4FpeS3VL._AC_UF894,1000_QL80_.jpg'],
    description: 'Bàn phím cơ Razer BlackWidow V4 Pro với 8 macro keys và command dial.',
    specs: [
      { label: 'Loại kết nối', value: 'Wired USB-C' },
      { label: 'Layout', value: 'Full-size (104 phím)' },
      { label: 'Switch', value: 'Razer Green/Yellow/Orange' },
      { label: 'Keycap', value: 'Double-shot ABS' },
      { label: 'Đèn nền', value: 'RGB Chroma Per-key' },
    ],
    reviews: [],
    rating: 4.5
  },
  { 
    id: 'key4', 
    category: 'keyboard',
    brand: 'Corsair',
    name: 'Corsair K70 RGB TKL Wireless Gaming Keyboard', 
    price: '3.990.000đ', 
    priceNumber: 3990000,
    images: ['https://product.hstatic.net/200000637319/product/k70_core_tkl_wireless_render_31_8d94d82e675342c386676421df3241bd.png'],
    description: 'Bàn phím Corsair K70 TKL với khung nhôm và Cherry MX switches.',
    specs: [
      { label: 'Loại kết nối', value: 'Wireless 2.4GHz + Bluetooth + Wired' },
      { label: 'Layout', value: 'TKL (87 phím)' },
      { label: 'Switch', value: 'Cherry MX Red/Brown/Speed' },
      { label: 'Keycap', value: 'Double-shot PBT' },
      { label: 'Đèn nền', value: 'RGB Per-key' },
    ],
    reviews: [],
    rating: 5
  },
  { 
    id: 'key5', 
    category: 'keyboard',
    brand: 'SteelSeries',
    name: 'SteelSeries Apex Pro TKL Wireless Gaming Keyboard', 
    price: '5.490.000đ', 
    priceNumber: 5490000,
    images: ['https://owlgaming.vn/wp-content/uploads/2024/06/ban-phim-co-steelseries-apex-pro-tkl-omnipoint-wireless-keyboard-us-magnetic-wrist-rest-5.jpg'],
    description: 'Bàn phím SteelSeries Apex Pro TKL với OmniPoint 2.0 Adjustable switches.',
    specs: [
      { label: 'Loại kết nối', value: 'Wireless 2.4GHz + Bluetooth + Wired' },
      { label: 'Layout', value: 'TKL (88 phím)' },
      { label: 'Switch', value: 'OmniPoint 2.0 (Adjustable)' },
      { label: 'Keycap', value: 'Pudding Double-shot PBT' },
      { label: 'Đèn nền', value: 'RGB Per-key' },
    ],
    reviews: [],
    rating: 5
  },
  { 
    id: 'key6', 
    category: 'keyboard',
    brand: 'ASUS',
    name: 'ASUS ROG Strix Scope II 96 Wireless Gaming Keyboard', 
    price: '3.790.000đ', 
    priceNumber: 3790000,
    images: ['https://owlgaming.vn/wp-content/uploads/2024/04/ban-phim-co-asus-rog-strix-scope-ii-96-wireless-1.jpg'],
    description: 'Bàn phím ASUS ROG Strix Scope II 96 với layout compact và ROG NX switches.',
    specs: [
      { label: 'Loại kết nối', value: 'Wireless 2.4GHz + Bluetooth + Wired' },
      { label: 'Layout', value: '96% (100 phím)' },
      { label: 'Switch', value: 'ROG NX Red/Blue/Brown' },
      { label: 'Keycap', value: 'PBT Doubleshot' },
      { label: 'Đèn nền', value: 'RGB Aura Sync' },
    ],
    reviews: [],
    rating: 4.5
  },
  { 
    id: 'key7', 
    category: 'keyboard',
    brand: 'Akko',
    name: 'Akko 3098B Bluetooth Mechanical Keyboard', 
    price: '1.990.000đ', 
    priceNumber: 1990000,
    images: ['https://akko.vn/wp-content/uploads/2021/10/ban-phim-co-akko-3098b-multi-modes-ocean-star-ava-akkovn.jpg'],
    description: 'Bàn phím cơ Akko 3098B với giá tốt, layout 98 phím và kết nối đa dạng.',
    specs: [
      { label: 'Loại kết nối', value: 'Wireless Bluetooth + Wired USB-C' },
      { label: 'Layout', value: '98% (100 phím)' },
      { label: 'Switch', value: 'Akko CS Switch (Hot-swap)' },
      { label: 'Keycap', value: 'Cherry Profile ABS' },
      { label: 'Đèn nền', value: 'RGB Backlight' },
    ],
    reviews: [],
    rating: 4.5
  },

  // ==================== HEADPHONE ====================
  { 
    id: 'hp1', 
    category: 'headphone',
    brand: 'SteelSeries',
    name: 'SteelSeries Arctis Nova Pro Wireless Gaming Headset', 
    price: '8.990.000đ', 
    priceNumber: 8990000,
    images: ['https://hanoicomputercdn.com/media/product/86050_tai_nghe_steelseries_arctis_nova_pro_wireless_infinity_power_system_white_61524_01.jpg'],
    description: 'Tai nghe gaming cao cấp SteelSeries Arctis Nova Pro với Active Noise Cancellation.',
    specs: [
      { label: 'Loại kết nối', value: 'Wireless 2.4GHz + Bluetooth' },
      { label: 'Driver', value: '40mm Neodymium' },
      { label: 'Tần số', value: '10Hz - 40kHz' },
      { label: 'Micro', value: 'ClearCast Gen 2 AI Noise Cancelling' },
      { label: 'Pin', value: 'Dual battery system (44 giờ)' },
    ],
    reviews: [],
    rating: 5
  },
  { 
    id: 'hp2', 
    category: 'headphone',
    brand: 'Logitech',
    name: 'Logitech G Pro X 2 Lightspeed Wireless Gaming Headset', 
    price: '5.990.000đ', 
    priceNumber: 5990000,
    images: ['https://anphat.com.vn/media/product/45885_logitech_g_pro_x_2_lightspeed__1_.jpg'],
    description: 'Tai nghe Logitech G Pro X 2 với graphene drivers 50mm và Blue VO!CE tech.',
    specs: [
      { label: 'Loại kết nối', value: 'Wireless Lightspeed + Bluetooth + 3.5mm' },
      { label: 'Driver', value: '50mm Graphene' },
      { label: 'Tần số', value: '20Hz - 20kHz' },
      { label: 'Micro', value: 'Detachable boom mic' },
      { label: 'Pin', value: 'Up to 50 giờ' },
    ],
    reviews: [],
    rating: 5
  },
  { 
    id: 'hp3', 
    category: 'headphone',
    brand: 'Razer',
    name: 'Razer BlackShark V2 Pro Wireless Gaming Headset', 
    price: '4.490.000đ', 
    priceNumber: 4490000,
    images: ['https://product.hstatic.net/1000129940/product/blackshark-v2-pro-wireless-1_ac2fa2ccb85d4874a4389a0a21d83af6_master.jpg'],
    description: 'Tai nghe Razer BlackShark V2 Pro với THX Spatial Audio và TriForce drivers.',
    specs: [
      { label: 'Loại kết nối', value: 'Wireless HyperSpeed + Bluetooth + 3.5mm' },
      { label: 'Driver', value: '50mm TriForce Titanium' },
      { label: 'Tần số', value: '12Hz - 28kHz' },
      { label: 'Micro', value: 'HyperClear Detachable' },
      { label: 'Pin', value: 'Up to 70 giờ' },
    ],
    reviews: [],
    rating: 5
  },
  { 
    id: 'hp4', 
    category: 'headphone',
    brand: 'HyperX',
    name: 'HyperX Cloud III Wireless Gaming Headset', 
    price: '3.790.000đ', 
    priceNumber: 3790000,
    images: ['https://bizweb.dktcdn.net/thumb/1024x1024/100/329/122/products/tai-nghe-gaming-khong-day-hyperx-cloud-iii-wireless-3.jpg?v=1752901154693'],
    description: 'Tai nghe HyperX Cloud III Wireless với âm thanh DTS:X Spatial Audio.',
    specs: [
      { label: 'Loại kết nối', value: 'Wireless 2.4GHz' },
      { label: 'Driver', value: '53mm Neodymium' },
      { label: 'Tần số', value: '10Hz - 21kHz' },
      { label: 'Micro', value: 'Detachable noise-cancelling' },
      { label: 'Pin', value: 'Up to 120 giờ' },
    ],
    reviews: [],
    rating: 4.5
  },
  { 
    id: 'hp5', 
    category: 'headphone',
    brand: 'Corsair',
    name: 'Corsair HS80 RGB Wireless Gaming Headset', 
    price: '3.290.000đ', 
    priceNumber: 3290000,
    images: ['https://assets.corsair.com/image/upload/c_pad,q_85,h_1100,w_1100,f_auto/products/Gaming-Headsets/CA-9011236-EU/Gallery/HS80_RGB_WIRELESS_WHITE_01.webp'],
    description: 'Tai nghe Corsair HS80 RGB với Dolby Atmos và thiết kế thoải mái.',
    specs: [
      { label: 'Loại kết nối', value: 'Wireless 2.4GHz + Wired' },
      { label: 'Driver', value: '50mm Neodymium' },
      { label: 'Tần số', value: '20Hz - 40kHz' },
      { label: 'Micro', value: 'Omnidirectional detachable' },
      { label: 'Pin', value: 'Up to 20 giờ' },
    ],
    reviews: [],
    rating: 4.5
  },
  { 
    id: 'hp6', 
    category: 'headphone',
    brand: 'ASUS',
    name: 'ASUS ROG Delta S Wireless Gaming Headset', 
    price: '4.990.000đ', 
    priceNumber: 4990000,
    images: ['https://dlcdnwebimgs.asus.com/files/media/6A881975-EAF7-4666-BD57-CE6D402C3EC2/v2/img/kv/rog-delta-s-wireless.png'],
    description: 'Tai nghe ASUS ROG Delta S với quad-DAC ESS và MQA rendering.',
    specs: [
      { label: 'Loại kết nối', value: 'Wireless 2.4GHz + Bluetooth + USB-C' },
      { label: 'Driver', value: '50mm Neodymium' },
      { label: 'Tần số', value: '20Hz - 40kHz' },
      { label: 'Micro', value: 'AI noise-cancelling detachable' },
      { label: 'Pin', value: 'Up to 25 giờ' },
    ],
    reviews: [],
    rating: 5
  },
  { 
    id: 'hp7', 
    category: 'headphone',
    brand: 'JBL',
    name: 'JBL Quantum ONE Gaming Headset', 
    price: '6.490.000đ', 
    priceNumber: 6490000,
    images: ['https://bcec.vn/upload/original-image/cdn1/images/202210/source_img/tai-nghe-jbl-quantum-810-P8246-1666839713979.jpg'],
    description: 'Tai nghe JBL Quantum ONE với JBL QuantumSPHERE 360 head tracking.',
    specs: [
      { label: 'Loại kết nối', value: 'Wired USB + 3.5mm' },
      { label: 'Driver', value: '50mm Hi-Res certified' },
      { label: 'Tần số', value: '20Hz - 40kHz' },
      { label: 'Micro', value: 'Boom mic with echo cancelling' },
      { label: 'Đèn RGB', value: 'RGB Lighting' },
    ],
    reviews: [],
    rating: 5
  },
];
