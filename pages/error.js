import Link from 'next/link'

export default function error() {

    return (
        <div style={{ marginTop: 30 }}>
           <Link href="/" className="link">
             Go Home
           </Link>

           <div style={{ marginTop: 50 }}>
             <h1>404 Error....oops something went wrong</h1>
                <p>Contact us at&nbsp;
                  <a href="mailto:info@bitcoin.org.hk" target="_blank" rel="noopener noreferrer">info@bitcoin.org.hk</a>
                  &nbsp;if this persists.
                </p>
           </div>
        </div>
    );
}