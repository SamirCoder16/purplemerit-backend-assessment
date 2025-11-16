import { User2Icon } from "lucide-react";
import { useState } from "react";

const UserCard = ({ user }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Adjust the threshold value to control the tilt effect
  const threshold = 12;

  const handleMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ x: y * -threshold, y: x * threshold });
  };

  return (
    <div
      className="rounded-xl shadow-xl overflow-hidden transition-transform duration-200 ease-out cursor-pointer max-w-80 bg-gray-100"
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      <h3 className="mt-3 px-4 pt-3 mb-1 text-lg font-semibold text-black">
        <User2Icon className="w-10 h-10 items-center text-black" />
        Name : {user.userName}
      </h3>
      <p className="text-sm px-4 text-black w-5/6">Email : {user.email}</p>
      <p className="text-sm px-4 pb-6 text-black w-5/6">Role : {user.role}</p>
    </div>
  );
};

// className="w-full h-52 object-cover"

export default UserCard;
