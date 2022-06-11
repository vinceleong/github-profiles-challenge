import { motion } from "framer-motion";
import { IUser } from "interfaces";
import { useState } from "react";

import FeatherIcon from "components/FeatherIcon";
import InfoRow from "./InfoRow";

function UserCard({
  user,
  handleRemoveUser,
  handleSetRole,
}: {
  user: IUser;
  handleRemoveUser?: (userId: string) => void;
  handleSetRole?: (userId: string, role: string) => void;
}) {
  const cardAnimVariants = {
    initial: {
      opacity: 0,
      x: -50,
    },
    enter: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
    },
    hover: {
      scale: 1.1,
    },
  };

  const [role, setRole] = useState(user.role);
  const [isEditingRole, setIsEditingRole] = useState(false);

  const editRole = (
    <div className="flex flex-row">
      <input
        className="border-2 px-2 rounded-lg outline-0 focus:outline-none "
        value={role}
        onChange={(e) => setRole(e.target.value)}
        onBlur={() => {
          if (handleSetRole && user.id) {
            handleSetRole(user.id, role || "");
          }
          setIsEditingRole(false);
        }}
        autoFocus
      />
    </div>
  );

  const content = (
    <div className="w-full">
      <div className="font-bold">{user.name || user.loginName}</div>
      <div className="h-3" />
      <InfoRow
        icon="link"
        content={
          <a
            className="text-sm cursor-pointer hover:underline"
            href={user.githubUrl}
            target="blank"
          >
            {user.githubUrl}
          </a>
        }
      />
      <div className="h-3" />
      <InfoRow
        icon="FiBarChart2"
        content={
          <div className="flex flex-row items-center">
            <div className="flex flex-row items-center">
              <span className="text-sm">{`${user.publicReposCount} Public Repos`}</span>
            </div>
            <div className="w-5" />
            <div className="flex flex-row items-center">
              <span className="text-sm">{`${user.followersCount} Followers`}</span>
            </div>
          </div>
        }
      />
      <div className="h-3" />
      <div className="flex flex-row items-center">
        {user.role && !isEditingRole && (
          <InfoRow
            icon="user"
            content={<span className="text-sm">{user.role}</span>}
          />
        )}
        <div className="flex flex-row items-center">
          {!isEditingRole && (
            <button onClick={() => setIsEditingRole(true)}>
              {role ? (
                <>
                  <FeatherIcon
                    className="ml-3"
                    style={{
                      height: "15px",
                      width: "15px",
                    }}
                  >
                    edit
                  </FeatherIcon>
                </>
              ) : (
                <span className="text-indigo-800">Add Role</span>
              )}
            </button>
          )}
        </div>
      </div>
      {isEditingRole && editRole}
      <div className="flex flex-row justify-end">
        <button
          onClick={() => {
            if (handleRemoveUser && user.id) handleRemoveUser(user.id);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );

  return (
    <motion.div
      variants={cardAnimVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      whileHover="hover"
      className="w-full rounded-lg border-2 p-5 mb-5"
    >
      <div className="flex flex-row">
        {user.avatarUrl && (
          <img
            alt={user.avatarUrl}
            className="rounded-full h-12 w-12"
            src={user.avatarUrl}
          />
        )}
        <div className="w-5" />
        {content}
      </div>
    </motion.div>
  );
}

export default UserCard;
