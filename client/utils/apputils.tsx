import { GoogleMeet } from "@/components/layout/icons/meet";
import { MicrosoftTeams } from "@/components/layout/icons/teams";
import { Slack } from "@/components/layout/icons/slack";
import { TwitchAlt } from "@/components/layout/icons/twitch";
import { Zoom } from "@/components/layout/icons/zoom";
import { YoutubeIcon } from "@/components/layout/icons/youtube";

export const apps = [
  {
    id: "meet",
    icon: <GoogleMeet width={44} height={44} />,
    text: "Meet",
  },
  {
    id: "teams",
    icon: <MicrosoftTeams width={44} height={44} />,
    text: "Teams",
  },
  {
    id: "slack",
    icon: <Slack width={44} height={44} />,
    text: "Slack",
  },
  {
    id: "twitch",
    icon: <TwitchAlt width={44} height={44} />,
    text: "Twitch",
  },
  {
    id: "zoom",
    icon: <Zoom width={44} height={44} />,
    text: "Zoom",
  },
  {
    id: "youtube",
    icon: <YoutubeIcon width={44} height={44} />,
    text: "YouTube",
  },
];
