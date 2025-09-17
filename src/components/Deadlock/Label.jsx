const Label = ({ children, intent = "default" }) => {
  return (
    <span
      className={
        "px-2.5 py-1 rounded-full text-xs font-semibold " +
        (intent === "ok"
          ? "bg-green-700/60 text-green-200"
          : intent === "bad"
          ? "bg-red-700/60 text-red-200"
          : "bg-gray-700/60 text-gray-200")
      }
    >
      {children}
    </span>
  );
};

export default Label;
