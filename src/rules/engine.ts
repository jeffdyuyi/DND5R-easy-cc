import { Modifier, ModifierType } from './modifiers';
import { AbilityKey, DerivedKey, StatKey } from './keys';

/**
 * 响应式规则计算引擎 (The Calculation Engine)
 * 职责：按特定顺序组合基础数值与修正值。
 */
export class RuleEngine {

    /**
     * 收集修正值逻辑 (Aggregation)
     * 从选中的种族、背景、职业、物品中聚合所有 Modifiers。
     */
    static collectAllModifiers(state: any, _library: any): Modifier[] {
        const allMods: Modifier[] = [];

        // 1. 注入背景加值 (2024 版背景 ASI)
        if (state.backgroundAsi) {
            allMods.push({
                id: 'bg-asi-1',
                target: state.backgroundAsi.target1,
                type: ModifierType.ADD,
                value: state.backgroundAsi.value1,
                sourceId: state.backgroundId,
                sourceName: '背景加值',
                sourceType: 'background',
                priority: 0,
                isActive: true
            });
            // ... 处理 target2, target3
        }

        // 2. 注入装备加值 (过滤 isEquipped = true)
        // 3. 注入职业特性/种族特性

        return allMods;
    }

    /**
     * 核心计算器：计算单一数值
     * 顺序原则：Base -> Add/Sub -> Multiply -> Min/Max -> Override
     */
    static resolveStat(baseValue: number, target: StatKey, modifiers: Modifier[]): number {
        let result = baseValue;
        const modsForTarget = modifiers.filter(m => m.target === target && m.isActive);

        // 1. 处理加/减算 (Add/Sub)
        modsForTarget
            .filter(m => m.type === ModifierType.ADD || m.type === ModifierType.SUB)
            .forEach(m => {
                result += (typeof m.value === 'number') ? m.value : 0;
            });

        // 2. 处理乘算 (Multiply)
        modsForTarget
            .filter(m => m.type === ModifierType.MULTIPLY)
            .forEach(m => {
                result *= (typeof m.value === 'number') ? m.value : 1;
            });

        // 3. 处理覆盖 (Override) - 优先级最高的胜出
        const overrides = modsForTarget.filter(m => m.type === ModifierType.OVERRIDE);
        if (overrides.length > 0) {
            const highest = overrides.sort((a, b) => b.priority - a.priority)[0];
            result = (typeof highest.value === 'number') ? highest.value : result;
            // 注意：某些 OVERRIDE 可能是公式字符串，需另外解析
        }

        return Math.floor(result);
    }

    /**
     * 具体业务：计算六围最终值
     */
    static calculateAbilities(base: Record<AbilityKey, number>, modifiers: Modifier[]) {
        const finalAbilities: Partial<Record<AbilityKey, number>> = {};

        Object.values(AbilityKey).forEach(key => {
            finalAbilities[key as AbilityKey] = this.resolveStat(base[key as AbilityKey], key, modifiers);
        });

        return finalAbilities as Record<AbilityKey, number>;
    }

    /**
     * 具体业务：计算最大生命值 (HP Max)
     * 2024 规则: 初始 (Class Hit Die) + (CON Mod * Level) + (后续升级 HP)
     */
    static calculateMaxHP(level: number, hitDie: number, conModifier: number, modifiers: Modifier[]): number {
        // 初始生命值 (1级)
        let baseHp = hitDie + conModifier;

        // 升级生命值 (假设采用平均值，2024 版通常为 HitDie/2 + 1)
        if (level > 1) {
            baseHp += ((hitDie / 2) + 1 + conModifier) * (level - 1);
        }

        // 叠加外部修正值 (如 Tough 专长: HP + 2*Level)
        return this.resolveStat(baseHp, DerivedKey.HP_MAX, modifiers);
    }
}
