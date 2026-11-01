
const StatsCard = ({ title, value, change, icon: Icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow min-h-40">

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <div className={`p-3 rounded-xl ${color}`}>
          <Icon size={21} />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-slate-900 mt-5">
        {value}
      </h2>

      <p className="text-xs text-slate-400 mt-2">
        {change}
      </p>

    </div>
  );
};

export default StatsCard;
