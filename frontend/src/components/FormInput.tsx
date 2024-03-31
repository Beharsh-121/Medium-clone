import { ChangeEvent } from "react";

interface inputTemplateType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  }


  function FormInput({ label, placeholder, onChange }: inputTemplateType) {
    return (
      <div>
        <div className="my-1 text-base font-medium text-black-700 mt-2">
          <label className="font-bold">{label}</label>
        </div>
        <input
          onChange={onChange}
          placeholder={placeholder}
          required
          className="bg-gray-50 border border-gray-300 text-black-900 font-semiboldtext-base rounded-xl w-full p-2.5"
        />
      </div>
    );
  }


  export default FormInput