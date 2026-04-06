import acnAuCover from "@assets/ACN AU.jpg";
import acnUkCover from "@assets/ACN UK.jpg";
import acnUsCover from "@assets/ACN US.jpg";

export type LocationCode = "AU" | "UK" | "US" | "CA";

export type ChannelType = "linkedin" | "facebook" | "slack" | "whatsapp" | "discord";

export type Channel = {
    type: ChannelType;
    url?: string;
    label: string;
};

export type CandidateGroup = {
    id: string;
    name: string;
    location: LocationCode;
    coverUrl: string;
    shortDescription: string;
    status: "active" | "comingSoon";
    channels: Channel[];
};

export const acnGroups: CandidateGroup[] = [
    {
        id: "acn-au",
        name: "ACN - ATP Candidate Network AU",
        location: "AU",
        coverUrl: acnAuCover,
        shortDescription:
            "Australia hub for ACN members collaborating with ATP partners on visa-aware grads, internships, and job-ready sprint cycles.",
        status: "active",
        channels: [
            {
                type: "linkedin",
                label: "LinkedIn",
                url: "https://www.linkedin.com/groups/19203002/",
            },
            {
                type: "facebook",
                label: "Facebook AU",
                url: "https://www.facebook.com/groups/1623506395622987/",
            },
            {
                type: "whatsapp",
                label: "WhatsApp AU",
                url: "https://chat.whatsapp.com/E9Ck9Zqg7ZQHRHyze1uxUv?mode=gi_t",
            },
        ],
    },
    {
        id: "acn-uk",
        name: "ACN - ATP Candidate Network UK",
        location: "UK",
        coverUrl: acnUkCover,
        shortDescription:
            "UK circle pairing candidates with founders scaling into Europe while swapping interview prep intel and referral drops.",
        status: "active",
        channels: [
            {
                type: "linkedin",
                label: "LinkedIn",
                url: "https://www.linkedin.com/groups/19203002/",
            },
            {
                type: "facebook",
                label: "Facebook UK",
                url: "https://www.facebook.com/groups/1304270504895177",
            },
            {
                type: "whatsapp",
                label: "WhatsApp UK",
                url: "https://chat.whatsapp.com/IWcOvxmpzx55sWlIv4maiM?mode=gi_t",
            },
        ],
    },
    {
        id: "acn-us",
        name: "ACN - ATP Candidate Network US",
        location: "US",
        coverUrl: acnUsCover,
        shortDescription:
            "US network keeping ATP candidates looped into sponsor-friendly roles across climate, AI, and startup partners.",
        status: "active",
        channels: [
            {
                type: "linkedin",
                label: "LinkedIn",
                url: "https://www.linkedin.com/groups/19203002/",
            },
            {
                type: "facebook",
                label: "Facebook US",
                url: "https://www.facebook.com/groups/1663290111773694",
            },
            {
                type: "whatsapp",
                label: "WhatsApp US",
                url: "https://chat.whatsapp.com/JTzOUP2nUSAEauXZRQjVGd?mode=gi_t",
            },
        ],
    },
];

export const visibleAcnGroups = acnGroups;
