import {
  FaScaleBalanced,
  FaShieldHalved,
  FaFileContract,
  FaCircleCheck,
  FaCircleXmark,
} from "react-icons/fa6";

const Terms = ({ onClose }) => {
  const handleAccept = () => {
    alert("You have successfully accepted the Terms of Service! 🟢");
    onClose();
  };

  return (
    <div>
      <div className="privacy-card">
        <div className="privacy-top">
          <div className="privacy-header">
            <FaFileContract />
          </div>
          <h2>Terms of Service</h2>
          <p>Operational Guidelines & End-User License Agreement</p>
        </div>

        <div className="privacy-container">
          <h4>
            <FaScaleBalanced className="icon" /> Intellectual Property Ownership
          </h4>
          <p>
            The entire source code, user interface designs, visual assets, and
            underlying software architecture of the <strong>educa. </strong>
            platform are the exclusive intellectual property of
            <strong> Lakshan (The Lead Architect)</strong> . Users and faculties
            are granted a limited, non-transferable license to access the
            system. Any unauthorized copying, distribution, or
            reverse-engineering of this software is strictly prohibited by law .
          </p>

          <h4>
            <FaShieldHalved className="icon" /> SaaS Subscription & Maintenance
            Agreement
          </h4>
          <p>
            This platform operates under a Fixed Monthly Subscription Service
            level agreement. Partnered teaching faculties are strictly bound to
            settle the agreed monthly maintenance tokens to ensure uninterrupted
            cloud hosting, database synchronization, and server operations.
            Failure to settle dues within the designated cycle may result in
            temporary administration panel deployment suspension.
          </p>

          <h4>
            <FaFileContract className="icon" /> Permitted Academic Usage
          </h4>
          <p className="last-content">
            The administrative portals, class logs, and score registries are
            explicitly reserved for authorized card-marker staff and teachers .
            Data entries must belong strictly to registered institutional
            students. Any misuse of system parameters, script injections, or
            brute-force logins will result in permanent programmatic IP
            restriction.
          </p>
        </div>

        <div className="privacy-actions">
          <button onClick={onClose} className="actions-button">
            <FaCircleXmark /> Decline / Cancel
          </button>
          <button onClick={handleAccept} className="close-button">
            <FaCircleCheck /> I Accept Terms
          </button>
        </div>
      </div>
    </div>
  );
};

export default Terms;
