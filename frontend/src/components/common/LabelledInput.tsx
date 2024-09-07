
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
               <label className="text-md font-semibold mb-2 block text-gray-700">
                    {label}
               </label>
               <input
                    onChange={onChange}
                    value={value}
                    type={type}
                    name={name}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-700 text-md rounded-lg block w-full p-2.5"
               />
          </div>
     )
}