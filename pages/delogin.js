import { useState, useRef } from 'react';
import supabase from '@/config/supabaseClient';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const emailRef = useRef();
  const [password, setPassword] = useState('');

  async function log() {
    try {
      const email = emailRef.current.value;

      // Basic email validation
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        console.error('Invalid email address');
        return;
      }

      let { data: users, error } = await supabase
        .from('user')
        .select('password') // Only select the password field
        .eq('email', email);

      if (error) {
        console.error('Error fetching user:', error);
        return;
      }

      if (users && users.length > 0) {
        const user = users[0];
        const fetchedPassword = user.password;

        // Decrypt fetched password
        const decryptedPassword = decryptPassword(fetchedPassword);

        // Check if decrypted password matches the entered password
        if (decryptedPassword === password) {
          console.log('Success');
          router.push('/welcome');
        } else {
          alert('Invalid credentials');
        }
      } else {
        console.log('User not found');
      }
    } catch (e) {
      console.error('An unexpected error occurred:', e);
    }
  }

  // RSA Decryption logic
  const decryptPassword = (encryptedMsg) => {
    const p = 61; // Predefined prime number p (Replace with actual values)
    const q = 53; // Predefined prime number q (Replace with actual values)
    const e = 7; // Public exponent (Replace with actual value if different)
    // Calculate n, d using p, q, e (Use proper key generation and storage in real scenarios)
    const n = p * q;
    const t = (p - 1) * (q - 1);
    const d = calculatePrivateKey(e, t); // Calculate private key 'd'

    const encryptedNumbers = encryptedMsg.split(' ').map(Number); // Split the encrypted message into numbers
    const decrypted = [];

    for (let i = 0; i < encryptedNumbers.length; i++) {
      const decryptedChar = BigInt(encryptedNumbers[i]) ** BigInt(d) % BigInt(n);
      decrypted.push(Number(decryptedChar));
    }

    return String.fromCharCode(...decrypted); // Convert Unicode values to characters
  };

  // Calculate private key 'd' using the public exponent 'e' and Euler's totient function 't'
  const calculatePrivateKey = (e, t) => {
    let d = 1;
    while ((d * e) % t !== 1) {
      d++;
    }
    return d;
  };

  return (
    <>
      <div style={{ backgroundImage: 'url(ab.jpg)' }} className="h-screen w-screen flex flex-col justify-center items-center bg-cover">
        <div className='backdrop-blur-md border-white rounded-lg w-96 h-80 border-4 flex flex-col justify-center align-center items-center space-y-32 '>
          <div className='flex flex-col justify-center items-center space-y-3 '>
            <h1 className="text-white text-5xl">De-Login</h1><br />
            <div className='flex flex-row'>
              <h3 className='text-white w-24'>Email</h3>
              <input className="bg-transparent border-b border-white " placeholder="email" label="username" type="email" ref={emailRef} />
            </div><br />
            <div className='flex flex-row'>
              <h3 className='text-white w-24'>Password</h3>
              <input className="bg-transparent border-b border-white " placeholder="password" label="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div><br />
            <button className='text-white bg-transparent border-white border-2 rounded-lg w-36 h-10' onClick={log}>Submit</button>
            <div className='flex flex-row '>
                          <Link href="/signup"><button className=" text-white  w-28 ">New user?</button></Link>
                          <Link href="/"><button className=" text-white w-28 ">Home</button></Link><br/>
                      </div>
          </div>
        </div>
      </div>
    </>
  );
}
