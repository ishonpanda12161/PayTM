
export function InputBox({label,placeholder,onChange}) 
{
    return (
        <div className="pt-2">
           <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      <input 
        type="text"
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-200"
        onChange={e=> onChange(e.target.value)}
        ></input>
        </div>
    );
}