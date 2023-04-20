import React from 'react';
import Image from 'next/image';
import {corporate_fee, individual_fee, year} from '../lib/Constants';


export default function Header(props) {
   // console.log(props)
    let title = "Corporate Membership Application"
    let content = "The corporate membership fee for " + year + " is set at " + corporate_fee + " BTC"

    if (props.kind === 'individual') {
        title = "Individual Membership Application"
        content = "The individual membership fee for "  + year  + " is set at " + individual_fee + " BTC"
    }

    const redstyle = {
        color: '#E60600'
    }

    return (
        <div style={{ marginBottom: 30 }}>
            <center>
            <div style={{ marginTop: 100 }}>
            <Image
                    src="/images/bahk_logo.svg" // Route of the image file
                    height={144} // Desired size with correct aspect ratio
                    width={144} // Desired size with correct aspect ratio
                    alt="Bitcoin HK Logo"
            />
            </div>

            <h2 style={redstyle}>
            {title}
            </h2>
        </center>
        <p style={{ fontSize: 14, lineHeight: 1.3, marginBottom: 0}}>
            To sign up, simply fill out the application form below. <b>{content}</b> and will be revised once per year. We will send you an email with a confirmation usually within 48h.
            If you have questions, please drop us an email at&nbsp;
            <a href="mailto:info@bitcoin.org.hk" target="_blank" rel="noopener noreferrer">info@bitcoin.org.hk</a>
        </p>
        </div>

    );
};
