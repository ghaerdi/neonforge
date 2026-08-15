import { create } from "zustand";

type MusicState = {
	/** Track currently selected in the MusicPlayer widget. */
	trackTitle: string;
	trackAlbum: string;
	station: string;
	setNowPlaying: (
		t: MusicState["trackTitle"],
		a: MusicState["trackAlbum"],
		s: MusicState["station"],
	) => void;
};

/**
 * Shared "now playing" state — the MusicPlayer widget writes the selected
 * track/station, and the DiscordProfile widget reads it for the live
 * "Listening to …" status. Kept together in one store (logically one entity).
 */
export const useMusicStore = create<MusicState>((set) => ({
	trackTitle: "Cannibal Queen — Mannim",
	trackAlbum: "Resist & Disorder",
	station: "Pacifica FM",
	setNowPlaying: (trackTitle, trackAlbum, station) =>
		set({ trackTitle, trackAlbum, station }),
}));
