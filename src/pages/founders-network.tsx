import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Facebook, Slack, MessageCircle, Share2 } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

type LocationCode = "AU" | "UK" | "US" | "CA";

type ChannelType = "linkedin" | "facebook" | "slack" | "whatsapp" | "discord";

type Channel = {
  type: ChannelType;
  url?: string;
  label: string;
};

type FoundersGroup = {
  id: string;
  name: string;
  location: LocationCode;
  coverUrl: string;
  shortDescription: string;
  status: "active" | "comingSoon";
  channels: Channel[];
};

const afnGroups: FoundersGroup[] = [
  {
    id: "afn-au",
    name: "AFN - ATP Founders Network AU",
    location: "AU",
    coverUrl: "/AFN.jpeg",
    shortDescription: "Australia-wide coordinator group keeping founders, talent partners, and student champions synced across ATP hubs.",
    status: "active",
    channels: [
      {
        type: "linkedin",
        label: "LinkedIn",
        url: "https://www.linkedin.com/groups/17863023/",
      },
      {
        type: "slack",
        label: "Slack",
        url: "https://join.slack.com/t/atpfoundernet-zg05926/shared_invite/zt-3tulvpfs6-KRkJt7axD2HciLZvtEiSGA",
      },
      {
        type: "facebook",
        label: "Facebook",
        url: "https://www.facebook.com/groups/1855331925179057"
      },
      {
        type: "discord",
        label: "Discord",
        url: "https://discord.gg/d2TkGa2Cb"
      }, {
        type: "whatsapp",
        label: "Whatsapp",
        url: "https://chat.whatsapp.com/H6pz9lh2R8mApE1GobmgVa?mode=gi_t"
      },
    ],
  },
  {
    id: "afn-uk",
    name: "AFN - ATP Founders Network UK",
    location: "UK",
    coverUrl: "/AFN.jpeg",
    shortDescription: "United Kingdom chapter connecting founders, partners, and champions accelerating ATP pathways into Europe.",
    status: "active",
    channels: [
      {
        type: "linkedin",
        label: "LinkedIn",
        url: "https://www.linkedin.com/groups/18953004/",
      },
      {
        type: "facebook",
        label: "Facebook",
        url: "https://www.facebook.com/share/g/1Dhu4zANoH/",
      },
      {
        type: "whatsapp",
        label: "WhatsApp",
        url: "https://chat.whatsapp.com/GnY2imFq7E6L2IxSVIuZp5",
      },
      {
        type: "slack",
        label: "Slack",
        url: "https://join.slack.com/t/atpfoundersnetworkuk/shared_invite/zt-3tv07771y-XXOvzDmV_bCh3eUmrEdAGQ",
      },
      {
        type: "discord",
        label: "Discord",
        url: "https://discord.gg/7BxNG6Vtf",
      },
    ],
  },
  {
    id: "afn-us",
    name: "AFN - ATP Founders Network US",
    location: "US",
    coverUrl: "/AFN.jpeg",
    shortDescription: "United States chapter connecting founders across major ATP hubs and partners.",
    status: "active",
    channels: [
      {
        type: "linkedin",
        label: "LinkedIn",
        url: "https://www.linkedin.com/groups/18989030/",
      },
      {
        type: "facebook",
        label: "Facebook",
        url: "https://www.facebook.com/groups/1649907882683471",
      },
      {
        type: "whatsapp",
        label: "WhatsApp",
        url: "https://chat.whatsapp.com/D9CzgcS9rQPFrU2EykNRya",
      },
      {
        type: "discord",
        label: "Discord",
        url: "https://discord.gg/VrCeAyHAH",
      },
    ],
  },
  {
    id: "afn-ca",
    name: "AFN - ATP Founders Network CA",
    location: "CA",
    coverUrl: "/AFN.jpeg",
    shortDescription: "Coming soon! Check out our other channels for AU and UK first.",
    status: "comingSoon",
    channels: [],
  },
];

const visibleAfnGroups = afnGroups.filter((group) => group.id !== "afn-ca");

const afnDescription = {
  intro:
    "AFN is created to connect founders, partners, and individuals building real value within ATP’s ecosystem — especially in supporting international students in their career and global journey.",
  mission:
    "AFN is a curated network under Apex Talent Partners (ATP), part of ATP Group (founded in 2014), supporting over 22,000 international students annually.",
  bullets: [
    "Share real opportunities (business, hiring, partnerships)",
    "Exchange practical, real-world insights",
    "Connect long-term thinkers building meaningful impact",
  ],
};

const channelIconMap: Record<ChannelType, typeof Linkedin> = {
  linkedin: Linkedin,
  facebook: Facebook,
  slack: Slack,
  whatsapp: MessageCircle,
  discord: Share2,
};

const channelColorMap: Record<ChannelType, string> = {
  linkedin: "#0077B5",
  facebook: "#1877F2",
  slack: "#4A154B",
  whatsapp: "#25D366",
  discord: "#5865F2",
};

const locationFlagMap: Record<LocationCode, { label: string; imageSrc: string }> = {
  AU: { label: "Australia", imageSrc: "/flags/au.svg" },
  UK: { label: "United Kingdom", imageSrc: "/flags/uk.svg" },
  US: { label: "United States", imageSrc: "/flags/us.svg" },
  CA: { label: "Canada", imageSrc: "/flags/ca.svg" },
};

type GroupCardProps = {
  group: FoundersGroup;
  isActive: boolean;
  onSelect: (id: string) => void;
};

function GroupCard({ group, isActive, onSelect }: GroupCardProps) {
  const flag = locationFlagMap[group.location];
  return (
    <Card
      className={`relative cursor-pointer overflow-hidden border-2 rounded-2xl bg-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${isActive ? "border-primary shadow-lg" : "border-transparent shadow hover:shadow-md hover:border-gray-200"}`}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onClick={() => onSelect(group.id)}
      onKeyDown={(event) => event.key === "Enter" && onSelect(group.id)}
    >
      <div className="relative h-44 w-full overflow-hidden bg-muted">
        {flag && (
          <span className="absolute left-3 top-3 inline-flex items-center justify-center rounded-full border border-white bg-white/90 p-1 shadow">
            <img
              src={flag.imageSrc}
              alt={`${flag.label} flag`}
              className="h-5 w-5 rounded-full object-cover"
              loading="lazy"
            />
          </span>
        )}
        <img src={group.coverUrl} alt={`${group.name} logo`} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="px-5 py-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground leading-snug">{group.name}</h3>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">{group.location}</span>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          {group.status === "comingSoon" ? "Coming soon! Check out our other channels for AU and UK first." : group.shortDescription}
        </p>
      </div>
    </Card>
  );
}

type GroupDetailProps = {
  group: FoundersGroup | null;
};

function GroupDetail({ group }: GroupDetailProps) {
  if (!group) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-sm text-gray-600">
        Select a network to view AFN details.
      </div>
    );
  }

  const hasChannels = group.status === "active" && group.channels.length > 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg h-full overflow-y-auto">
      <div className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 backdrop-blur-sm px-6 lg:px-8 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase text-gray-600">AFN Chapter</p>
            <h2 className="text-2xl font-serif text-primary">{group.name}</h2>
          </div>
          <span className="px-3 py-1 rounded-full border border-primary/30 text-primary text-xs font-semibold uppercase">
            {group.location}
          </span>
        </div>
        <p className="mt-3 text-sm text-gray-600">
          {group.status === "comingSoon"
            ? "Coming soon! Check out our other channels for AU and UK first."
            : group.shortDescription}
        </p>
      </div>
      <div className="px-6 lg:px-8 pt-6 pb-8 space-y-6">
        {hasChannels && (
          <div className="flex flex-wrap gap-3">
            {group.channels.map((channel) => {
              const Icon = channelIconMap[channel.type];
              const isDisabled = !channel.url;
              const iconColor = channelColorMap[channel.type];
              return channel.url ? (
                <a
                  key={`${group.id}-${channel.type}`}
                  href={channel.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-primary hover:text-primary"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" style={{ color: iconColor }} />
                  <span>{channel.label}</span>
                </a>
              ) : (
                <div
                  key={`${group.id}-${channel.type}`}
                  className="inline-flex items-center gap-2 rounded-full border border-dashed border-gray-300 px-4 py-2 text-sm font-medium text-gray-500"
                  aria-label={`${channel.label} link coming soon`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" style={{ color: iconColor }} />
                  <span>{channel.label}</span>
                </div>
              );
            })}
          </div>
        )}
        <div className="space-y-4 text-sm leading-relaxed text-gray-600">
          <p>{afnDescription.intro}</p>
          <p>{afnDescription.mission}</p>
          <div>
            <p className="font-semibold text-foreground">This group is designed to:</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              {afnDescription.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FoundersNetwork() {
  const [selectedGroupId, setSelectedGroupId] = useState<string>(visibleAfnGroups[0]?.id ?? "");
  const activeGroup = visibleAfnGroups.find((group) => group.id === selectedGroupId) ?? null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/50 via-white to-primary/5 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="mb-6 text-4xl lg:text-5xl font-serif text-primary">
              AFN <span className="text-accent"> - ATP Founders Network</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Explore AFN chapters by region and jump into the channels where ATP founders, partners, and champions collaborate in real time.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-secondary/30 min-h-[760px]">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="space-y-6">
              <div id="afn-groups-grid" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visibleAfnGroups.map((group) => (
                  <GroupCard key={group.id} group={group} isActive={activeGroup?.id === group.id} onSelect={setSelectedGroupId} />
                ))}
              </div>
            </div>
            <div className="lg:col-span-[0.8fr]">
              <div className="h-auto lg:h-[calc(100vh-12rem)] overflow-hidden rounded-2xl border border-border bg-card">
                <GroupDetail group={activeGroup ?? null} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
