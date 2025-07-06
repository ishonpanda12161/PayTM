
export function Button({ label, onClick }) {
    return (
      <button
        onClick={onClick}
        className="bg-black text-white px-4 py-2 rounded mt-4 w-full"
      >
        {label}
      </button>
    );
  }
  