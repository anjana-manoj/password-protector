import { useState, useEffect } from 'react';

export default function DecryptionForm() {
  const [encryptedMsg, setEncryptedMsg] = useState('');
  const [decryptedMsg, setDecryptedMsg] = useState('');

  const p = 61; // Predefined prime number p
  const q = 53; // Predefined prime number q

  useEffect(() => {
    handleDecryption();
  }, [encryptedMsg]); // Run decryption whenever the encrypted message changes

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

  const handleDecryption = () => {
    const n = p * q;
    const t = (p - 1) * (q - 1);
    const e = 7; // Assuming the same public exponent (e) used for encryption
    const d = modInverse(e, t);

    const encryptedNumbers = encryptedMsg.split(' ').map(Number); // Split the encrypted message into numbers
    const decrypted = [];

    for (let i = 0; i < encryptedNumbers.length; i++) {
      const decryptedChar = BigInt(encryptedNumbers[i]) ** BigInt(d) % BigInt(n);
      decrypted.push(Number(decryptedChar));
    }

    setDecryptedMsg(String.fromCharCode(...decrypted)); // Convert Unicode values to characters
  };

  return (
    <div>
      <label>
        ENTER ENCRYPTED MESSAGE:
        <input type="text" value={encryptedMsg} onChange={(e) => setEncryptedMsg(e.target.value)} />
      </label>
      <br />
      <div>
        <p>Decrypted Message: {decryptedMsg}</p>
      </div>
    </div>
  );
}





    
/*const passwords = users.map(user => user.password);
console.log('hi',passwords);
629 1841 1621 529 1431*/
