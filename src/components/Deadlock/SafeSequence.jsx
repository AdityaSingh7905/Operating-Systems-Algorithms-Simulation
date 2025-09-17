import Label from "./Label";

const SafeSequence = ({ title, vec }) => {
  return (
    <div>
      <div className="text-sm mb-2 text-gray-300">{title}</div>
      <div className="flex flex-wrap gap-2">
        {vec?.map((v, i) => (
          <Label key={i}>{v}</Label>
        ))}
      </div>
    </div>
  );
};

export default SafeSequence;
