import create from 'zustand'

const useStore = create<{
  bears:number
}>(set => ({
  bears: 0,
  increaseBearsPopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 })
}))

export default useStore