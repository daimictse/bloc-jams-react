import React from 'react';

const Landing = () => (
  <section className="landing">
  <h1 className="hero-title">Turn the music up!</h1>
   <section className="selling-points">
     <div className="point">
       <h2 className="point-title"><span className="ion-md-musical-note custom-ion"></span>Choose your music</h2>
       <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
     </div>
     <div className="point">
       <h2 className="point-title"><span className="ion-md-musical-notes custom-ion"></span>Unlimited, streaming, ad-free</h2>
       <p className="point-description">No arbitrary limits. No distractions.</p>
     </div>
     <div className="point">
       <h2 className="point-title"><span className="ion-md-phone-portrait custom-ion"></span>Mobile enabled</h2>
       <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
     </div>
   </section>
  </section>
);

export default Landing;
