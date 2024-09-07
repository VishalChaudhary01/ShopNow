import { categories } from "../common/productCategory";

interface SelectCategoryProps {
     name: string;
     label: string;
     value: string | undefined;
     onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export function SelectCategory({ name, label, value, onChange }: SelectCategoryProps) {
     return (
          <div className="mb-5">
          <div className="block mb-2 text-sm font-medium text-gray-900">
            { label }
          </div>
          <select
              name={name}
              value={value}
              onChange={onChange}
              className="rounded-md border border-gray-300 w-full p-2"
            >
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
        </div>
     )
}