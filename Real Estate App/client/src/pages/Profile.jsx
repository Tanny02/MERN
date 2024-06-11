import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase.js";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
} from "../redux/user/userSlice.js";

const Profile = () => {
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  const [file, setFile] = useState(undefined);
  const [percentage, setPercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  const { currentUser, loading, error } = useSelector((state) => state.user);

  const handleFileUpload = async (file) => {
    const storage = getStorage(app);

    const fileName = new Date().getTime() + file.name;

    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      alert("User updated successfully");
    } catch (error) {
      console.log(error);
      dispatch(updateUserFailure(error.message));
    }
  };

  const deleteUser = async () => {
    try {
      dispatch(deleteUserStart);
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      alert("User deleted successfully");
    } catch (error) {
      console.log(error);
      dispatch(deleteUserFailure(error.message));
    }
  };

  const signOut = async () => {
    alert("You've been signed out");
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          hidden
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formData.avatar || currentUser.avatar}
          alt="Avatar"
          className="rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error (Image size must be less than 2MB)
            </span>
          ) : percentage > 0 && percentage < 100 ? (
            <span className="text-slate-700">{`Uploading ${percentage}%`}</span>
          ) : percentage === 100 ? (
            <span className="text-green-700">Image uploaded successfully </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <p className="text-red-700 text-center mt-2">
        <i>{error ? error : ""}</i>
      </p>
      <div className="flex justify-between mt-2">
        <span
          className="text-red-700 bg-white p-2 rounded-lg cursor-pointer hover:bg-slate-700 hover:text-white"
          onClick={deleteUser}
        >
          Delete account
        </span>
        <span
          className="text-red-700 bg-white p-2 rounded-lg cursor-pointer hover:bg-slate-700 hover:text-white"
          onClick={signOut}
        >
          sign out
        </span>
      </div>
    </div>
  );
};

export default Profile;
