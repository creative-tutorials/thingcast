import { GoogleMeet } from "@/components/layout/icons/meet";
import { MicrosoftTeams } from "@/components/layout/icons/teams";
import { Slack } from "@/components/layout/icons/slack";
import { TwitchAlt } from "@/components/layout/icons/twitch";
import { Zoom } from "@/components/layout/icons/zoom";
import { YoutubeIcon } from "@/components/layout/icons/youtube";

export const apps = [
  {
    id: "meet",
    icon: <GoogleMeet width={20} height={20} />,
    text: "Meet",
  },
  {
    id: "teams",
    icon: <MicrosoftTeams width={20} height={20} />,
    text: "Teams",
  },
  {
    id: "slack",
    icon: <Slack width={20} height={20} />,
    text: "Slack",
  },
  {
    id: "twitch",
    icon: <TwitchAlt width={20} height={20} />,
    text: "Twitch",
  },
  {
    id: "zoom",
    icon: <Zoom width={20} height={20} />,
    text: "Zoom",
  },
  {
    id: "youtube",
    icon: <YoutubeIcon width={20} height={20} />,
    text: "YouTube",
  },
];
