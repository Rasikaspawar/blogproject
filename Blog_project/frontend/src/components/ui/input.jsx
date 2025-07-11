export function Input(props) {
    return (
      <input
        {...props}
        className={`border rounded-lg p-2 w-full ${props.className || ''}`}
      />
    );
  }
  