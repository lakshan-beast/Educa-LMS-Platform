import {
  FaCircleCheck,
  FaCircleXmark,
  FaCircleExclamation,
} from "react-icons/fa6";

const ConfirmationModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  type = "warning",
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div
          className="modal-header"
          style={{
            color: type === "danger" ? "#e74c3c" : "#f39c12",
          }}>
          <FaCircleExclamation />
        </div>

        <h3>{title}</h3>
        <p>{message}</p>

        {/* Action Buttons */}
        <div className="actions-buttons">
          <button onClick={onCancel} className="cancel-button">
            <FaCircleXmark /> No, Cancel
          </button>
          <button onClick={onConfirm} className="confirm-button">
            <FaCircleCheck /> Yes, Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
