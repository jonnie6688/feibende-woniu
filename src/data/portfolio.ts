export interface HeroSlide {
  id: string;
  src: string;
  alt: string;
  label: string;
}

export interface MediaSlide {
  type: 'image' | 'video';
  src: string;
  poster?: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  media?: MediaSlide[];
  tags: string[];
}

export interface Skill {
  id: string;
  title: string;
  description: string;
  items: string[];
  icon: string;
}

export interface TimelineItem {
  year: string;
  stage: string;
  content: string;
}

export const personalInfo = {
  name: '飞奔的蜗牛',
  title: '视觉设计师 / AI设计师 / 品牌设计师',
  subtitle: 'AIGC 生成式 AI 实践者',
  intro:
    '年过半百仍对新技术抱有十足热忱，2022 年从零接触 Stable Diffusion 踏入 AIGC 赛道。两年多时间构建起覆盖 AI 图像、视频、大模型应用的完整能力体系。从不以年龄为学习设限，信奉活到老、学到老，在技术浪潮里做一名踏实的终身学习者。',
  email: '25118814@qq.com',
  wechat: 'bosotozp',
  location: '中国 · 上海',
  stats: [
    { label: '入行年限', value: '3+' },
    { label: '完成项目', value: '200+' },
    { label: '工作流模板', value: '50+' },
    { label: '模型训练', value: '30+' },
  ],
};

/** Hero 区右侧案例轮播 — 4 张精选作品图 */
export const heroSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    src: '/works-interior-collage.jpg',
    alt: '室内空间设计作品集九宫格',
    label: '空间渲染',
  },
  {
    id: 'slide-2',
    src: '/works-luxury-living.jpg',
    alt: 'AI 影视分镜：现代轻奢客餐厨一体化空间',
    label: 'AI 影视分镜',
  },
  {
    id: 'slide-3',
    src: '/works-sci-fi-storyboard.jpg',
    alt: '室内空间设计：科幻风格叙事场景',
    label: '室内空间设计',
  },
  {
    id: 'slide-4',
    src: '/works-vintage-wardrobe.jpg',
    alt: '法式复古衣帽间定制设计',
    label: '定制柜体',
  },
  {
    id: 'slide-5',
    src: '/works-anime.webp',
    alt: '动漫角色设计与制作',
    label: '动漫制作',
  },
  {
    id: 'slide-6',
    src: '/works-portrait.jpg',
    alt: '人像摄影：竹林旗袍写真',
    label: '人像摄影',
  },
];

export const projects: Project[] = [
  {
    id: 'p1',
    title: '小米 SU7 Ultra 广告视觉',
    category: '商业广告',
    description:
      '为小米 SU7 Ultra 打造的高品质汽车广告视频，金橙色车身赛道场景与觉醒的野兽主题结合，突出产品性能与科技美学。',
    image: '',
    media: [
      { type: 'video', src: '/tvc-xiaomi-1.mp4', poster: '/tvc-xiaomi-1.jpg', alt: '小米SU7 Ultra 金橙色赛道场景' },
      { type: 'video', src: '/tvc-xiaomi-2.mp4', poster: '/tvc-xiaomi-2.jpg', alt: '小米SU7 Ultra 觉醒的野兽主题' },
    ],
    tags: ['AI 视频', '汽车广告', '即梦', '商业项目'],
  },
  {
    id: 'p2',
    title: '游戏界面设计 — 黑神话风格',
    category: '游戏美术',
    description:
      '国风游戏 UI 界面设计，融合黑神话美学体系与古典东方元素，打造沉浸式主菜单与角色展示页面。',
    image: '',
    media: [
      { type: 'image', src: '/proj-game-1.jpg', alt: '苏妲己 主菜单界面' },
      { type: 'image', src: '/proj-game-2.jpg', alt: '潘金莲 角色选择界面' },
    ],
    tags: ['UI 设计', '国风游戏', '界面交互'],
  },
  {
    id: 'p3',
    title: '内衣品牌广告',
    category: '商业广告',
    description:
      '为内衣品牌定制的 AI 视频广告，注重场景氛围、光影质感与运镜节奏，呈现高级视觉调性。',
    image: '',
    media: [
      { type: 'video', src: '/tvc-underwear.mp4', poster: '/tvc-underwear.jpg', alt: '内衣品牌 AI 视频广告' },
    ],
    tags: ['AI 视频', '品牌广告', '即梦', '商业项目'],
  },
  {
    id: 'p4',
    title: '小牛电动车广告',
    category: '商业广告',
    description:
      '为小牛电动车打造的 AI 生成视频广告，结合城市场景与产品特性，突出科技感与出行生活方式。',
    image: '',
    media: [
      { type: 'video', src: '/tvc-niu-ev.mp4', poster: '/tvc-niu-ev.jpg', alt: '小牛电动车 AI 视频广告' },
    ],
    tags: ['AI 视频', '电动车广告', '即梦', '商业项目'],
  },
  {
    id: 'p5',
    title: '路亚装备广告',
    category: '商业广告',
    description:
      '为路亚钓鱼装备品牌制作的 AI 视频广告，展现户外运动场景与产品细节，融合自然光影与动感运镜。',
    image: '',
    media: [
      { type: 'video', src: '/tvc-luya.mp4', poster: '/tvc-luya.jpg', alt: '路亚装备 AI 视频广告' },
    ],
    tags: ['AI 视频', '运动装备', '即梦', '商业项目'],
  },
  {
    id: 'p6',
    title: '雅立全屋定制广告',
    category: '商业广告',
    description:
      '为雅立全屋定制品牌打造的品牌广告视频，围绕环保理念与家居场景，传递品质生活与绿色制造的品牌主张。',
    image: '',
    media: [
      { type: 'video', src: '/tvc-yali.mp4', poster: '/tvc-yali.jpg', alt: '雅立全屋定制环保篇广告' },
    ],
    tags: ['品牌广告', '全屋定制', '环保理念', '商业项目'],
  },
];

export const skills: Skill[] = [
  {
    id: 's1',
    title: 'AI 图像生成',
    description: '精通 Stable Diffusion 全系列模型的提示词工程、参数调优与精准出图',
    icon: '🖼️',
    items: [
      'Stable Diffusion 全系列 (SD1.5 / SDXL / Flux)',
      'ControlNet 全品类精准控制',
      'LoRA / DreamBooth 定制训练',
      '商业化出图全流程 (重绘 / 精修 / 超分)',
    ],
  },
  {
    id: 's2',
    title: 'ComfyUI 工作流',
    description: '精通节点化编程，可独立搭建从简单出图到复杂多模态的定制化工作流',
    icon: '⚙️',
    items: [
      '节点化工作流搭建与封装',
      'Impact Pack / AnimateDiff / IP-Adapter 等扩展',
      '批量出图 + 条件分支 + 循环逻辑',
      '标准化生产管线设计',
    ],
  },
  {
    id: 's3',
    title: 'AI 视频创作',
    description: '掌握主流 AI 视频方案，可实现多种视频效果与全链路制作',
    icon: '🎬',
    items: [
      'AnimateDiff / SVD 视频生成',
      '视频风格迁移 & 运镜优化',
      '帧插值 / 超分 / 去闪烁后处理',
      '长视频分段生成 + 后期拼接',
    ],
  },
  {
    id: 's4',
    title: '大模型 & 工具链',
    description: '熟悉本地部署与 API 调用，兼顾效果与运行效率',
    icon: '🧠',
    items: [
      '大模型本地部署 (LM Studio / Ollama)',
      '量化 & 推理加速优化',
      'Automatic1111 / Fooocus / ComfyUI',
      'Photoshop / 剪映 / Topaz 后期工具',
    ],
  },
];

export const timeline: TimelineItem[] = [
  {
    year: '2022',
    stage: '零基础入局',
    content:
      '50 岁接触 Stable Diffusion，从文生图基础起步，积累提示词工程与模型使用经验，打下扎实出图基础。',
  },
  {
    year: '2023',
    stage: '深度进阶',
    content:
      '全面转向 ComfyUI 节点化工作流，掌握 ControlNet、LoRA 训练、批量出图等进阶能力，实现从"会用"到"会搭"的跨越。',
  },
  {
    year: '2023-至今',
    stage: '全栈拓展',
    content:
      '持续跟进前沿模型，延伸至 AI 视频、大模型部署，探索多模态融合工作流，保持技术更新节奏。',
  },
];
