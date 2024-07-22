"use client";

import React, { useEffect, useState } from "react";
import PetsPageView from "@/app/pets/petPageView";
import { httpClient } from "@/config/axios";
import { PetsPageProvider } from "@/app/pets/context/petsPageContext";

const PetsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pets, setPets] = useState();

  useEffect(() => {
    setIsLoading(true);
    httpClient
      .get("/api/pets")
      .then((response) => {
        setPets(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <PetsPageProvider value={{ setIsLoading, isLoading, pets }}>
      <PetsPageView />
    </PetsPageProvider>
  );
};

export default PetsPage;
