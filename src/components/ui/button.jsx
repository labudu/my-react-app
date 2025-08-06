export const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="bg-blue-500 hover:bg-blue-600 transition-colors text-white p-2 rounded"
    >
      {children}
    </button>
  );
};

