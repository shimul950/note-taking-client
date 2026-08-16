interface TextInputProps {
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function TextInput({ type = "text", value, onChange, placeholder }: TextInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      className="w-full rounded-md border border-ink/20 dark:border-bone/20 bg-transparent px-4 py-2.5 outline-none focus:border-pine dark:focus:border-marker transition-colors"
    />
  );
}