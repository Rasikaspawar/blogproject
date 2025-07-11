export function Textarea(props) {
    return (
      <textarea
        {...props}
        rows={4}
        className={`border rounded-lg p-2 w-full resize-none ${props.className || ''}`}
      />
    );
  }
  