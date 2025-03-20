import { ComponentPropsWithoutRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  error?: string;
  register: UseFormRegisterReturn; // Nhận `register` thay vì `name`
}

const InputField: React.FC<InputFieldProps> = ({ label, error, register, ...rest }) => {
  return (
    <div>
      <label className="block text-gray-700 font-medium">{label}</label>
      <input
        {...register} // Truyền trực tiếp register vào input
        {...rest} 
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
