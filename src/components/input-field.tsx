import { ComponentPropsWithoutRef } from "react";

interface InputFieldProps extends Omit<ComponentPropsWithoutRef<"input">, "name"> {
  label: string;
  name: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, error, ...rest }) => {
  return (
    <div>
      <label className="block text-gray-700 font-medium">{label}</label>
      <input
        {...rest} 
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
