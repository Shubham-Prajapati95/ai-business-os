import {
  LayoutDashboard
} from "lucide-react";

function Sidebar(){

  return(

    <div
      className="
      w-64
      bg-black
      text-white
      min-h-screen
      p-5
      "
    >

      <h1
        className="
        text-2xl
        font-bold
        "
      >
        AI Business OS
      </h1>

      <div
        className="
        mt-10
        "
      >

        <div
          className="
          flex
          gap-2
          items-center
          "
        >
          <LayoutDashboard/>

          Dashboard
        </div>

      </div>

    </div>

  );
}

export default Sidebar;