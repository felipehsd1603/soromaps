interface TriageFilterProps {
  selectedFilter: string | null;
  onFilterSelect: (filter: string) => void;
}

export function TriageFilter({ selectedFilter, onFilterSelect }: TriageFilterProps) {
  const options = [
    { id: 'snake', label: 'Cobra', color: 'bg-green-600' },
    { id: 'spider', label: 'Aranha', color: 'bg-blue-600' },
    { id: 'scorpion', label: 'Escorpião', color: 'bg-yellow-600' },
  ];

  return (
    <div className="w-full mb-6">
      <h3 className="text-xl font-bold text-gray-800 text-center mb-4">Qual animal causou o acidente?</h3>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onFilterSelect(option.id)}
            className={`
              flex-1 py-4 px-6 rounded-lg text-white font-bold text-xl shadow-md transition-transform active:scale-95
              ${option.color}
              ${selectedFilter === option.id ? 'ring-4 ring-offset-2 ring-gray-800 scale-105' : 'opacity-90 hover:opacity-100'}
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
