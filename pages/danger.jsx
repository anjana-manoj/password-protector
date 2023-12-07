import supabase from '@/config/supabaseClient'; 
import { useEffect, useState } from 'react'; 
 
export default function Test() { 
  const [userData, setUserData] = useState([]); 
 
  useEffect(() => { 
    fetchUserData(); 
  }, []); 
 
  async function fetchUserData() { 
    try { 
      let { data: users, error } = await supabase 
        .from('user') 
        .select(); 
 
      if (error) { 
        console.error('Error fetching user data:', error); 
        return; 
      } 
 
      setUserData(users || []); 
    } catch (error) { 
      console.error('Error fetching user data:', error.message); 
    } 
  } 
 
  return ( 
    <div className="mx-auto p-4"> 
      <table className="min-w-full border border-gray-300"> 
        <thead> 
          <tr> 
            <th className="border-b py-2">Email</th> 
            <th className="border-b py-2">Password</th> 
          </tr> 
        </thead> 
        <tbody> 
          {userData.map((user) => ( 
            <tr key={user.id}> 
              <td className="border-b py-2">{user.email}</td> 
              <td className="border-b py-2">{user.password}</td> 
            </tr> 
          ))} 
        </tbody> 
      </table> 
    </div> 
  ); 
}