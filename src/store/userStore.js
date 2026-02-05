import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      _hasHydrated: false, // Flag to indicate if rehydration is complete

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
          // Ensure nested objects are properly initialized
          const updatedUser = {
            ...user,
            weightLog: user.weightLog || [],
            mealLog: user.mealLog || [],
          };
          set({
            currentUser: updatedUser,
            // Also update the user in the main users list
            users: users.map((u) => (u.email === email ? updatedUser : u)),
          });
          return true;
        }
        return false;
      },

      logout: () => set({ currentUser: null }),

      updateProfile: (updatedProfile) =>
        set((state) => {
          if (!state.currentUser) return {};
          const updatedUser = { ...state.currentUser, ...updatedProfile };
          return {
            currentUser: updatedUser,
            users: state.users.map((user) =>
              user.email === state.currentUser.email ? updatedUser : user
            ),
          };
        }),

      addWeightLog: (newLog) =>
        set((state) => {
          if (!state.currentUser) return {};
          const updatedUser = {
            ...state.currentUser,
            weightLog: [...(state.currentUser.weightLog || []), { ...newLog, date: new Date() }],
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
            mealLog: [...(state.currentUser.mealLog || []), { ...newMeal, date: new Date() }],
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
      // This is the crucial part for fixing the race condition
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !['_hasHydrated', 'setHasHydrated'].includes(key))
        ),
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true);
      },
    }
  )
);

export default useUserStore;
