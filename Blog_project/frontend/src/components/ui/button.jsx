export function Button({ children, onClick, variant = 'primary', className }) {
    const baseStyle = 'rounded-lg px-4 py-2 font-semibold';
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      outline: 'border border-gray-400 text-gray-800 bg-white hover:bg-gray-100',
      secondary: 'bg-gray-300 text-black hover:bg-gray-400',
      destructive: 'bg-red-500 text-white hover:bg-red-600',
    };
    return (
      <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className || ''}`}>
        {children}
      </button>
    );
  }
  