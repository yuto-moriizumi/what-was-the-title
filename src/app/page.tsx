import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { google } from "googleapis";

export default async function Home() {
  const youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_KEY,
  });
  const { data } = await youtube.playlists.list({
    channelId: "UCYISGUuH7CQ52tam5LF7B4Q",
    part: ["snippet"],
    maxResults: 100,
  });

  if (data.items === undefined) return <div>none</div>;

  const videos = await youtube.playlistItems.list({
    playlistId: "PLWJXk4kYouBRnKG6erMqkGZ1UKaZOHpJg",
    part: ["snippet", "contentDetails", "id", "status"],
    maxResults: 50,
  });

  return (
    <List>
      {data.items?.map((playlist) => (
        <ListItem key={playlist.id}>
          <ListItemText>{playlist.snippet?.title}</ListItemText>
          <List>
            {videos.data.items?.map((video) => (
              <ListItem key={video.id}>
                {video.snippet?.title}
                {JSON.stringify(video)}
              </ListItem>
            ))}
          </List>
        </ListItem>
      ))}
    </List>
  );
}

function getPlayListItems() {}
