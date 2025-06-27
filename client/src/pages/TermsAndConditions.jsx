import BackButton from "../components/BackButton";
export default function TermsAndConditions() {
  return (
    <div className="p-4">
      <BackButton />
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Terms & Conditions
        </h2>
        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
          These Terms & Conditions govern your use of Tiffin Buddy. By using our
          platform, you agree to the following terms.
        </p>
        <br />
        <ul className="space-y-4 text-gray-700 dark:text-gray-300 text-sm leading-6">
          <li>
            <strong>Service Description:</strong> <br />
            Tiffin Buddy offers weekly/monthly tiffin subscription services.
            Orders are managed through our website interface.
            <br />
          </li>

          <li>
            <strong>User Responsibilities:</strong> <br />
            Provide accurate and updated information during signup.
            <br />
            Ensure timely payment for subscriptions.
            <br />
          </li>

          <li>
            <strong>Cancellation & Refund:</strong>
            <br />
            Subscriptions can be cancelled anytime from the dashboard. Refunds
            are issued only if cancellation is done before the service period
            starts.
            <br />
          </li>

          <li>
            <strong>Modifications:</strong>
            <br />
            We reserve the right to update or modify these terms at any time
            without prior notice.
          </li>
        </ul>
      </div>
    </div>
  );
}
