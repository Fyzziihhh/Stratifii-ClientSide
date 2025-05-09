export const InputField = ({
  icon: Icon,
  label,
  value,
  name,
  isEditing,
  handleChange,
  placeholder,
}: {
  icon: React.ComponentType<{ size: number }>;
  label: string;
  value: string;
  name: string;
  isEditing: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) => {
  return (
    <div className="mb-6">
      <label className="text-gray-400 text-sm font-medium mb-2 flex items-center gap-2">
        <Icon size={18} />
        {label}
      </label>
      {isEditing ? (
        <input
          type="text"
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500 transition-colors"
        />
      ) : (
        <div className="text-white bg-gray-900 rounded-lg px-4 py-2">
          {value?.length > 1 ? value : placeholder}
        </div>
      )}
    </div>
  );
};
