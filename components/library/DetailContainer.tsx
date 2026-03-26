import { RichText } from '../RichText';

// --- Shared Types ---
export interface DetailContainerProps {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    headerColor?: string;
    bodyContent: React.ReactNode;
    footer?: React.ReactNode;
    accentColor?: string;
    fluid?: boolean;
}

// --- Helper: Mini Stat Card ---
export const MiniStatCard: React.FC<{ label: string; value: string | React.ReactNode; icon?: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="bg-white/80 border border-stone-200 rounded-lg p-2 md:p-3 shadow-sm flex flex-col items-center text-center group hover:border-stone-400 transition-all hover:shadow-md">
        {icon && <div className="text-stone-400 mb-1 group-hover:scale-110 transition-transform">{icon}</div>}
        <span className="text-[10px] text-stone-500 font-black uppercase tracking-widest">{label}</span>
        <span className="font-bold text-stone-800 text-sm md:text-base leading-tight mt-0.5">{value}</span>
    </div>
);

// --- Helper: Feature Card ---
export const FeatureCard: React.FC<{ title: string, level?: number, description: string, themeColor?: string }> = ({ title, level, description, themeColor = "stone" }) => {
    const colorMap: any = {
        red: "border-red-200 bg-red-50/30",
        blue: "border-blue-200 bg-blue-50/30",
        green: "border-green-200 bg-green-50/30",
        yellow: "border-yellow-200 bg-yellow-50/30",
        purple: "border-purple-200 bg-purple-50/30",
        stone: "border-stone-200 bg-stone-50/50"
    };

    const tagColorMap: any = {
        red: "bg-red-100 text-red-700",
        blue: "bg-blue-100 text-blue-700",
        green: "bg-green-100 text-green-700",
        yellow: "bg-yellow-100 text-yellow-700",
        purple: "bg-purple-100 text-purple-700",
        stone: "bg-stone-200 text-stone-600"
    };

    return (
        <div className={`border-2 ${colorMap[themeColor]} rounded-xl p-4 my-4 shadow-sm backdrop-blur-sm relative overflow-hidden group hover:shadow-md transition-shadow animate-fade-in`}>
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-5 pointer-events-none group-hover:scale-110 transition-transform ${tagColorMap[themeColor].split(' ')[0]}`}></div>

            <div className="flex items-center justify-between mb-3 relative z-10">
                <div className="flex items-center gap-2">
                    {level !== undefined && (
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-wider ${tagColorMap[themeColor]}`}>
                            等级 {level}
                        </span>
                    )}
                    <h4 className="font-black text-stone-800 text-lg tracking-tight">{title}</h4>
                </div>
                <div className="w-8 h-1 bg-stone-200 rounded-full group-hover:w-12 transition-all"></div>
            </div>
            <div className="text-sm text-stone-700 leading-relaxed relative z-10">
                <RichText text={description} />
            </div>
        </div>
    );
};

// --- Helper: Detail Footer ---
export const DetailFooter = ({ source }: { source: string }) => (
    <div className="w-full">
        <div className="flex justify-between w-full font-bold">
            <span>{source}</span>
            <span>不咕鸟制卡</span>
        </div>
        <div className="text-[8px] opacity-50 mt-1 text-center font-normal lowercase tracking-normal">
            数据来源: 5echm.kagangtuya.top
        </div>
    </div>
);

// --- Main Container ---
export const DetailContainer: React.FC<DetailContainerProps> = ({
    title,
    subtitle,
    icon,
    headerColor = "bg-stone-800",
    bodyContent,
    footer,
    accentColor = "border-stone-800",
    fluid = false
}) => {
    if (fluid) {
        return (
            <div className={`w-full max-w-6xl mx-auto bg-white border-b border-stone-200 shadow-sm font-sans flex flex-col min-h-screen animate-fade-in`}>
                {/* Fluid Header */}
                <div className={`${headerColor} text-white relative py-8 px-6 md:px-12 overflow-hidden shadow-lg border-b-2 ${accentColor}`}>
                    <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-9xl pointer-events-none select-none">
                        {title.charAt(0)}
                    </div>
                    <div className="flex items-center gap-6 relative z-10 max-w-4xl mx-auto">
                        <div className="p-4 bg-black/30 rounded-2xl shadow-xl backdrop-blur-md border border-white/20 scale-110 shrink-0">
                            {icon}
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-3xl md:text-5xl font-black tracking-tighter drop-shadow-md uppercase leading-tight">{title}</h1>
                            {subtitle && <div className="text-xs md:text-sm font-black uppercase tracking-[0.3em] opacity-80 pl-1">{subtitle}</div>}
                        </div>
                    </div>
                </div>

                {/* Fluid Body */}
                <div className="flex-grow bg-white p-6 md:p-12">
                    <div className="max-w-4xl mx-auto">
                        {bodyContent}
                    </div>
                </div>

                {/* Fluid Footer */}
                {footer && (
                    <div className="bg-stone-50 border-t border-stone-200 p-6">
                        <div className="max-w-4xl mx-auto text-stone-400 font-bold uppercase tracking-widest text-xs">
                            {footer}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Fallback to Card-like visual for smaller items (Spells, Items)
    return (
        <div className={`w-full max-w-lg md:max-w-xl lg:max-w-2xl mx-auto bg-white border-4 md:border-[6px] ${accentColor} rounded-xl overflow-hidden shadow-2xl my-4 font-serif flex flex-col h-auto min-h-[300px] md:min-h-[400px] animate-fade-in`}>
            <div className={`${headerColor} p-3 md:p-4 text-white border-b-4 ${accentColor} relative z-10`}>
                <div className="absolute top-0 right-0 p-1">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-bl-full absolute top-0 right-0"></div>
                </div>
                <div className="flex justify-between items-start relative z-10">
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="p-1.5 md:p-2 bg-black/30 rounded-lg shadow-inner border border-white/20">
                            {icon}
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-black tracking-wide leading-none uppercase drop-shadow-md">{title}</h2>
                            {subtitle && <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] opacity-90 mt-1">{subtitle}</div>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-4 md:p-5 bg-stone-50 text-stone-900 leading-relaxed text-sm flex-grow space-y-3 md:space-y-4">
                {bodyContent}
            </div>
            {footer && (
                <div className="bg-stone-900 text-stone-400 text-[9px] md:text-[10px] p-2 border-t-4 border-stone-800 flex flex-col items-center uppercase tracking-widest">
                    {footer}
                </div>
            )}
        </div>
    );
};
