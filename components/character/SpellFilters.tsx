export function spellClasses(item: any): string[] {
    const value = item.fields?.classes ?? item.classes;
    return Array.isArray(value) ? value.filter((entry: unknown): entry is string => typeof entry === 'string') : [];
}
export function SpellFilters({ items, level, school, career, onChange }: { items: any[]; level: string; school: string; career: string; onChange: (field: 'level' | 'school' | 'career', value: string) => void }) {
    const schools = [...new Set(items.map(item => String(item.fields?.school || item.school || '未注明')))];
    const careers = [...new Set(items.flatMap(spellClasses))];
    return <div className="spell-combined-filters">
      {([
        ['level', '环位', level, Array.from({ length: 10 }, (_, i) => String(i))],
        ['school', '学派', school, schools],
        ['career', '职业', career, careers],
      ] as const).map(([field, label, current, values]) => <div className="spell-filter-row" role="group" aria-label={label} key={field}><span>{label}</span><div className="choice-chips">{['全部', ...values].map(value => <button type="button" key={value} aria-pressed={current === value} onClick={() => onChange(field, value)}>{field === 'level' && value !== '全部' ? value === '0' ? '戏法' : value + '环' : value}</button>)}</div></div>)}
    </div>;
}
