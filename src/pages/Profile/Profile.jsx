import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  const name = user?.displayName || 'Anonymous';
  const email = user?.email || 'No Email';
  const profileImage = user?.photoURL || 'https://via.placeholder.com/150';
  const phone = user?.phoneNumber || 'Not Provided';
  const uid = user?.uid || 'N/A';

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl bg-base-100 shadow-xl rounded-2xl p-8 flex flex-col md:flex-row gap-8">
        
        <div className="flex justify-center md:justify-start">
          <img
            src={profileImage}
            alt="Profile"
            className="w-48 h-48 rounded-full mask mask-squircle object-cover shadow-lg"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center gap-4">
          <h1 className="text-3xl font-bold text-base-content">{name}</h1>
          <p className="text-sm text-base-content/70">Email: {email}</p>
          <p className="text-sm text-base-content/70">Phone: {phone}</p>
          <p className="text-sm text-base-content/70">UID: {uid}</p>

          <div className="mt-6">
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl mt-8 bg-base-100 shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Account Info</h2>
        <ul className="space-y-2 text-sm text-base-content/70">
          <li><span className="font-semibold">Email Verified:</span> {user?.emailVerified ? 'Yes' : 'No'}</li>
          <li><span className="font-semibold">Last Sign-in:</span> {user?.metadata?.lastSignInTime || 'N/A'}</li>
          <li><span className="font-semibold">Account Created:</span> {user?.metadata?.creationTime || 'N/A'}</li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
