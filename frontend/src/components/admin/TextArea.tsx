interface TextAreaProps {
     label: string;
     name: string;
     value: string | undefined;
     rows: number;
     onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}
export function TextArea({ label, name, value, rows, onChange }: TextAreaProps) {
     return (
          <div className="mb-5">
          <div className="block mb-2 text-sm font-medium text-gray-900">
            {label}
          </div>
          <textarea
            onChange={onChange}
            value={value}
            name={name}
            rows={rows}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
            placeholder="Write about product..."
          ></textarea>
        </div>
     )
}