
interface LabelledInputProps {
     name: string;
     value: string | number | undefined;
     label: string;
     type: string;
     onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}
   
export  function LabelledInput({ onChange, value, name, type, label}: LabelledInputProps) {
     return (
          <div className="pb-2">
               <label className="text-md font-semibold block text-gray-700">
                    {label}
               </label>
               <input
                    type={type === "number" ? "text" : type}
                    inputMode={type === "number" ? "numeric" : undefined}
                    pattern={type === "number" ? "[0-9]*" : undefined}
                    onChange={onChange}
                    value={value}
                    name={name}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-700 text-md rounded-lg block w-full p-2.5"
               />
          </div>
     )
}