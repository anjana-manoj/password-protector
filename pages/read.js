import React from 'react'
import Link from 'next/link'

export default function rsa() {
  return (
    <div style={{backgroundImage: 'url(ab.jpg)'}} className="h-screen w-screen bg-cover ">
           <div className='bg-cyan-800 h-12 w-screen  text-white flex pt-3 justify-end justify-between'>
                <Link href="/"><button className=''>Home</button></Link> 
          </div >
          <div className='backdrop-blur-md  text-center text-white text-xl h-10 w-screen flex flex-col justify-center align-middle'> 
                <h1>Working</h1>
           </div>
    <div className='text-white'>
      <h1>When a user signs up, they provide three credentials, including a password. The password is encrypted and securely stored in the database.</h1><br/>
      <h1>During the login process, two crucial steps occur:</h1><br/>
      <h1>Step A: The user provides their credentials to log in. The stored password 
        associated with the provided email is fetched from the database. 
        This fetched password is decrypted using the appropriate decryption method. 
        The decrypted password is then compared to the original password entered by the user during the login attempt.</h1><br/> 
        <h1>Step B: Simultaneously, after the user enters their credentials, the entered password is encrypted again using the encryption method used during signup. 
          This newly encrypted password is then compared with the encrypted password stored in the database.</h1><br/> 
          <h1>If the decrypted password from step A matches the original user-entered password and the re-encrypted password from step B matches the encrypted password in the database, 
            the authentication is verified. This two-step verification process ensures that the user's entered password matches the one stored during signup,
             thereby confirming the user's identity and granting access.</h1><br/>
    </div>
    </div>
  )
}
