import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const PasswordField = ({
  value,
  onChange,
  label = "Password",
  placeholder = "Enter password...",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="input-group">
      <label>{label}</label>

      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}>
        <input
          type={showPassword ? "password" : "text"}
          placeholder={placeholder}
          required
          value={value}
          onChange={onChange}
        />

        {/* 👁️ TOGGLE ICON BUTTON */}
        <span
          className="eye-content"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "12px",
            cursor: "pointer",
            color: "#03204b",
            display: "flex",
            alignItems: "center",
            fontSize: "1.3rem",
            userSelect: "none",
          }}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
    </div>
  );
};

export default PasswordField;
