// Author-provided guidance, separate from parsed upstream rules.
const creation = [
    '选择角色的职业。职业会给予你生命值，有限可选的技能熟练和其他熟练项，官方推荐的加点思路，可选的初始装备组合，以及一堆需要你阅读的特性。你读得越多越细致，你的角色在冒险中就会越强大。',
    '选择角色的种族。种族会给与体型、基础速度、特殊的感官能力以及一堆需要你阅读的特性。部分世界设定下，不同种族还会有别样的扮演风味，可以咨询主持人了解。',
    '选择角色的背景。背景会固定给与两项技能熟练项目，5E时期可能会有额外的语言、熟练、扮演指南，而5E2024时期则干脆利落得给予属性加值以及起源专长。另有一堆初始道具和零钱。',
    '平衡扮演和功利地加加点，然后填写角色卡。DND5E2024给予了每个核心职业基础的数组配点，直接抄完再加上额外属性加值。单个属性值减去10后除以2，再向下取整，就是该属性的调整值，也是游戏中最长用到的值。',
    '核实角色获得的熟练项目，阅读角色能力。如果你的角色会施法，那请你慢慢为其挑选好符合施法规则的法术。',
    '更多的问题请看隔壁页面“规则”。',
];
const table = [
    '角色内：为所欲为，承担后果。',
    '角色外：享受游戏，但不要以影响他人为目的。',
    '先做朋友后跑团，遵守基本的社交礼仪。',
];
export function CharacterGuides() {
    return <div className="character-guides">{([['基德建卡指南', creation], ['基德面团指南', table]] as [string, string[]][]).map(([title, lines]) => <details key={title}><summary>{title}</summary><ol>{lines.map(line => <li key={line}>{line}</li>)}</ol></details>)}</div>;
}
