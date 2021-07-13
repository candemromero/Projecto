import React from 'react';


export default function Header() {
    const videoStyle= {
        width: '100%',
        height: 'auto',
        objectfit: 'contain'
    }
    return ( 
        <div className="container-fluid}">
        
            <video style={videoStyle} src="/video/video-2.mp4" autoPlay loop muted/>
        </div>
    )
}
