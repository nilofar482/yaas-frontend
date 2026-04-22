import { useEffect, useState } from "react";
import axios from "axios";

function PolicyPage() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("https://api.yaasgents.com/api/terms/")
      .then(res => setData(res.data));
  }, []);

  return (
    <div className="policy_container">

      <div className="policy_section">
        <h1>Terms & Conditions</h1>
        <p className="policy_text">
          {data.terms_and_conditions}
        </p>
      </div>

      <hr className="policy_divider" />

      <div className="policy_section">
        <h1>Privacy Policy</h1>
        <p className="policy_text">
          {data.privacy_policy}
        </p>
      </div>

    </div>
  );
}

export default PolicyPage;