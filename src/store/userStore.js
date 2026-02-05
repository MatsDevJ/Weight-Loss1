import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      _hasHydrated: false,

      setHasHydrated: (hydrated) => {
        set({ _hasHydrated: hydrated });
      },

      signup: (user) => {
        const newUser = {
          ...user,
          dateOfJoining: new Date(),
          height: '',
          goalWeight: '',
          weightLog: [],
          mealLog: [],
          gender: '',
          age: '',
        };
        set((state) => ({ users: [...state.users, newUser] }));
      },

      login: (email) => {
        const { users } = get();
        const user = users.find((u) => u.email === email);
        if (user) {
          set({ currentUser: user });
          return true;
        }
        return false;
      },

      logout: () => set({ currentUser: null }),

      updateProfile: (updatedProfile) =>
        set((state) => {
          if (!state.currentUser) return {};

          // **THE CRITICAL FIX**: Defensive update logic.
          // Create a new object for the user profile data, but explicitly
          // preserve the original, stable references for the log arrays.
          const newCurrentUserData = {
            ...state.currentUser,
            ...updatedProfile, // Apply incoming changes
            // Ensure log references are NOT replaced by accident.
            weightLog: state.currentUser.weightLog,
            mealLog: state.currentUser.mealLog,
          };

          return {
            currentUser: newCurrentUserData,
            users: state.users.map((user) =>
              user.email === state.currentUser.email ? newCurrentUserData : user
            ),
          };
        }),

      addWeightLog: (newLog) =>
        set((state) => {
          if (!state.currentUser) return {};
          const updatedUser = {
            ...state.currentUser,
            weightLog: [...state.currentUser.weightLog, { ...newLog, date: new Date().toISOString() }],
          };
          return {
            currentUser: updatedUser,
            users: state.users.map((user) =>
              user.email === state.currentUser.email ? updatedUser : user
            ),
          };
        }),

      addMealLog: (newMeal) =>
        set((state) => {
          if (!state.currentUser) return {};
          const updatedUser = {
            ...state.currentUser,
            mealLog: [...state.currentUser.mealLog, { ...newMeal, date: new Date().toISOString() }],
          };
          return {
            currentUser: updatedUser,
            users: state.users.map((user) =>
              user.email === state.currentUser.email ? updatedUser : user
            ),
          };
        }),
    }),
    {
      name: 'user-storage', // unique name for localStorage key
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true);
      },
      partialize: (state) =>
      Object.fromEntries(
        Object.entries(state).filter(([key]) => !['_hasHydrated'].includes(key))
      ),
    }
  )
);

export default useUserStore;
