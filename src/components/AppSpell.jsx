import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function AppSpellList() {
  const {id} = useParams();

  return (
   <h1> {id} </h1>
  );
}
