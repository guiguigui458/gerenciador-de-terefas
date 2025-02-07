export function Card({ children, className }) {
    return (
      <div className={`p-4 border rounded shadow-sm bg-white ${className}`}>
        {children}
      </div>
    );
  }
  