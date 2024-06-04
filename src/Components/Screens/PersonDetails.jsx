import React from "react";
import { useParams } from "react-router-dom";
import PersonCard from "../Cards/PersonCard";

function PersonDetails() {
  const { id } = useParams();
  return (
    <>
      <PersonCard id={id} />
    </>
  );
}

export default PersonDetails;
