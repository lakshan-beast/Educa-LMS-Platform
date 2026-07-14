import { FaLaptop, FaMobileScreenButton } from "react-icons/fa6";

const AdminMobileBlock = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "#f8faff",
        color: "#001b42",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        textAlign: "center",
      }}>
      {/* CARD INTERFACE PANEL [INDEX 4] */}
      <div
        style={{
          background: "#ffffff",
          padding: "40px 30px",
          borderRadius: "16px",
          maxWidth: "450px",
          boxShadow: "0 10px 30px rgba(0, 27, 66, 0.03)",
          border: "1px solid #eef2ff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}>
        {/* ICON GRAPHIC COMBINATION */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            position: "relative",
          }}>
          <FaLaptop style={{ fontSize: "3.5rem", color: "#0056ff" }} />
          <FaMobileScreenButton
            style={{
              fontSize: "1.8rem",
              color: "#ef4444",
              position: "absolute",
              bottom: "-5px",
              right: "-10px",
              background: "white",
              padding: "2px",
              borderRadius: "4px",
            }}
          />
        </div>

        <h2
          style={{
            fontSize: "1.3rem",
            fontWeight: "800",
            margin: 0,
            color: "#001b42",
          }}>
          Desktop View Required
        </h2>

        <p
          style={{
            margin: 0,
            color: "#8e9196",
            fontSize: "0.88rem",
            lineHeight: "1.5",
          }}>
          As the admin panel contains a large volume of data (data ledgers),
          access via mobile phones has been completely disabled to ensure the
          system's security and speed.
        </p>

        <div
          style={{
            background: "#eef2ff",
            color: "#0056ff",
            padding: "10px 15px",
            borderRadius: "8px",
            fontSize: "0.82rem",
            fontWeight: "700",
            width: "100%",
          }}>
          💻 Please use a laptop or PC.
        </div>
      </div>
    </div>
  );
};

export default AdminMobileBlock;
