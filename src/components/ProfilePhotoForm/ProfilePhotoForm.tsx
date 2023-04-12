import Reac from "react";
import { useForm } from "react-hook-form";
import { Button, Card, Typography } from "@mui/material";
import { auth } from "../../helpers/firebaseConfig";
import { storage } from "../../helpers/firebaseConfig";
import { getStorage, ref, uploadBytes } from "firebase/storage";

interface ProfilePhotoFormValues {
  profilePhoto: FileList;
}

const ProfilePhotoForm = () => {
  const { register, handleSubmit } = useForm<ProfilePhotoFormValues>();

  const uploadPhoto = (data: ProfilePhotoFormValues) => {
    console.log(data.profilePhoto[0]);

    const photo = data.profilePhoto[0];
    if (auth.currentUser) {
      const storageRef = ref(storage, `/users/${auth.currentUser.uid}/profile`);

      uploadBytes(storageRef, photo).then((snapshot) => {
        console.log("Success");

        //   .catch((err) => console.error(err.message))
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(uploadPhoto)}>
      <Card sx={{ p: "1rem" }}>
        <Typography variant="h6" align="center" sx={{ fontSize: "1rem" }}>
          Upload your profile picture
        </Typography>
        <Button
          variant="contained"
          component="label"
          sx={{
            display: "block",
            mx: "auto",
            my: "1rem",
            alignContent: "center",
          }}
        >
          <Typography variant="h6" align="center" fontSize="1rem">
            Select a file
          </Typography>
          <input
            type="file"
            hidden
            {...register("profilePhoto", { required: true })}
          />
        </Button>
        <Button
          variant="contained"
          type="submit"
          sx={{ display: "block", mx: "auto" }}
        >
          Upload
        </Button>
      </Card>
    </form>
  );
};

export default ProfilePhotoForm;

// 1. Stwórz komponent ProfilePhotoForm.tsx
// 2. Import i wywołanie useForm, pamiętaj o interfejsie do formularza
// 3. Stwórz pustą na razie funkcję uploadPhoto.
// 4. JSX:
// - wszystko będzie obwienięte tagiem form (html) skonfiguruj na nim odpowiednio onSubmit
// - wszystko w środku formularza będzie obwinięte komponentem Card (MUI), sx: p 1rem
// - w środku Card wyświetl Typography variant h6, align center, sx: fontSize 1rem. Text: Upload your profile picture.
// - obok tego Typography wyświetl Button (MUI) variant contained, component label, sx: display block, mx auto, my 1rem, alignContent center.
// - ZAWARTOŚĆ BUTTONA:
// - Typography variant h6, align center, fontSize 1rem. Text: Select a file.
// - input type file, hidden, zarejestruj pod nazwą profilePhoto
// - KONIEC ZAWARTOŚCI BUTTONA
// -  obok buttona kolejny Button variant contained, type submit, sx: display block, mx auto. Text: Upload
// input type file zwraca typ FileList, ten też typ będzie użyty w naszym interfejsie
