import { useState } from "react";
import { Upload } from "lucide-react";

function UploadCard({ onUpload }) {

  const [file, setFile] = useState(null);

  return (
    <div
      className="
      bg-white
      rounded-xl
      shadow-lg
      p-10
      w-full
      max-w-xl
      "
    >
      <div
        className="
        flex
        flex-col
        items-center
        gap-4
        "
      >
        <Upload size={50} />

        <input
          type="file"
          accept=".csv"
          onChange={(e) => {
            console.log("FILE SELECTED");
            console.log(e.target.files);

            setFile(e.target.files[0]);
          }}
        />

        <p>
          {file ? file.name : "No File Selected"}
        </p>

        <button
          onClick={() => {
            console.log("BUTTON CLICKED");
            console.log(file);

            onUpload(file);
          }}
          className="
          bg-black
          text-white
          px-6
          py-3
          rounded-lg
          "
        >
          Upload CSV
        </button>
      </div>
    </div>
  );
}

export default UploadCard;