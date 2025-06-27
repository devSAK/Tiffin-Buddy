import BackButton from "../components/BackButton";
export default function PrivacyPolicy() {
  return (
    <div className="p-4">
      <BackButton />
      {/* <div className="max-w-5xl mx-auto px-4 py-8 text-gray-800 dark:text-white"> */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Privacy Policy
        </h2>
        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
          Tiffin Buddy is committed to protecting your privacy. This Privacy
          Policy outlines how we collect, use, and safeguard your personal
          information.
        </p>
        <br />
        <ul className="space-y-4 text-gray-700 dark:text-gray-300 text-sm leading-6">
          <li>
            <strong>Information We Collect:</strong>
            <br />
            Email address or phone number during signup
            <br />
            User profile and preferences <br />
            Meal selections and order history
            <br />
          </li>
          <li>
            <strong>How We Use Your Information:</strong> <br />
            We use the information to process your orders, manage subscriptions,
            and improve our service.
            <br />
          </li>
          <li>
            <strong>Data Security:</strong> <br />
            We use encrypted connections and secure database practices to
            protect your data.
            <br />
          </li>
          <li>
            <strong>Third-Party Sharing:</strong> <br />
            We do not share your personal information with any third party
            without your consent.
            <br />
          </li>
          <li>
            <strong>Contact:</strong> <br />
            If you have any questions regarding this policy, please contact us
            via the form on our site.
            <br />
          </li>
        </ul>
      </div>
    </div>
  );
}
