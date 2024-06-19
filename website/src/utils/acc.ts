export type AccProps = {
  title: string;
  content: string;
}[];

export function AccordionData(): AccProps {
  // ThingCast How does it work Q&A
  return [
    {
      title: "How does it work?",
      content:
        "Thingcast embeds services like Slack, Teams, Zoom, and more. This allows you to create a custom invite link that can be shared with your guests.",
    },
    {
      title: "How is it different from other services?",
      content:
        "Thingcast is different from other services because it's easy to use and customizable. You can create your own invite link and share it, and customize the look and feel to match your brand.",
      // content: "Accordion Item 2 content",
    },
    {
      title: "Why should I use Thingcast?",
      content:
        "Thingcast is a great option for event organizers who want to create custom invite links and manage their guests. It can come in handy for events that require a lot of communication or for those who want to keep track of who is attending an event.",
    },
    {
      title: "Does Thingcast support all types of events?",
      content:
        "Thingcast supports a wide range of events, including conferences, hangouts, and more.",
    },
    {
      title: "Is Thingcast free?",
      content:
        "Thingcast is free to use, but you may need to pay for additional features or services. But this would be communicated to you in due time, as thingcast is still in beta. So this means for now, you can use it for free.",
    },
  ];
}
