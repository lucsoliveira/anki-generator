export const PATHS = {
  ANKI: {
    COLLECTION_MEDIAS: process.env.ANKI_COLLECTION_MEDIA_PATH ?? "",
  },
  ANKI_CONNECT: {
    BASE_HOST: process.env.ANKI_CONNECT_HOST_API ?? "http://127.0.0.1:8765",
  },
};
