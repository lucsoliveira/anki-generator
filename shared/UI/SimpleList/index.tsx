import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export function SimpleList({ children }: { children: React.ReactNode }) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {children}
    </List>
  );
}

export function SimpleListItem({
  key,
  id,
  onClick,
  value,
  actions,
}: {
  key: string;
  id: string;
  onClick: React.MouseEventHandler<unknown> | undefined;
  value: string;
  actions?: React.ReactNode;
}) {
  return (
    <ListItem key={key} secondaryAction={actions} disablePadding={true}>
      <ListItemButton role={undefined} onClick={onClick} dense>
        <ListItemText id={id} primary={value} />
      </ListItemButton>
    </ListItem>
  );
}
