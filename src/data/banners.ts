// src/data/banners.ts

export interface BannerType {
  id: string;
  title: string;
  image: string;
  description?: string;
}

export const BANNERS_DATA: BannerType[] = [
  {
    id: 'banner1',
    title: 'Giảm giá 50% RAM DDR5',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&h=400&fit=crop',
    description: 'Khuyến mãi hot nhất tháng',
  },
  {
    id: 'banner2',
    title: 'SSD 1TB chỉ từ 1.5 triệu',
    image: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=800&h=400&fit=crop',
    description: 'Nâng cấp PC ngay hôm nay',
  },
  {
    id: 'banner3',
    title: 'CPU Intel Gen 14 - Mới nhất',
    image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=400&fit=crop',
    description: 'Hiệu năng vượt trội',
  },
  {
    id: 'banner4',
    title: 'VGA RTX 4000 Series',
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&h=400&fit=crop',
    description: 'Gaming đỉnh cao',
  },
];
