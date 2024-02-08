import {create} from "zustand"


const useConversation=create((set)=>({
    // selectedConversation:null,
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    // setSelectedConversation:(selectedConversation)=>set({setSelectedConversation}),
    messages:[],
    setMessages: (messages) => set({ messages }),
}))

export default useConversation