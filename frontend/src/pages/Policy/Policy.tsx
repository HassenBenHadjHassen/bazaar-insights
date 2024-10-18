import React from "react";
import "./Privacy.css";

const Privacy: React.FC = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Privacy Policy for Bazaar Insights</h1>
      <p>
        At <strong>Bazaar Insights</strong>, accessible from{" "}
        <a href="https://bazaar.hassenbenhadjhassen.com" target="_blank">
          bazaar.hassenbenhadjhassen.com
        </a>
        , one of our main priorities is the privacy of our visitors. This
        Privacy Policy document outlines the types of information we collect and
        how we use it.
      </p>
      <p>
        If you have any questions or require more information about our Privacy
        Policy, please contact us at{" "}
        <a href="mailto:hassenbenhadjhassen@gmail.com">
          hassenbenhadjhassen@gmail.com
        </a>
        .
      </p>
      <p>
        This Privacy Policy applies only to our online activities and is valid
        for visitors to our website regarding the information they share and/or
        collect at <strong>Bazaar Insights</strong>. This policy does not apply
        to any information collected offline or via channels other than this
        website.
      </p>

      <h2>Consent</h2>
      <p>
        By using our website, you consent to our Privacy Policy and agree to its
        terms.
      </p>

      <h2>Information We Collect</h2>
      <p>
        When you contact us directly, we may receive additional information
        about you, such as your name, email address, phone number, and any other
        information you choose to provide. When you register for an account, we
        may ask for contact information, including name, email address, and
        telephone number.
      </p>

      <h2>How We Use Your Information</h2>
      <p>We use the information we collect in various ways, including to:</p>
      <ul className="privacy_list">
        <li>Provide, operate, and maintain our website</li>
        <li>Improve, personalize, and expand our website</li>
        <li>Understand and analyze how you use our website</li>
        <li>Develop new products, services, features, and functionality</li>
        <li>
          Communicate with you, including for customer service and marketing
          purposes
        </li>
        <li>Send you emails</li>
        <li>Find and prevent fraud</li>
      </ul>

      <h2>Log Files</h2>
      <p>
        <strong>Bazaar Insights</strong> follows a standard procedure of using
        log files. These files log visitors when they visit websites. The
        information collected includes IP addresses, browser type, Internet
        Service Provider (ISP), date and time stamp, referring/exit pages, and
        the number of clicks. This information is used for analyzing trends,
        administering the site, tracking users' movement, and gathering
        demographic information.
      </p>

      <h2>Cookies and Web Beacons</h2>
      <p>
        Like any other website, <strong>Bazaar Insights</strong> uses cookies to
        store information, including visitors' preferences and the pages they
        accessed. This information is used to optimize the user experience by
        customizing content based on visitors' browser type and other
        information.
      </p>

      <h2>Third-Party Privacy Policies</h2>
      <p>
        <strong>Bazaar Insights</strong>' Privacy Policy does not apply to other
        advertisers or websites. Therefore, we advise you to consult the
        respective Privacy Policies of these third-party ad servers for more
        information.
      </p>
      <p>
        You can choose to disable cookies through your individual browser
        options. For more detailed information about cookie management, you can
        visit the respective websites of the browsers you use.
      </p>

      <h2>Children's Information</h2>
      <p>
        We prioritize adding protection for children while using the internet.
        We encourage parents and guardians to monitor their children's online
        activity. <strong>Bazaar Insights</strong> does not knowingly collect
        any Personal Identifiable Information from children under the age of 13.
        If you believe that your child has provided this kind of information,
        please contact us immediately, and we will take steps to remove such
        information.
      </p>
    </div>
  );
};

export default Privacy;
