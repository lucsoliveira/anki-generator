"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";

export function UploadsManager() {
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/anki/uploads");
      const result = await response.json();
      if (result.success) {
        setFiles(result.data || []);
      } else {
        setError("Falha ao carregar arquivos");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAllMp3 = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch("/api/anki/uploads", { method: "DELETE" });
      const result = await response.json();
      if (result.success) {
        setSuccess(
          `${result.removedCount} arquivo(s) .mp3 removido(s) com sucesso`
        );
        setOpenDialog(false);
        await loadFiles();
      } else {
        setError("Falha ao remover arquivos");
      }
    } catch (err) {
      setError("Erro ao remover arquivos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const mp3Count = files.filter((f) => f.endsWith(".mp3")).length;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">Gerenciador de Uploads</Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={loadFiles}
              disabled={loading}
            >
              Atualizar
            </Button>
            {mp3Count > 0 && (
              <Button
                size="small"
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => setOpenDialog(true)}
                disabled={loading}
              >
                Remover .mp3s
              </Button>
            )}
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert
            severity="success"
            sx={{ mb: 2 }}
            onClose={() => setSuccess(null)}
          >
            {success}
          </Alert>
        )}

        {loading && !files.length ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <CircularProgress />
          </Box>
        ) : files.length === 0 ? (
          <Typography color="textSecondary">
            Nenhum arquivo encontrado
          </Typography>
        ) : (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Total de arquivos: {files.length}
              {mp3Count > 0 && ` (${mp3Count} .mp3)`}
            </Typography>
            <List dense>
              {files.map((file) => (
                <ListItem key={file}>
                  <ListItemText
                    primary={file}
                    secondary={file.endsWith(".mp3") ? "Áudio" : "Outro tipo"}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </CardContent>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmar remoção</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja remover todos os {mp3Count} arquivo(s) .mp3?
            Esta ação não pode ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button
            onClick={handleRemoveAllMp3}
            variant="contained"
            color="error"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Remover"}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
