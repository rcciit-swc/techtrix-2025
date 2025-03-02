import Image from "next/image";
import React from "react";
import "./TeamCard.css";
const TeamCard = ({
  name,
  role,
  imageUrl,
}: {
  name: string;
  role: string;
  imageUrl: string;
}) => {
  return (
    <>
   
<div className="card">
       
        <div className="profile-pic">
            
           <Image src={imageUrl} alt="profile-pic" width={200} height={200} />
        </div>
        <div className="bottom">
            <div className="content">
                <span className="name font-kagitingan">{name}</span>
                <span className="about-me font-kagitingan">{role} </span>
            </div>
        </div>
    </div>
    </>
  );
};

export default TeamCard;