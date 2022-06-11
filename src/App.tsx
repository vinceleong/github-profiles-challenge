import { FormEvent, useCallback, useState } from "react";
import { Octokit } from "octokit";
import { motion, AnimatePresence } from "framer-motion";
import { IUser } from "interfaces";

import FeatherIcon from "components/FeatherIcon";
import AnimatedButton from "components/AnimatedButton";
import UserCard from "components/UserCard";

function App() {
  const [username, setUsername] = useState("");
  const [userList, setUserList] = useState<IUser[]>([]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!username) return alert("User name must not be empty!");
    try {
      const octokit = new Octokit({
        //auth: 'personal-access-token123'
      });

      const res = await octokit.request("GET /users/{username}", {
        username: username,
      });

      const { data } = res;

      if (!data) {
        return alert("User data not found!");
      }

      const userData: IUser = {
        id: data.id as string,
        name: data.name as string,
        loginName: data.login as string,
        avatarUrl: data.avatar_url as string,
        githubUrl: data.html_url as string,
        role: "",
        followersCount: data.followers as number,
        followingCount: data.following as number,
        publicReposCount: data.public_repos as number,
      };

      setUsername("");
      setUserList((userList) => [...userList, userData]);
    } catch (error) {
      alert(error);
    }
  };

  const handleRemoveUser = useCallback((userId: string) => {
    setUserList((userList) => userList.filter((user) => user.id !== userId));
  }, []);

  const handleSetRole = useCallback((userId: string, role: string) => {
    setUserList((userList) =>
      userList.map((user) => {
        if (user.id === userId) user.role = role;
        return user;
      })
    );
  }, []);

  const userInput = (
    <div className="w-full rounded-lg border-2 p-5">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row items-center">
          <input
            className="bg-transparent outline-0 focus:outline-none grow"
            placeholder="Enter user name.."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
          <div className="w-2" />
          <AnimatedButton>
            <button type="submit">Load User</button>
          </AnimatedButton>
        </div>
      </form>
    </div>
  );

  const resetButton = (
    <AnimatePresence>
      {userList.length > 0 && (
        <motion.div
          className="flex flex-row justify-end w-full py-5 pr-2"
          exit={{
            opacity: 0,
          }}
        >
          <AnimatedButton>
            <div
              className="flex flex-row items-center cursor-pointer"
              onClick={() => setUserList([])}
            >
              <span>Reset</span>
              <div className="w-2" />
              <FeatherIcon
                style={{
                  width: "20px",
                  height: "20px",
                }}
              >
                FiRotateCw
              </FeatherIcon>
            </div>
          </AnimatedButton>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="w-100">
      <div className="m-auto w-full md:w-1/3 p-5 md:min-w-[600px]">
        <h1 className="text-3xl text-center">Github Profiles</h1>
        <div className="mt-10 flex flex-col items-center">
          {userInput}
          {resetButton}
          <AnimatePresence>
            {userList.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                handleSetRole={handleSetRole}
                handleRemoveUser={handleRemoveUser}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
