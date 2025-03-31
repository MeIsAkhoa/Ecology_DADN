import { ComponentPropsWithoutRef } from "react";

interface InputFieldProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, error, ...rest }) => {
  return (
    <div>
      <label className="block text-gray-700 font-medium">{label}</label>
      <input
        {...rest} // Truyền toàn bộ props vào input
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
