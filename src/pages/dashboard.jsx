// import { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { supabase } from '../utils/supabaseClient';

// const Dashboard = () => {
//   const { user, signOut } = useAuth();
//   const [groups, setGroups] = useState([]);
//   const [newGroup, setNewGroup] = useState({ name: '', description: '' });

//   const fetchGroups = async () => {
//     const { data, error } = await supabase.from('groups').select('*');
//     if (error) console.error(error);
//     else setGroups(data);
//   };

//   const createGroup = async () => {
//     const { name, description } = newGroup;
//     const { error } = await supabase
//       .from('groups')
//       .insert([{ name, description, owner_id: user.id }]);

//     if (error) console.error(error);
//     else {
//       setNewGroup({ name: '', description: '' });
//       fetchGroups();
//     }
//   };

//   useEffect(() => {
//     fetchGroups();
//   }, []);

//   const handleLogout = async () => {
//     await signOut();
//   };const fetchNotifications = async () => {
//     const { data, error } = await fetch(`/api/groups/notifications?userId=${user.id}&groupId=${groupId}`);
//     if (error) console.error(error);
//     else setNotifications(data);
//   };
  
//   useEffect(() => {
//     fetchNotifications();
//     const interval = setInterval(fetchNotifications, 5000); // Poll every 5 seconds
//     return () => clearInterval(interval);
//   }, []);
  

//   return (
//     <div className="min-h-screen p-8 bg-gray-100">
//       <div className="mb-8 flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Welcome, {user?.email}!</h1>
//         <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
//           Logout
//         </button>
//       </div>

//       <div className="mb-6">
//         <h2 className="text-2xl font-bold mb-4">Create a New Group</h2>
//         <input
//           type="text"
//           placeholder="Group Name"
//           value={newGroup.name}
//           onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
//           className="border p-2 w-full mb-2"
//         />
//         <textarea
//           placeholder="Group Description"
//           value={newGroup.description}
//           onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
//           className="border p-2 w-full mb-2"
//         />
//         <button onClick={createGroup} className="bg-blue-500 text-white px-4 py-2 rounded">
//           Create Group
//         </button>
//       </div>

//       <div>
//         <h2 className="text-2xl font-bold mb-4">Available Groups</h2>
//         <ul>
//           {groups.map((group) => (
//             <li key={group.id} className="border p-4 mb-2 rounded bg-white shadow">
//               <h3 className="text-xl font-bold">{group.name}</h3>
//               <p>{group.description}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div>
//   <h2 className="text-2xl font-bold mb-4">Groups</h2>
//   {groups.map((group) => (
//     <div key={group.id} className="flex justify-between items-center">
//       <h3>{group.name}</h3>
//       {notifications[group.id]?.length > 0 && (
//         <span className="text-red-500">{notifications[group.id].length} new</span>
//       )}
//       <a href={`/groups/${group.id}`} className="text-blue-500">Join</a>
//     </div>
//   ))}
// </div>

//     </div>
//   );
// };

// export default Dashboard;

// import { useAuth } from '../contexts/AuthContext';
// import { useEffect, useState } from 'react';
// import { supabase } from '../utils/supabaseClient';

// const Dashboard = () => {
//   const { user, loading } = useAuth();
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (user) {
//         const { data, error } = await supabase
//           .from('profiles') // Assuming you have a 'profiles' table
//           .select('id, name, avatar')
//           .eq('id', user.id)
//           .single();
        
//         if (error) {
//           console.error(error.message);
//         } else {
//           setProfile(data);
//         }
//       }
//     };

//     if (!loading && user) {
//       fetchProfile();
//     }
//   }, [user, loading]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Welcome to your dashboard, {profile?.name || user?.email}</h1>
//       <p>Email: {user?.email}</p>
//       {profile?.avatar && <img src={profile.avatar} alt="User Avatar" />}
//       {/* Add more personalized user info */}
//     </div>
//   );
// };

// export default Dashboard;



// import { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { supabase } from '../utils/supabaseClient';

// const Dashboard = () => {
//   const { user, signOut } = useAuth();
//   const [groups, setGroups] = useState([]);
//   const [newGroup, setNewGroup] = useState({ name: '', description: '' });
//   const [notifications, setNotifications] = useState({});

//   const fetchGroups = async () => {
//     const { data, error } = await supabase.from('groups').select('*');
//     if (error) console.error(error);
//     else setGroups(data);
//   };

//   const createGroup = async () => {
//     const { name, description } = newGroup;
//     const { error } = await supabase
//       .from('groups')
//       .insert([{ name, description, owner_id: user.id }]);

//     if (error) console.error(error);
//     else {
//       setNewGroup({ name: '', description: '' });
//       fetchGroups();
//     }
//   };

//   const fetchNotifications = async () => {
//     if (!user) return; // If no user is logged in, don't fetch notifications
//     const { data, error } = await fetch(`/api/groups/notifications?userId=${user.id}`);
//     if (error) console.error(error);
//     else setNotifications(data);
//   };

//   useEffect(() => {
//     if (user) {
//       fetchGroups();
//       fetchNotifications();
//       const interval = setInterval(fetchNotifications, 5000); // Poll every 5 seconds
//       return () => clearInterval(interval);
//     }
//   }, [user]);

//   const handleLogout = async () => {
//     await signOut();
//   };

//   return (
//     <div className="min-h-screen p-8 bg-gray-100">
//       <div className="mb-8 flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Welcome, {user?.email}!</h1>
//         <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
//           Logout
//         </button>
//       </div>

//       <div className="mb-6">
//         <h2 className="text-2xl font-bold mb-4">Create a New Group</h2>
//         <input
//           type="text"
//           placeholder="Group Name"
//           value={newGroup.name}
//           onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
//           className="border p-2 w-full mb-2"
//         />
//         <textarea
//           placeholder="Group Description"
//           value={newGroup.description}
//           onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
//           className="border p-2 w-full mb-2"
//         />
//         <button onClick={createGroup} className="bg-blue-500 text-white px-4 py-2 rounded">
//           Create Group
//         </button>
//       </div>

//       <div>
//         <h2 className="text-2xl font-bold mb-4">Available Groups</h2>
//         <ul>
//           {groups.map((group) => (
//             <li key={group.id} className="border p-4 mb-2 rounded bg-white shadow">
//               <h3 className="text-xl font-bold">{group.name}</h3>
//               <p>{group.description}</p>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <h2 className="text-2xl font-bold mb-4">Groups</h2>
//         {groups.map((group) => (
//           <div key={group.id} className="flex justify-between items-center">
//             <h3>{group.name}</h3>
//             {notifications[group.id]?.length > 0 && (
//               <span className="text-red-500">{notifications[group.id].length} new</span>
//             )}
//             <a href={`/groups/${group.id}`} className="text-blue-500">Join</a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { supabase } from '../utils/supabaseClient';

// const Dashboard = () => {
//   const { user, signOut } = useAuth();
//   const [groups, setGroups] = useState([]);
//   const [newGroup, setNewGroup] = useState({ name: '', description: '' });
//   const [notifications, setNotifications] = useState({});

//   const fetchGroups = async () => {
//     const { data, error } = await supabase.from('groups').select('*');
//     if (error) console.error(error);
//     else setGroups(data);
//   };

//   const createGroup = async () => {
//     if (!user) {
//       console.error("User is not authenticated.");
//       return; // Don't proceed if there's no user
//     }

//     const { name, description } = newGroup;

//     const { error } = await supabase
//       .from('groups')
//       .insert([{ name, description, owner_id: user.id }]);

//     if (error) {
//       console.error("Error creating group: ", error.message);
//     } else {
//       setNewGroup({ name: '', description: '' });
//       fetchGroups(); // Refresh the groups list after creation
//     }
//   };

//   const fetchNotifications = async () => {
//     if (!user) return; // If no user is logged in, don't fetch notifications
//     const { data, error } = await fetch(`/api/groups/notifications?userId=${user.id}`);
//     if (error) console.error(error);
//     else setNotifications(data);
//   };

//   useEffect(() => {
//     if (user) {
//       fetchGroups();
//       fetchNotifications();
//       const interval = setInterval(fetchNotifications, 5000); // Poll every 5 seconds
//       return () => clearInterval(interval);
//     }
//   }, [user]);

//   const handleLogout = async () => {
//     await signOut();
//   };

//   return (
//     <div className="min-h-screen p-8 bg-gray-100">
//       <div className="mb-8 flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Welcome, {user?.email}!</h1>
//         <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
//           Logout
//         </button>
//       </div>

//       <div className="mb-6">
//         <h2 className="text-2xl font-bold mb-4">Create a New Group</h2>
//         <input
//           type="text"
//           placeholder="Group Name"
//           value={newGroup.name}
//           onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
//           className="border p-2 w-full mb-2"
//         />
//         <textarea
//           placeholder="Group Description"
//           value={newGroup.description}
//           onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
//           className="border p-2 w-full mb-2"
//         />
//         <button onClick={createGroup} className="bg-blue-500 text-white px-4 py-2 rounded">
//           Create Group
//         </button>
//       </div>

//       <div>
//         <h2 className="text-2xl font-bold mb-4">Available Groups</h2>
//         <ul>
//           {groups.map((group) => (
//             <li key={group.id} className="border p-4 mb-2 rounded bg-white shadow">
//               <h3 className="text-xl font-bold">{group.name}</h3>
//               <p>{group.description}</p>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <h2 className="text-2xl font-bold mb-4">Groups</h2>
//         {groups.map((group) => (
//           <div key={group.id} className="flex justify-between items-center">
//             <h3>{group.name}</h3>
//             {notifications[group.id]?.length > 0 && (
//               <span className="text-red-500">{notifications[group.id].length} new</span>
//             )}
//             <a href={`/groups/${group.id}`} className="text-blue-500">Join</a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../utils/supabaseClient';
import Link from 'next/link';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState({ name: '', description: '' });
  const [notifications, setNotifications] = useState({});

  // Fetch groups that the user is part of
  const fetchGroups = async () => {
    if (!user) return; // Don't fetch if user is not authenticated

    const { data, error } = await supabase
      .from('groups')
      .select('id, name, description, created_at, created_by')
      .eq('created_by', user.id); // Filter by the user who created the group (optional)

    if (error) {
      console.error("Error fetching groups:", error.message);
    } else {
      setGroups(data); // Store the fetched groups in state
    }
  };

  const createGroup = async () => {
    if (!user) {
      console.error("User is not authenticated.");
      return; // Prevent group creation if user is not authenticated
    }

    const { name, description } = newGroup;

    const { error } = await supabase
      .from('groups')
      .insert([{ name, description, created_by: user.id }]); // Add the user as the creator of the group

    if (error) {
      console.error("Error creating group: ", error.message);
    } else {
      setNewGroup({ name: '', description: '' });
      fetchGroups(); // Refresh the group list after creating a new one
    }
  };

  // Fetch notifications (for any new messages, etc.)
  const fetchNotifications = async () => {
    if (!user) return; // Don't fetch notifications if user is not logged in
    const { data, error } = await fetch(`/api/groups/notifications?userId=${user.id}`);
    if (error) console.error(error);
    else setNotifications(data);
  };

  // Fetch groups and notifications when the component mounts or user changes
  useEffect(() => {
    if (user) {
      fetchGroups(); // Fetch groups when user is available
      fetchNotifications(); // Fetch notifications for the user
      const interval = setInterval(fetchNotifications, 5000); // Poll every 5 seconds for notifications
      return () => clearInterval(interval); // Clean up interval on unmount
    }
  }, [user]); // Re-run when the user changes

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome, {user?.email}!</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Create a New Group</h2>
        <input
          type="text"
          placeholder="Group Name"
          value={newGroup.name}
          onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <textarea
          placeholder="Group Description"
          value={newGroup.description}
          onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <button onClick={createGroup} className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Group
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Available Groups</h2>
        <ul>
          {groups.map((group) => (
            <li key={group.id} className="border p-4 mb-2 rounded bg-white shadow">
              <h3 className="text-xl font-bold">{group.name}</h3>
              <p>{group.description}</p>
              <p className="text-sm text-gray-500">Created by: {group.created_by}</p>
            </li>
          ))}
        </ul>
      </div>

      { <div>
        <h2 className="text-2xl font-bold mb-4">Groups</h2>
        {groups.map((group) => (
  <div key={group.id} className="flex justify-between items-center">
    <h3>{group.name}</h3>
    {notifications?.[group.id]?.length > 0 && (
      <span className="text-red-500">{notifications[group.id].length} new</span>
    )}
    <Link href={`/groups/${group.id}`} className="text-blue-500">
      Join
    </Link>
  </div>
))}


      </div> }
    </div>
  );
};

export default Dashboard;