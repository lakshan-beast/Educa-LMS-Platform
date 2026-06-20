import {
  FaShieldHalved,
  FaUserLock,
  FaEyeSlash,
  FaCircleCheck,
  FaSquarePollVertical,
} from "react-icons/fa6";

const Privacy = ({ onClose }) => {
  return (
    <div>
      <div className="privacy-card">
        <div className="privacy-top">
          <div className="privacy-header">
            <FaShieldHalved />
          </div>
          <h2>Data Privacy Standard</h2>
          <p>Enterprise Student & Parent Information Integrity</p>
        </div>

        <div className="privacy-container">
          <h4>
            <FaUserLock className="icon" /> Next-Gen Identity Safeguarding
          </h4>
          <p>
            We are deeply committed to ensuring absolute protection for all
            minor students. Personal identities, parental contact grids, and
            academic scores managed within educa. are strictly restricted from
            external third-party access, tracking networks, or public data
            brokers. All credentials are fully encrypted and secured within
            isolated Google Firebase Enterprise clusters .
          </p>

          <h4>
            <FaEyeSlash className="icon" /> Real-Time Cryptographic Masking
          </h4>
          <p>
            To sustain maximum confidentiality across communal interfaces, the
            platform executes a native tokenized string-masking algorithm.
            Public log tables, leaderboard indexes, and verification indices
            never render real names, programmatically transforming strings into
            decentralized formats (e.g. <code>EDU-11-LAKXXXXX-9999</code>) .
          </p>

          <h4>
            <FaSquarePollVertical className="icon" /> Verified Multi-Subject
            Scope
          </h4>
          <p className="last-content">
            Academic infrastructure metadata is used solely to route immediate
            progress insights. Performance metrics, weekly lesson trackers, and
            exam summaries are instantly distributed to unique parental gateways
            using secure, high-availability data integrations synced perfectly
            with local institution parameters.
          </p>
        </div>

        {/* Action Button: Calls the parent closing method */}
        <div className="privacy-actions">
          <button onClick={onClose} className="clode-button">
            <FaCircleCheck /> Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
