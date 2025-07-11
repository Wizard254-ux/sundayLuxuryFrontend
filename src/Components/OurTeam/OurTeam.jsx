import React from 'react';
import './OurTeam.css';

const OurTeam = () => {
  const teamMembers = [
{
  id: 1,
  name: "Sarah Johnson",
  role: "Massage Therapist & Beautician",
  image: "./src/assets/joy.jpg",
  description: "Skilled in therapeutic massage and beauty treatments, delivering personalized care and relaxation."
},
    {
      id: 2,
      name: "Chris",
      role: "Hair Grooming Stylist",
      image: "./src/assets/chris.png",
      description: "Expert in modern hair styling and color techniques"
    },
    {
      id: 3,
      name: "Leticiah",
      role: "Massage Therapist",
      image: "./src/assets/leticia.png",
      description: "Expert in therapeutic and relaxation massage"
    }
  ];

  return (
    <section className="our-team" id="team">
      <div className="team-container">
        <h2>Meet Our Expert Team</h2>
        <div className="team-grid">
          {teamMembers.map(member => (
            <div key={member.id} className="team-card">
              <div className="team-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="team-info">
                <h3 className="font-serif">{member.name}</h3>
                <h4>{member.role}</h4>
                <p>{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;