import Link from 'next/link'

export default function error() { 

    return (
        <div style={{ marginTop: 30 }}>
           <Link href="/" className="link">
             Go Home
           </Link>
     
           <div style={{ marginTop: 50 }}>
             <h1>404 Error....oops something went wrong</h1>
                <p>Contact us at info[at]bitcoin.org.hk if this persists.</p>
           </div>
        </div>
    );     
}