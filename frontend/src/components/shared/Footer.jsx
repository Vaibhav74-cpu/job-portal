import React from "react";

function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Section */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Job Hunt</h2>
            <p className="text-sm text-gray-600">
              © 2024 Your Company. All rights reserved.
            </p>
          </div>

          {/* Right Section (Social Icons) */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              className="hover:text-gray-400"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.407.593 24 1.324 24h11.495v-9.294H9.691V11.41h3.128V8.797c0-3.1 1.893-4.788 4.659-4.788 1.324 0 2.462.099 2.794.143v3.24h-1.917c-1.504 0-1.796.715-1.796 1.763v2.315h3.587l-.467 3.296h-3.12V24h6.116C23.407 24 24 23.407 24 22.676V1.324C24 .592 23.407 0 22.676 0z" />
              </svg>
            </a>

            {/* Twitter */}
            <a
              href="https://twitter.com"
              className="hover:text-gray-400"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775A4.932 4.932 0 0 0 23.337 2.1a9.864 9.864 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.384 4.482A13.94 13.94 0 0 1 1.671 3.149a4.917 4.917 0 0 0 1.523 6.573 4.9 4.9 0 0 1-2.228-.616v.061a4.918 4.918 0 0 0 3.946 4.817 4.903 4.903 0 0 1-2.224.085 4.919 4.919 0 0 0 4.588 3.41A9.867 9.867 0 0 1 0 19.54a13.924 13.924 0 0 0 7.548 2.213C17.093 21.753 22 13.905 22 7.548c0-.21 0-.42-.015-.63A9.935 9.935 0 0 0 24 4.557z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              className="hover:text-gray-400"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452H16.85V16.85c0-.853-.017-1.951-1.188-1.951-1.188 0-1.37.927-1.37 1.886v3.667H10.7V9.5h3.442v1.493h.05c.48-.9 1.65-1.85 3.396-1.85 3.631 0 4.301 2.39 4.301 5.495v5.814h.001zM5.337 8.005a1.998 1.998 0 1 1 0-3.996 1.998 1.998 0 0 1 0 3.996zm1.802 12.447H3.533V9.5h3.606v10.952zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
