
type InputProps = {
     name: string;
     placeholder: string;
     type: string;
     value: string;
     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Input({ name, placeholder, type, onChange, value }: InputProps) {
     return (
          <input onChange={onChange} value={value} type={type} name={name} className="my-2 rounded-md shadow-md border border-zinc-200 px-4 py-1.5" placeholder={placeholder}/>
     )
}