"use client";
import PlayerCard from "@/components/players/PlayerCard";
import PlayerDeleteModal from "@/components/players/PlayerDeleteModal";
import PlayerEditModal from "@/components/players/PlayerEditModal";
import { PlayerDataType } from "@/types";
import { useState, ChangeEvent, useEffect } from "react";


import firebaseConfig from "../../../firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
import { setCookie, parseCookies } from "nookies"; 

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);
// const analytics = getAnalytics(app);

interface NotificationProps {
  message: string;
  progress: number;
  success: boolean;
}

const Page = () => {
  const cookies = parseCookies(); // Read cookies using nookies
  const token = cookies.token;
  
  const [searchText, setSearchText] = useState<string>("");
  const [players, setPlayers] = useState<PlayerDataType[]>([]);
  const [editPlayerData, setEditPlayerData] = useState<{
    player: PlayerDataType;
    index: number;
  } | null>(null);
  const [isOpenedEditModal, setIsOpenedEditModal] = useState(false);
  const [isOpenedDeleteModal, setIsOpenedDeleteModal] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Saving data...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userUid = user.uid;
        const pageDataRef = ref(db, `adminData/${userUid}/players`);
        onValue(pageDataRef, (snapshot) => {
          try {
            const data = snapshot.val();
            if (data !== null) {
              if (Array.isArray(data)) {
                setPlayers(data);
              } else {
                console.error("Data is not in the expected format");
              }
            } else {
              console.error("No data found in the database");
            }
          } catch (error) {
            console.error("Error parsing data: ", error);
          }
        }, (error) => {
          console.error("Error retrieving data from Firebase: ", error);
        });
      } else {
        setPlayers([]);
      }
    });
  
    return () => {
      unsubscribe();
    };
  }, []);


  const handleAdd = () => {
    setEditPlayerData(null);
    setIsOpenedEditModal(true);
  };

  const handleEdit = (playerData: PlayerDataType, index: number) => {
    setEditPlayerData({
      player: playerData,
      index,
    });
    setIsOpenedEditModal(true);
  };

  const handleDeleteOpen = (playerData: PlayerDataType, index: number) => {
    setEditPlayerData({
      player: playerData,
      index,
    });
    setIsOpenedDeleteModal(true);
  };

  const handleClose = () => {
    setEditPlayerData(null);
    setIsOpenedEditModal(false);
    setIsOpenedDeleteModal(false);
  };

  const handleSubmit = (playerData: PlayerDataType) => {
    const prevPlayersData = structuredClone(players);
    if (editPlayerData) {
      const memberIndex = prevPlayersData?.findIndex(
        (_, i) => i === editPlayerData?.index,
      );

      if (memberIndex !== -1) {
        prevPlayersData[memberIndex] = playerData;
      }
      setPlayers(prevPlayersData);
      setEditPlayerData(null);
      setIsOpenedEditModal(false);
    } else {
      setPlayers([...prevPlayersData, playerData]);
      setIsOpenedEditModal(false);
    }
  };

  const handleDelete = () => {
    const prevPlayersData = structuredClone(players);
    const filteredPlayersData = prevPlayersData?.filter(
      (_, i) => i !== editPlayerData?.index,
    );
    setPlayers(filteredPlayersData);
    setEditPlayerData(null);
    setIsOpenedDeleteModal(false);
  };

  const handleSave = () => {
    const user = auth.currentUser;
    if (user) {
      setIsSaving(true);
      setProgress(0);
      setMessage("Saving data...");
      setSuccess(false);

      const userUid = user.uid;
      const userRef = ref(db, `adminData/${userUid}/players`);
      set(userRef, players)
      .then(() => {
        console.log("Page data saved successfully!");
        setProgress(100);
        setMessage("Data saved successfully! ✔️");
        setTimeout(() => {
          setSuccess(true);
          setTimeout(() => {
            setIsSaving(false);
          }, 3000); // Keep success message displayed for 3 seconds
        }, 1000); // Allow time for the progress bar to fill before hiding
      })
      .catch((error) => {
        console.error("Error saving page data: ", error);
        setIsSaving(false);
      });

    // Simulate progress bar
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 90) {
          return prevProgress + 10;
        } else {
          clearInterval(interval);
          return prevProgress;
        }
      });
    }, 300);
  } else {
    console.error("No user is currently signed in.");
  }
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {};

  const Notification = ({ message, progress, success }: NotificationProps) => {
    return (
      <div
        className={`fixed right-5 bottom-5 w-80 p-4 bg-green-600 text-white rounded shadow-lg transition-transform duration-700 ${
          success && "transform translate-x-full"
        }`}
      >
        <div>{message}</div>
        {!success && (
          <div className="w-full bg-green-200 h-2 rounded mt-2">
            <div
              className="bg-green-500 h-full rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (!token) {
        // router.push("/signin"); // Redirect to the sign-in page using Next.js's router
        window.location.href = "/signin";
      }
  }, [token]);

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-11 px-8">
      <div className="flex w-full flex-row items-center justify-between gap-10">
        {/* <div className="relative w-full max-w-[600px]">
          <span className="absolute left-4.5 top-4">
            <svg
              width="17"
              height="18"
              viewBox="0 0 17 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.18537 15.3707C12.1537 15.3707 15.3707 12.1537 15.3707 8.18537C15.3707 4.217 12.1537 1 8.18537 1C4.217 1 1 4.217 1 8.18537C1 12.1537 4.217 15.3707 8.18537 15.3707Z"
                stroke="#888888"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.1831 13.5562L16.0002 16.3659"
                stroke="#888888"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <input
            className="w-full rounded-[10px]  border border-[#C8B8B8] bg-white py-3 pl-11.5 pr-4.5 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-black "
            type="text"
            value={searchText}
            onChange={handleSearch}
            placeholder="Search by name"
          />
        </div> */}
        <button
          className=" flex items-center justify-center gap-4 rounded-[10px] bg-blue px-4 py-2 text-xs uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blue"
          type="button"
          onClick={handleAdd}
        >
          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5641 7.69672C13.6113 7.69672 15.2694 5.94262 15.2694 3.79508C15.2694 1.68033 13.6113 0 11.5641 0C9.53384 0 7.85886 1.70492 7.85886 3.81148C7.86732 5.95082 9.51692 7.69672 11.5641 7.69672ZM11.5641 6.2623C10.3967 6.2623 9.40695 5.18852 9.40695 3.81148C9.40695 2.46721 10.3882 1.43443 11.5641 1.43443C12.7484 1.43443 13.7213 2.45082 13.7213 3.79508C13.7213 5.17213 12.74 6.2623 11.5641 6.2623ZM11.5641 8.64754C10.0837 8.64754 8.7894 8.96721 7.71505 9.4918C8.12956 9.80328 8.49332 10.1803 8.7894 10.6148C9.56768 10.2869 10.4982 10.082 11.5641 10.082C15.2863 10.082 17.3758 12.418 17.3758 13.6721C17.3758 13.8197 17.2996 13.8852 17.0966 13.8852H9.91451C9.90606 14.3934 9.83838 14.8361 9.67765 15.3197H16.8344C18.2979 15.3197 19 14.8689 19 13.9016C19 11.6475 16.0984 8.64754 11.5641 8.64754ZM4.35663 18C6.72529 18 8.72173 16.082 8.72173 13.7705C8.72173 11.459 6.75067 9.54918 4.35663 9.54918C1.97106 9.54918 0 11.459 0 13.7705C0 16.0902 1.97106 18 4.35663 18ZM1.59884 13.7705C1.59038 13.4344 1.82725 13.2131 2.17409 13.2131H3.78139V11.6639C3.78139 11.3279 4.0098 11.0984 4.35663 11.0984C4.71193 11.0984 4.94034 11.3279 4.94034 11.6639V13.2131H6.54764C6.88602 13.2131 7.12289 13.4344 7.12289 13.7705C7.12289 14.1148 6.88602 14.3361 6.54764 14.3361H4.94034V15.8934C4.94034 16.2295 4.71193 16.4508 4.35663 16.4508C4.0098 16.4508 3.78139 16.2295 3.78139 15.8934V14.3361H2.17409C1.83571 14.3361 1.59884 14.1148 1.59884 13.7705Z"
              fill="white"
            />
          </svg>
          Add new player
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 h-full w-full gap-20">
        {players?.map((player, index) => (
          <PlayerCard
            key={`${player?.name}-${index}`}
            index={index}
            playerData={player}
            onDelete={handleDeleteOpen}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {isOpenedEditModal && (
        <PlayerEditModal
          isOpen={isOpenedEditModal}
          player={editPlayerData ? editPlayerData?.player : null}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      )}

      {isOpenedDeleteModal && (
        <PlayerDeleteModal
          isOpen={isOpenedDeleteModal}
          onClose={handleClose}
          onSubmit={handleDelete}
        />
      )}

      <div className="mt-7 flex w-full items-center justify-end gap-5">
        <button
          className=" rounded bg-red px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-red"
          type="button"
          onClick={handleSave}
          >
          Save
        </button>
      </div>
      {isSaving && (
        <Notification message={message} progress={progress} success={success} />
      )}
    </div>
  );
};

export default Page;
