import React from 'react';

const iconProps = {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
} as const;

export const LeafIcon = () => (
  <svg {...iconProps} className="text-green-700">
    <path d="M11 20A7 7 0 0 1 4 13V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v6a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v6a7 7 0 0 1-7 7z"></path>
    <path d="M12 20A4 4 0 0 0 16 16v-2a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2a4 4 0 0 0 4 4z"></path>
  </svg>
);

export const WarningIcon = () => (
    <svg {...iconProps} className="text-yellow-700">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
        <path d="M12 9v4"></path><path d="M12 17h.01"></path>
    </svg>
);

export const VirusIcon = () => (
    <svg {...iconProps} className="text-lime-700">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 12v.01"></path>
        <path d="m8.5 4.5 4 4"></path>
        <path d="m15.5 4.5-4 4"></path>
        <path d="m8.5 19.5 4-4"></path>
        <path d="m15.5 19.5-4-4"></path>
        <path d="M12 2v2"></path><path d="M12 20v2"></path>
        <path d="m4.5 8.5 4 4"></path>
        <path d="m19.5 8.5-4 4"></path>
        <path d="M2 12h2"></path><path d="M20 12h2"></path>
        <path d="m4.5 15.5 4-4"></path><path d="m19.5 15.5-4-4"></path>
    </svg>
);

export const TreatmentIcon = () => (
    <svg {...iconProps} className="text-gray-600">
        <path d="M18.36 2.64a9 9 0 0 0-12.72 0"></path>
        <path d="M5.64 21.36a9 9 0 0 0 12.72 0"></path>
        <path d="M12 18a6 6 0 0 0 6-6"></path>
        <path d="M6 12a6 6 0 0 0 6 6"></path>
        <path d="m12 15 3-3-3-3"></path>
        <path d="M9 12h6"></path>
    </svg>
);

export const RupeeIcon = () => (
    <svg {...iconProps} className="text-gray-600">
        <path d="M6 3h12"></path>
        <path d="M6 8h12"></path>
        <path d="M6 13h12"></path>
        <path d="M6 18h12"></path>
        <path d="M8 3v18"></path>
        <path d="M16 3v18"></path>
        <path d="m8 13 8-5"></path>
        <path d="m8 8 8 5"></path>
    </svg>
);

export const StarIcon = () => (
    <svg {...iconProps} className="text-gray-600">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

export const CheckIcon = () => (
    <svg {...iconProps} className="text-green-700">
        <path d="M20 6 9 17l-5-5"/>
    </svg>
);

export const XCircleIcon = () => (
    <svg {...iconProps} className="text-red-700">
        <circle cx="12" cy="12" r="10" />
        <path d="m15 9-6 6" />
        <path d="m9 9 6 6" />
    </svg>
);

export const ShieldIcon = () => (
    <svg {...iconProps} className="text-blue-700">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

export const UploadCloudIcon = () => (
    <svg {...iconProps} className="w-16 h-16 text-gray-400">
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
        <path d="M12 12v9" />
        <path d="m16 16-4-4-4 4" />
    </svg>
);
