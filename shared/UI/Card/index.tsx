import * as React from "react";
import CardMT from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export function Card({
  title,
  subtitle,
  children,
  footerActions,
  secondaryText,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footerActions?: React.ReactNode;
  secondaryText?: string;
}) {
  return (
    <CardMT sx={{ minWidth: 275 }}>
      <CardContent>
        {secondaryText && (
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            {secondaryText}
          </Typography>
        )}

        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          {subtitle}
        </Typography>
        <Typography variant="body2">{children}</Typography>
      </CardContent>
      <CardActions>{footerActions}</CardActions>
    </CardMT>
  );
}
