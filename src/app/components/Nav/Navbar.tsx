import { ExternalLink } from 'lucide-react';
import { FC } from "react";

export const Navbar: FC = () => {
  return (
    <div className="flex h-[50px] border-b border-gray-300 py-2 px-8 items-center justify-between">
      <div className="font-bold text-xl flex items-center">
        <a
          className="hover:opacity-50"
          href="https://madetrade.com"
        >
          ChatGPT + LaunchDarkly Search
        </a>
      </div>
      <div>
        <a
          className="flex items-center hover:opacity-50"
          href="https://www.madetrade.com"
          target="_blank"
          rel="noreferrer"
        >
          <div className="hidden text-sm sm:flex">Using data from madetrade.com</div>
          <ExternalLink
            className="ml-1"
            size={20}
          />
        </a>
      </div>
    </div>
  );
};
