import { storage } from "../firebase";
import { ref, getDownloadURL } from "@firebase/storage";

const useProfilePhoto = async () => {
  const fetcheingUrl = async (uid) => {
    const storageRef = ref(storage, `profilePicture/${uid}`);

    const url = await getDownloadURL(storageRef);
    return url;
  };

  return fetcheingUrl;
};

export default useProfilePhoto;
