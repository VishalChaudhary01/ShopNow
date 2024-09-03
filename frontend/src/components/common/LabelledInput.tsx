
interface LabelledInputProps {
     name: string;
     value: string | number | undefined;
     label: string;
     type: string;
     onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}
   
export  function LabelledInput({ onChange, value, name, type, label}: LabelledInputProps) {
     return (
          <div className="mb-5">
               <label className="block mb-2 text-sm font-medium text-gray-900">
                    {label}
               </label>
               <input
                    onChange={onChange}
                    value={value}
                    type={type}
                    name={name}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    required
               />
          </div>
     )
}