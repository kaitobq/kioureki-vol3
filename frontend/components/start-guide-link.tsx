import React from "react";

const StartGuideLink = () => {
  return (
    <div className="fixed bottom-4 right-4">
      <a
        href="/guide"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
      >
        ご利用方法はこちら
      </a>
    </div>
  );
};

export default StartGuideLink;
