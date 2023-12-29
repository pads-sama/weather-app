import "./TextInput.css";
const TextInput = ({ type, id, name }) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      className="w-full px-5 py-2 rounded-3xl outline-gray-100 text-lg "
    />
  );
};

export default TextInput;
