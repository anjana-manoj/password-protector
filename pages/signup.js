import supabase from "@/config/supabaseClient";
import { useRouter } from "next/router";
import { useEffect , useRef , useState } from "react";
import Link from "next/link";

export default function signup() {
  
  const router = useRouter();
  const nameRef = useRef();
  const emailRef = useRef();

  async function test(){
    const Email=emailRef.current.value;
    const Name = nameRef.current.value;
    const password= encryptedMsg;

    const {data, error}= await supabase
    .from('user')
    .insert([
      { email: Email, name: Name, password:password},
    ])
    .select()
    if(error){
      alert("all are required")
    }
    else{
      router.push('/login')
    }
  }


  const [msg, setMsg] = useState('');
  const [encryptedMsg, setEncryptedMsg] = useState('');
  const [decryptedMsg, setDecryptedMsg] = useState('');

  const p = 61; // Predefined prime number p
  const q = 53; // Predefined prime number q

  useEffect(() => {
    handleEncryption();
  }, [msg]); // Run encryption whenever the message changes

  const gcd = (a, b) => {
    if (b === 0) return a;
    return gcd(b, a % b);
  };

  const modInverse = (a, m) => {
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) {
        return x;
      }
    }
    return 1;
  };

  const handleEncryption = () => {
    const n = p * q;
    const t = (p - 1) * (q - 1);
    const e = 7; // Choosing public exponent (a common choice for simplicity)
    const d = modInverse(e, t);

    const m = [];
    for (let i = 0; i < msg.length; i++) {
      m.push(msg.charCodeAt(i));
    }

    const encrypted = [];
    const decrypted = [];

    for (let i = 0; i < m.length; i++) {
      const encryptedChar = BigInt(m[i]) ** BigInt(e) % BigInt(n);
      encrypted.push(encryptedChar);
      const decryptedChar = BigInt(encryptedChar) ** BigInt(d) % BigInt(n);
      decrypted.push(Number(decryptedChar));
    }

    setEncryptedMsg(encrypted.join(' '));
    setDecryptedMsg(String.fromCharCode(...decrypted)); // Convert Unicode values to characters
  };



  return (
    <>
    <div style={{backgroundImage: 'url(ab.jpg)'}} className="h-screen w-screen flex flex-col justify-center items-center bg-cover ">
    <div className=' border-white backdrop-blur-md rounded-lg w-96 h-96 border-4 flex flex-col justify-center align-center items-center space-y-32 '>
       <div className='flex flex-col justify-center items-center space-y-3 '>
        
        <h1 className="text-white text-5xl ">Signup</h1><br/>
        <div className='flex flex-row'>
            <h3 className='text-white w-24'>Name:</h3>
            <input className="bg-transparent border-b border-white "  placeholder="name" type="text"  ref={nameRef}/>
        </div><br/>
        <div className='flex flex-row'>
            <h3 className='text-white w-24'>Email:</h3>
            <input className="bg-transparent border-b border-white "  placeholder="email" type="email" ref={emailRef} />
        </div><br/>
        <div className='flex flex-row'>
            <h3 className='text-white w-24'>password</h3>
            <input className="bg-transparent border-b border-white " placeholder="password" label="password" type="password" value={msg} onChange={(e) => setMsg(e.target.value)}/>
        </div><br/>
        <button className='text-white bg-transparent border-white border-2 rounded-lg w-36 h-10' onClick={test}>submit</button>
                <div ><Link href="/"><button className=" text-white w-28 ">Home</button></Link><br/></div>
                          
                          
                      
       </div>
    </div>
</div>
</>
  )
}
