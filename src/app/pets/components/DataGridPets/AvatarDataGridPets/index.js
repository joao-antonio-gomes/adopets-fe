import React, { useState } from "react";
import { Avatar, Dialog } from "@mui/material";

const AvatarDataGridPets = ({ row }) => {
  const [openBigger, setOpenBigger] = useState(false);
  const { name, imageUrl } = row;

  return (
    <>
      <Avatar
        alt={name}
        src={imageUrl}
        sx={{
          width: 50,
          height: 50,
          cursor: "pointer",
        }}
        onClick={() => setOpenBigger(true)}
      />

      <Dialog open={openBigger} onClose={() => setOpenBigger(false)}>
        <img alt={name} src={imageUrl} />
      </Dialog>
    </>
  );
};

export default AvatarDataGridPets;
