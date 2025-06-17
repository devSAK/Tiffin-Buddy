export default function TermsAndConditions() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
      <p className="mb-4">
        These Terms & Conditions govern your use of Tiffin Buddy. By using our
        platform, you agree to the following terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        1. Service Description
      </h2>
      <p>
        Tiffin Buddy offers weekly/monthly tiffin subscription services. Orders
        are managed through our website interface.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        2. User Responsibilities
      </h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Provide accurate and updated information during signup.</li>
        <li>Ensure timely payment for subscriptions.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        3. Cancellation & Refund
      </h2>
      <p>
        Subscriptions can be cancelled anytime from the dashboard. Refunds are
        issued only if cancellation is done before the service period starts.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Modifications</h2>
      <p>
        We reserve the right to update or modify these terms at any time without
        prior notice.
      </p>
    </div>
  );
}
