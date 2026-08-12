function TextInputWithLabel({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <>
      <label htmlFor={id}>{label}</label>

      <input
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default TextInputWithLabel;