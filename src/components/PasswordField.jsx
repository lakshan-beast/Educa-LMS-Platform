import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

// Props හරහා පිටින් එන value, onChange, label, සහ placeholder ලස්සනට බාරගනී
const PasswordField = ({
  value,
  onChange,
  label = "Password",
  placeholder = "Enter password...",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="input-group"
      style={{ position: "relative", width: "100%" }}>
      <label
        style={{
          fontWeight: "600",
          fontSize: "0.85rem",
          color: "#1a0a54",
          display: "block",
          marginBottom: "5px",
        }}>
        {label}
      </label>

      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}>
        <input
          type={showPassword ? "text" : "password"} // 🚀 true නම් අකුරු පෙනේ, false නම් හැංගී තිත් වැටේ!
          placeholder={placeholder}
          required
          value={value}
          onChange={onChange}
          style={{
            width: "100%",
            padding: "11px",
            // paddingRight: "40px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            background: "white",
            fontSize: "0.9rem",
          }}
        />

        {/* 👁️ TOGGLE ICON BUTTON */}
        <span
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "12px",
            cursor: "pointer",
            color: "#666",
            display: "flex",
            alignItems: "center",
            fontSize: "1.1rem",
            userSelect: "none",
          }}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
    </div>
  );
};

export default PasswordField;
