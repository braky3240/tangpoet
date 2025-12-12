import { Poet, TangEra, EraColor } from './types';

export const ERA_COLORS: Record<TangEra, EraColor> = {
  [TangEra.EARLY]: { bg: 'bg-[#F8CE58]', text: 'text-[#F8CE58]', hex: '#F8CE58' },
  [TangEra.HIGH]: { bg: 'bg-[#82C272]', text: 'text-[#82C272]', hex: '#82C272' },
  [TangEra.MIDDLE]: { bg: 'bg-[#6CA6DB]', text: 'text-[#6CA6DB]', hex: '#6CA6DB' },
  [TangEra.LATE]: { bg: 'bg-[#B4A5D2]', text: 'text-[#B4A5D2]', hex: '#B4A5D2' },
};

// Data manually transcribed to match the visual order and approximate dates from the reference image
export const POETS_DATA: Poet[] = [
  { id: '1', name: '卢照邻', description: '初唐四杰之一', start: 635, end: 689, era: TangEra.EARLY },
  { id: '2', name: '骆宾王', description: '初唐四杰，《咏鹅》', start: 640, end: 684, era: TangEra.EARLY },
  { id: '3', name: '王勃', description: '初唐四杰，《滕王阁序》', start: 650, end: 676, era: TangEra.EARLY },
  { id: '4', name: '杨炯', description: '初唐四杰之一，辞采俊逸', start: 650, end: 693, era: TangEra.EARLY },
  { id: '5', name: '贺知章', description: '诗风清新通俗，《咏柳》', start: 659, end: 744, era: TangEra.EARLY },
  { id: '6', name: '张若虚', description: '《春江花月夜》"孤篇横绝"', start: 660, end: 720, era: TangEra.EARLY },
  { id: '7', name: '陈子昂', description: '倡导古风，反对绮靡文风', start: 661, end: 702, era: TangEra.EARLY },
  
  { id: '8', name: '张九龄', description: '政治家、名相，诗文俱佳', start: 678, end: 740, era: TangEra.HIGH },
  { id: '9', name: '王之涣', description: '边塞诗人，《登鹳雀楼》', start: 688, end: 742, era: TangEra.HIGH },
  { id: '10', name: '孟浩然', description: '山水田园派代表', start: 689, end: 740, era: TangEra.HIGH },
  { id: '11', name: '王昌龄', description: '"七绝圣手"，边塞诗与宫怨诗', start: 698, end: 756, era: TangEra.HIGH },
  { id: '12', name: '王维', description: '诗画合一，"诗佛"，山水田园诗人', start: 701, end: 761, era: TangEra.HIGH },
  { id: '13', name: '李白', description: '"诗仙"，浪漫主义高峰', start: 701, end: 762, era: TangEra.HIGH },
  { id: '14', name: '高适', description: '边塞诗派代表', start: 704, end: 765, era: TangEra.HIGH },
  { id: '15', name: '杜甫', description: '"诗圣"，现实主义高峰', start: 712, end: 770, era: TangEra.HIGH },
  { id: '16', name: '岑参', description: '边塞诗豪放奇峭', start: 715, end: 770, era: TangEra.HIGH },
  
  { id: '17', name: '韦应物', description: '山水田园诗人，《滁州西涧》', start: 737, end: 792, era: TangEra.MIDDLE },
  { id: '18', name: '李益', description: '边塞诗人，七绝名家，《江南曲》', start: 748, end: 829, era: TangEra.MIDDLE },
  { id: '19', name: '孟郊', description: '"郊寒岛瘦"，代表作《游子吟》', start: 751, end: 814, era: TangEra.MIDDLE },
  { id: '20', name: '韩愈', description: '古文运动领袖，"文起八代之衰"', start: 768, end: 824, era: TangEra.MIDDLE },
  { id: '21', name: '白居易', description: '"诗魔"，新乐府运动领袖', start: 772, end: 846, era: TangEra.MIDDLE },
  { id: '22', name: '刘禹锡', description: '"诗豪"，诗文并茂', start: 772, end: 842, era: TangEra.MIDDLE },
  { id: '23', name: '李绅', description: '新乐府运动参与者，《悯农二首》', start: 772, end: 846, era: TangEra.MIDDLE },
  { id: '24', name: '柳宗元', description: '山水游记与诗歌皆精', start: 773, end: 819, era: TangEra.MIDDLE },
  { id: '25', name: '元稹', description: '与白居易并称"元白"，新乐府运动倡导者', start: 779, end: 831, era: TangEra.MIDDLE },
  { id: '26', name: '贾岛', description: '"推敲"典故来源，"郊寒岛瘦"', start: 779, end: 843, era: TangEra.MIDDLE },
  { id: '27', name: '李贺', description: '"诗鬼"，中唐浪漫主义代表', start: 790, end: 816, era: TangEra.MIDDLE },
  
  { id: '28', name: '杜牧', description: '与李商隐并称"小李杜"，七绝成就高', start: 803, end: 852, era: TangEra.LATE },
  { id: '29', name: '温庭筠', description: '花间派鼻祖，诗词兼工', start: 812, end: 866, era: TangEra.LATE },
  { id: '30', name: '李商隐', description: '晚唐大家，"小李杜"，咏史诗精深婉丽', start: 813, end: 858, era: TangEra.LATE },
  { id: '31', name: '罗隐', description: '晚唐至五代之交诗人', start: 833, end: 909, era: TangEra.LATE },
  { id: '32', name: '陆龟蒙', description: '与皮日休并称"皮陆"，隐逸诗人', start: 845, end: 881, era: TangEra.LATE }, // Approximate
  { id: '33', name: '皮日休', description: '与陆龟蒙并称"皮陆"，现实主义诗人', start: 834, end: 883, era: TangEra.LATE }, // Approximate
];

// Configuration for the chart
export const START_YEAR = 630;
export const END_YEAR = 930;
export const ROW_HEIGHT = 28; // Vertical spacing per poet
export const BAR_HEIGHT = 8; // Height of the colored bar
export const TOP_PADDING = 50;
export const LEFT_PADDING = 20;
export const RIGHT_PADDING = 200; // Extra space for long descriptions
