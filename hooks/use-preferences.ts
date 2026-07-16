import { create } from "zustand";
import { persist } from "zustand/middleware";

type PreferencesStore = {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  toggleSound: () => void;

  codeTheme: string;
  setCodeTheme: (theme: string) => void;
};

export const usePreferencesStore = create<PreferencesStore>()(
  persist(
    set => ({
      soundEnabled: true,
      codeTheme: "vesper",

      setSoundEnabled: enabled => set({ soundEnabled: enabled }),
      setCodeTheme: codeTheme => set({ codeTheme }),

      toggleSound: () =>
        set(state => ({
          soundEnabled: !state.soundEnabled
        }))
    }),
    {
      name: "portfolio-preferences"
    }
  )
);
