export function BottomWarning({ label, buttonText, to }) {
    return (
      <div className="pt-2 text-sm flex justify-center">
        {label}
        <a className="pl-1 underline" href={to}>{buttonText}</a>
      </div>
    );
  }
  