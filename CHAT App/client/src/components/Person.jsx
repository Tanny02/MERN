/* eslint-disable react/prop-types */
import Avatar from "./Avatar";

const Person = ({ id, onClick, selected, username, online }) => {
  return (
    <div
      key={id}
      onClick={() => onClick(id)}
      className={
        "border-b border-gray-100 flex gap-2 cursor-pointer " +
        ((selected && "bg-blue-50") || (!online && "bg-gray-200"))
      }
    >
      {selected && <div className="w-2 bg-blue-500 h-12 rounded-r-md"></div>}
      <div className="flex items-center gap-2 py-2 pl-4">
        <Avatar online={online} userId={id} username={username} />
        <span className="text-gray-800">{username}</span>
      </div>
    </div>
  );
};

export default Person;
