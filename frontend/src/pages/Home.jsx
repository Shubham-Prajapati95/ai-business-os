import { useNavigate } from "react-router-dom";

import UploadCard from "../components/UploadCard";

import { uploadCsv } from "../api/uploadApi";

function Home() {

  const navigate =
    useNavigate();

  const handleUpload =
    async(file)=>{

      if(!file) return;

      try{

        await uploadCsv(file);

        navigate(
          "/dashboard"
        );

      }
      catch(error){

        console.log(error);

      }

    };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-slate-100
      "
    >

      <UploadCard
        onUpload={handleUpload}
      />

    </div>
  );
}

export default Home;