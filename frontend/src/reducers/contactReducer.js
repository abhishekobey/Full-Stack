const initialState = []

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CONTACT":
            state = [...state, action.payload];
            return state;
        case "UPDATE_CONTACT":
            state = action.payload;
            return state;
        case "EDIT_CONTACT":
            const updateState = state.map((contact) => contact._id === action.payload._id ? action.payload : contact);
            state = updateState;
            return state;
        case "DELETE_CONTACT":
            const filterContact = state.filter((contact) => contact._id !== action.payload && contact);
            state = filterContact;
            return state;
        default:
            return state;
    }
};

export default contactReducer;