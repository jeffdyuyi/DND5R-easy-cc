import { SpeciesItem } from '../../types';

export const HUMAN: SpeciesItem = {
    id: "human-2024",
    name: "人类",
    source: "官方规则",
    description: "适应力\n技能\n多才多艺",
    fullDescription: "在整个多元宇宙中，人类因其数量庞大而各具特色。他们会努力在有限的岁月中取得尽可能多的成就。在许多世界里，他们的雄心壮志和足智多谋备都受赞扬、尊重和敬畏。\n人类的外貌就像地球上的人一样多样，他们也同样信奉许多的神祇。学者们对人类的起源争议不休，但据说已知最早的人类聚居地是在印记城，那座位于多元宇宙中心的环形城市，那座通用语诞生的城市。从那里开始，人类带着门之城的世界主义走到了多元宇宙的每个角落。",
    speed: 30,
    size: "中型或小型",
    darkvision: false,
    traits: [
        {
            name: "适应力 (Resourceful)",
            description: "每当你完成长休时，你都会获得英雄激励。"
        },
        {
            name: "技能 (Skillful)",
            description: "你获得一项自选的技能的熟练。"
        },
        {
            name: "多才多艺 (Versatile)",
            description: "你获得一项自选的起源专长。推荐选择【熟习】(Skilled)专长。"
        }
    ]
};
